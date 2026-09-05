import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { basename, join, relative, isAbsolute, sep } from 'node:path'
import { portSkill, sanitizeSkillName } from '../lib/index.js'
import { makeTestDir, removeTestDir } from './fixture.mjs'

function fixture(t, old = true) {
  const root = makeTestDir('transaction-')
  t.after(() => { t.mock.restoreAll(); removeTestDir(root) })
  const source = join(root, 'source')
  const targetRoot = join(root, 'skills')
  const target = join(targetRoot, 'demo')
  fs.mkdirSync(source)
  fs.mkdirSync(targetRoot)
  fs.writeFileSync(join(source, 'SKILL.md'), '---\nname: demo\ndescription: New skill\n---\n# New body\n')
  fs.writeFileSync(join(source, 'payload.bin'), Buffer.from([0, 1, 254, 255]))
  if (old) {
    fs.mkdirSync(target)
    fs.writeFileSync(join(target, 'SKILL.md'), '# old user version\n')
    fs.writeFileSync(join(target, 'user.txt'), 'keep me exactly\n')
  }
  const skill = { skillDirName: 'demo', skillName: 'demo', sourceDir: source, skillFile: join(source, 'SKILL.md'), description: '' }
  const plugin = { name: 'fixture', version: '1', description: '', homepage: '', license: '', sourceDir: source, skills: [skill] }
  return { root, source, targetRoot, target, skill, plugin, run: () => portSkill(skill, plugin, targetRoot, true) }
}

function oldIntact(target) {
  assert.equal(fs.readFileSync(join(target, 'SKILL.md'), 'utf8'), '# old user version\n')
  assert.equal(fs.readFileSync(join(target, 'user.txt'), 'utf8'), 'keep me exactly\n')
  assert.deepEqual(fs.readdirSync(target).sort(), ['SKILL.md', 'user.txt'])
}

function recovery(f) {
  const directories = fs.readdirSync(f.targetRoot).filter(name => name.startsWith('.dsh-port-'))
  assert.equal(directories.length, 1)
  const path = join(f.targetRoot, directories[0])
  return { path, ...JSON.parse(fs.readFileSync(join(path, 'recovery.json'), 'utf8')) }
}

test('复制中途失败：原技能每个文件不变，未进行目录切换', t => {
  const f = fixture(t)
  const copy = fs.copyFileSync
  t.mock.method(fs, 'copyFileSync', (from, to, flags) => {
    if (basename(from) === 'payload.bin') throw new Error('injected copy failure')
    copy(from, to, flags)
  })
  const rename = t.mock.method(fs, 'renameSync', () => assert.fail('must not move the old skill'))
  const result = f.run()
  assert.equal(result.status, 'failed')
  assert.match(result.reason, /copy failure/)
  assert.equal(rename.mock.callCount(), 0)
  oldIntact(f.target)
  assert.equal(recovery(f).phase, 'failed-before-switch')
})

test('转换后文件写入失败：旧技能保持不变', t => {
  const f = fixture(t)
  const write = fs.writeFileSync
  t.mock.method(fs, 'writeFileSync', (path, data, options) => {
    if (basename(path) === 'SKILL.md' && String(data).includes('allowed-tools')) throw new Error('converted write failed')
    write(path, data, options)
  })
  const result = f.run()
  assert.equal(result.status, 'failed')
  assert.match(result.reason, /converted write failed/)
  oldIntact(f.target)
})

test('转换产物不能回读为技能时，在备份旧目录前拒绝切换', t => {
  const f = fixture(t)
  const write = fs.writeFileSync
  t.mock.method(fs, 'writeFileSync', (path, data, options) => {
    write(path, basename(path) === 'SKILL.md' ? '# incomplete write' : data, options)
  })
  assert.equal(f.run().status, 'failed')
  oldIntact(f.target)
  assert.equal(fs.existsSync(recovery(f).previous), false)
})

test('转换本身抛错时旧版不变，恢复资料可定位', t => {
  const f = fixture(t)
  Object.defineProperty(f.plugin, 'homepage', { get() { throw new Error('conversion metadata failed') } })
  const result = f.run()
  assert.equal(result.status, 'failed')
  assert.match(result.reason, /conversion metadata failed/)
  oldIntact(f.target)
  assert.ok(result.reason.includes(recovery(f).path))
})

