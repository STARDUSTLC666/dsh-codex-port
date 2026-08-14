import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, rmSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildCodexPortTools, resolveConfig } from '../lib/index.js'
import { buildFixtureCodexHome } from './fixture.mjs'

const home = buildFixtureCodexHome()
const target = mkdtempSync(join(tmpdir(), 'dsh-codex-port-tools-'))
const cfg = resolveConfig({ codexHome: home, targetDir: target })

test('构建 3 个工具且名字正确', () => {
  const names = buildCodexPortTools(cfg).map((t) => t.name).sort()
  assert.deepEqual(names, ['codex_list', 'codex_port', 'codex_status'])
})

test('每个工具 parameters 是 object JSON Schema，输出含 render', () => {
  for (const tool of buildCodexPortTools(cfg)) {
    assert.equal(tool.parameters.type, 'object')
    assert.equal(typeof tool.parameters.properties, 'object')
    assert.equal(tool.output.schema.type, 'object')
    assert.equal(typeof tool.output.render, 'function')
    assert.equal(typeof tool.execute, 'function')
  }
})

test('codex_list：总数与过滤', async () => {
  const list = buildCodexPortTools(cfg).find((t) => t.name === 'codex_list')
  const all = await list.execute({})
  assert.equal(all.total, 2)
  assert.equal(all.count, 2)
  const filtered = await list.execute({ plugin: 'github' })
  assert.equal(filtered.total, 2)
  assert.equal(filtered.count, 1)
  assert.equal(filtered.plugins[0].name, 'github-fixture')
  const bySkill = await list.execute({ skill: 'video' })
  assert.equal(bySkill.count, 1)
})

test('codex_port：全量移植两个技能', async () => {
  const port = buildCodexPortTools(cfg).find((t) => t.name === 'codex_port')
  const value = await port.execute({})
  assert.equal(value.counts.ported, 2)
  assert.equal(value.counts.skipped, 0)
  assert.equal(value.counts.failed, 0)
  assert.ok(existsSync(join(target, 'video-best', 'SKILL.md')))
  assert.ok(existsSync(join(target, 'gh-tools', 'SKILL.md')))
})

test('codex_port：再次执行全部跳过', async () => {
  const port = buildCodexPortTools(cfg).find((t) => t.name === 'codex_port')
  const value = await port.execute({})
  assert.equal(value.counts.skipped, 2)
})

test('codex_port：skills 过滤 + targetDir 覆盖 + overwrite', async () => {
  const port = buildCodexPortTools(cfg).find((t) => t.name === 'codex_port')
  const other = mkdtempSync(join(tmpdir(), 'dsh-codex-port-other-'))
  const value = await port.execute({ skills: ['gh-tools'], targetDir: other, overwrite: true })
  assert.equal(value.counts.ported, 1)
  assert.equal(value.targetDir, other)
  assert.ok(existsSync(join(other, 'gh-tools', 'SKILL.md')))
  rmSync(other, { recursive: true, force: true })
})

test('codex_status：已移植统计', async () => {
  const status = buildCodexPortTools(cfg).find((t) => t.name === 'codex_status')
  const value = await status.execute({})
  assert.equal(value.plugins, 2)
  assert.equal(value.skills, 2)
  assert.equal(value.installed, 2)
  assert.equal(value.missing, 0)
})

test('execute 返回值可 JSON 序列化', async () => {
  const list = buildCodexPortTools(cfg).find((t) => t.name === 'codex_list')
  const value = await list.execute({})
  assert.deepEqual(JSON.parse(JSON.stringify(value)), value)
})

test('cleanup', () => { rmSync(home, { recursive: true, force: true }); rmSync(target, { recursive: true, force: true }) })
