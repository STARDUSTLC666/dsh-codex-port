import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { buildCodexPortTools, discoverPlugins, resolveConfig } from '../lib/index.js'
import { buildFixtureCodexHome, makeTestDir, removeTestDir } from './fixture.mjs'

test('预览不创建目标目录，完整 YAML 描述可发现，实际安装落在会话工作区', async t => {
  const home = buildFixtureCodexHome(), workspace = makeTestDir('preview-workspace-')
  t.after(() => { removeTestDir(home); removeTestDir(workspace) })
  const listed = discoverPlugins(home).find(plugin => plugin.name === 'github-fixture')
  assert.match(listed.skills[0].description, /GitHub automation tools.*Covers issues/s)
  const cfg = resolveConfig({ codexHome: home, targetDir: join(workspace, 'default') })
  const tool = buildCodexPortTools(cfg).find(tool => tool.name === 'codex_port')
  const context = { agent: { session: { header: { cwd: workspace } } } }
  const preview = await tool.execute({ targetDir: 'imported', dryRun: true }, context)
  assert.equal(preview.plannedCount, 2)
  assert.equal(preview.counts.failed, 0)
  assert.equal(existsSync(join(workspace, 'imported')), false)
  assert.deepEqual(readdirSync(workspace), [])
  const installed = await tool.execute({ targetDir: 'imported' }, context)
  assert.equal(installed.counts.ported, 2)
  const before = readFileSync(join(workspace, 'imported/gh-tools/SKILL.md'), 'utf8')
  const beforeNames = readdirSync(join(workspace, 'imported')).sort()
  const replace = await tool.execute({ targetDir: 'imported', dryRun: true, overwrite: true }, context)
  assert.equal(replace.plannedCount, 2)
  assert.match(replace.planned[0].reason, /备份/)
  assert.equal(readFileSync(join(workspace, 'imported/gh-tools/SKILL.md'), 'utf8'), before)
  assert.deepEqual(readdirSync(join(workspace, 'imported')).sort(), beforeNames)
  const controller = new AbortController(); controller.abort(new Error('cancel before port'))
  await assert.rejects(tool.execute({ targetDir: 'cancelled' }, { ...context, signal: controller.signal }), /cancel before port/)
  assert.equal(existsSync(join(workspace, 'cancelled')), false)
})

test('配置中的相对目标也按会话工作区解析，状态与安装使用同一目录', async t => {
  const home = buildFixtureCodexHome(), workspace = makeTestDir('configured-target-')
  t.after(() => { removeTestDir(home); removeTestDir(workspace) })
  const tools = buildCodexPortTools(resolveConfig({ codexHome: home, targetDir: 'configured-skills' }))
  const context = { agent: { session: { header: { cwd: workspace } } } }
  const port = tools.find(tool => tool.name === 'codex_port')
  const status = tools.find(tool => tool.name === 'codex_status')
  const preview = await port.execute({ dryRun: true }, context)
  assert.equal(preview.targetDir, join(workspace, 'configured-skills'))
  assert.equal(existsSync(preview.targetDir), false)
  const installed = await port.execute({}, context)
  assert.equal(installed.counts.ported, 2)
  const receipt = await status.execute({}, context)
  assert.equal(receipt.targetDir, installed.targetDir)
  assert.equal(receipt.installed, 2)
  assert.equal(receipt.missing, 0)
})