test('备份旧目录失败：原技能仍在原位', t => {
  const f = fixture(t)
  t.mock.method(fs, 'renameSync', () => { throw new Error('backup rename failed') })
  const result = f.run()
  assert.equal(result.status, 'failed')
  oldIntact(f.target)
  assert.equal(fs.existsSync(recovery(f).incoming), true)
})

test('新目录切换失败：恢复完整旧技能，并保留已校验的新目录', t => {
  const f = fixture(t)
  const rename = fs.renameSync
  t.mock.method(fs, 'renameSync', (from, to) => {
    if (basename(from) === 'incoming') throw new Error('install rename failed')
    rename(from, to)
  })
  const result = f.run()
  assert.equal(result.status, 'failed')
  assert.match(result.reason, /已恢复原技能/)
  oldIntact(f.target)
  const record = recovery(f)
  assert.equal(record.phase, 'rolled-back')
  assert.ok(fs.existsSync(join(record.incoming, 'SKILL.md')))
  assert.equal(fs.existsSync(record.previous), false)
})

test('回滚也失败：旧版与新版均保留，失败信息给出原版路径', t => {
  const f = fixture(t)
  const rename = fs.renameSync
  t.mock.method(fs, 'renameSync', (from, to) => {
    if (basename(from) === 'incoming' || basename(from) === 'previous') throw new Error('directory locked')
    rename(from, to)
  })
  const result = f.run()
  const record = recovery(f)
  assert.equal(result.status, 'failed')
  assert.equal(record.phase, 'rollback-failed')
  assert.ok(result.reason.includes(record.previous))
  oldIntact(record.previous)
  assert.ok(fs.existsSync(join(record.incoming, 'SKILL.md')))
})

test('回滚位置被其他写入占用时，不删除新出现的内容', t => {
  const f = fixture(t)
  const rename = fs.renameSync
  t.mock.method(fs, 'renameSync', (from, to) => {
    if (basename(from) === 'incoming') {
      fs.mkdirSync(to)
      fs.writeFileSync(join(to, 'concurrent.txt'), 'another writer')
      throw new Error('destination appeared')
    }
    rename(from, to)
  })
  assert.equal(f.run().status, 'failed')
  oldIntact(recovery(f).previous)
  assert.equal(fs.readFileSync(join(f.target, 'concurrent.txt'), 'utf8'), 'another writer')
})

test('无旧版时切换失败：不留下残缺的正式技能目录', t => {
  const f = fixture(t, false)
  t.mock.method(fs, 'renameSync', () => { throw new Error('new install failed') })
  assert.equal(f.run().status, 'failed')
  assert.equal(fs.existsSync(f.target), false)
  assert.ok(fs.existsSync(join(recovery(f).incoming, 'SKILL.md')))
})

test('首次安装成功：公开结果不变，内容与二进制文件完整', t => {
  const f = fixture(t, false)
  assert.deepEqual(f.run(), { skill: 'demo', plugin: 'fixture', status: 'ported', reason: '', files: 2 })
  assert.deepEqual(fs.readFileSync(join(f.target, 'payload.bin')), Buffer.from([0, 1, 254, 255]))
  assert.equal(recovery(f).phase, 'installed')
})

test('覆盖成功保留完整旧版，全部 rename 的两端都在解析后的目标根内', t => {
  const f = fixture(t)
  const rename = fs.renameSync
  t.mock.method(fs, 'renameSync', (from, to) => {
    for (const path of [from, to]) {
      const child = relative(fs.realpathSync(f.targetRoot), path)
      assert.ok(child && child !== '..' && !child.startsWith('..' + sep) && !isAbsolute(child))
    }
    rename(from, to)
  })
  assert.equal(f.run().status, 'ported')
  const record = recovery(f)
  oldIntact(record.previous)
  assert.match(fs.readFileSync(join(f.target, 'SKILL.md'), 'utf8'), /New body/)
  // Harness discoverRoot checks only root/child/SKILL.md, not nested backup directories.
  const visible = fs.readdirSync(f.targetRoot).filter(name => fs.existsSync(join(f.targetRoot, name, 'SKILL.md')))
  assert.deepEqual(visible, ['demo'])
})

test('overwrite=false 不读取或暂存无效源，也不创建恢复目录', t => {
  const f = fixture(t)
  f.skill.sourceDir = join(f.root, 'missing')
  assert.equal(portSkill(f.skill, f.plugin, f.targetRoot, false).status, 'skipped')
  oldIntact(f.target)
  assert.deepEqual(fs.readdirSync(f.targetRoot), ['demo'])
})

test('目标技能或目标根是目录联接时拒绝覆盖，不改动外部内容', t => {
  const f = fixture(t, false)
  const external = join(f.root, 'external')
  fs.mkdirSync(external)
  fs.writeFileSync(join(external, 'sentinel'), 'external contents')
  fs.symlinkSync(external, f.target, process.platform === 'win32' ? 'junction' : 'dir')
  assert.equal(f.run().status, 'failed')
  const aliasRoot = join(f.root, 'alias-skills')
  fs.symlinkSync(external, aliasRoot, process.platform === 'win32' ? 'junction' : 'dir')
  assert.equal(portSkill(f.skill, f.plugin, aliasRoot, true).status, 'failed')
  assert.ok(fs.lstatSync(f.target).isSymbolicLink())
  assert.equal(fs.readFileSync(join(external, 'sentinel'), 'utf8'), 'external contents')
  assert.deepEqual(fs.readdirSync(external), ['sentinel'])
})

test('目标根位于源内、源与旧技能重叠时拒绝递归复制', t => {
  const f = fixture(t)
  assert.equal(portSkill(f.skill, f.plugin, join(f.source, 'nested-target'), true).status, 'failed')
  assert.equal(fs.existsSync(join(f.source, 'nested-target')), false)
  assert.equal(fs.readdirSync(f.source).some(name => name.startsWith('.dsh-port-')), false)
  f.skill.sourceDir = f.target
  assert.equal(f.run().status, 'failed')
  oldIntact(f.target)
})

test('危险名称与 Windows 设备名称不产生安装目录', t => {
  const f = fixture(t)
  for (const name of ['..', '../escape', 'bad..name', 'NUL', 'con.txt', 'COM1', 'LPT9.log', 'trailing.']) {
    assert.equal(portSkill({ ...f.skill, skillName: name }, f.plugin, f.targetRoot, true).status, 'failed')
  }
  oldIntact(f.target)
  assert.deepEqual(fs.readdirSync(f.targetRoot), ['demo'])
})

test('不改变公开名称清洗行为，但不能用 Harness 无法加载的名称覆盖旧版', t => {
  const f = fixture(t)
  assert.equal(sanitizeSkillName('Demo_Name.ext'), 'Demo_Name.ext')
  for (const rawName of ['Demo', 'demo_name', 'demo.name', 'demo/name']) {
    const safeName = sanitizeSkillName(rawName)
    const oldTarget = join(f.targetRoot, safeName)
    // Case-only variants share the existing directory on Windows.
    if (!fs.existsSync(oldTarget)) fs.mkdirSync(oldTarget)
    fs.writeFileSync(join(oldTarget, 'SKILL.md'), '# old user version\n')
    fs.writeFileSync(join(oldTarget, 'user.txt'), 'keep me exactly\n')
    fs.writeFileSync(join(f.source, 'SKILL.md'), '---\nname: ' + rawName + '\ndescription: Source description\n---\nBody')
    const result = portSkill({ ...f.skill, skillName: rawName }, f.plugin, f.targetRoot, true)
    assert.equal(result.status, 'failed', rawName)
    assert.match(result.reason, /DSH 技能名称/)
    oldIntact(oldTarget)
  }
})

test('按 Harness 解析要求拒绝空描述，允许有名称和描述的空正文', t => {
  const f = fixture(t)
  fs.writeFileSync(join(f.source, 'SKILL.md'), "---\nname: demo\ndescription: ''\n---\nBody")
  assert.equal(f.run().status, 'failed')
  oldIntact(f.target)
  fs.writeFileSync(join(f.source, 'SKILL.md'), '---\nname: demo\ndescription: Valid description\n---\n')
  assert.equal(f.run().status, 'ported')
})
