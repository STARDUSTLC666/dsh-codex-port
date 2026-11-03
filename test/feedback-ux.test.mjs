import { test } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { buildCodexPortTools, resolveConfig } from '../lib/index.js'
import { buildFixtureCodexHome, makeTestDir, removeTestDir } from './fixture.mjs'

const home = buildFixtureCodexHome()
const target = makeTestDir('dsh-codex-port-ux-')
const cfg = resolveConfig({ codexHome: home, targetDir: target })

test('codex_port：跳过原因渲染到输出（以前只在 payload 里）', async () => {
  const port = buildCodexPortTools(cfg).find((t) => t.name === 'codex_port')
  await port.execute({})
  const again = await port.execute({})
  assert.equal(again.counts.skipped, 2)
  const text = port.output.render({}, again)[0].text
  assert.match(text, /跳过 2 个/)
  assert.match(text, /overwrite=false/)
  assert.match(text, /overwrite:true/)
})

test('codex_port dryRun：预览清单可读且明确未改文件', async () => {
  const port = buildCodexPortTools(cfg).find((t) => t.name === 'codex_port')
  const other = makeTestDir('dsh-codex-port-ux-dry-')
  const value = await port.execute({ dryRun: true, targetDir: other })
  const text = port.output.render({}, value)[0].text
  assert.match(text, /未修改任何文件/)
  assert.match(text, /去掉 dryRun/)
  assert.doesNotMatch(text, /"skill":/)
  removeTestDir(other)
})

test('codex_status：列出未移植技能并给出下一步', async () => {
  const fresh = makeTestDir('dsh-codex-port-ux-status-')
  const status = buildCodexPortTools(resolveConfig({ codexHome: home, targetDir: fresh })).find((t) => t.name === 'codex_status')
  const value = await status.execute({})
  assert.equal(value.missing, 2)
  const text = status.output.render({}, value)[0].text
  assert.match(text, /未移植：/)
  assert.match(text, /codex_port/)
  removeTestDir(fresh)
})

test('codex_list：没有插件时给出下一步而不是「发现 0 个」', async () => {
  const empty = makeTestDir('dsh-codex-port-ux-empty-')
  const list = buildCodexPortTools(resolveConfig({ codexHome: empty, targetDir: target })).find((t) => t.name === 'codex_list')
  const value = await list.execute({})
  assert.equal(value.total, 0)
  const text = list.output.render({}, value)[0].text
  assert.match(text, /下一步：/)
  assert.match(text, /codex_health/)
  removeTestDir(empty)
})

test('codex_health：报告目标技能目录与可发现技能数', async () => {
  const health = buildCodexPortTools(cfg).find((t) => t.name === 'codex_health')
  const value = await health.execute({})
  assert.equal(value.ok, true)
  const names = value.checks.map((c) => c.name)
  assert.deepEqual(names, ['Codex 主目录', '插件目录', '目标技能目录', '可发现插件'])
  assert.match(String(value.checks[2].detail), /可写/)
  assert.match(String(value.checks[3].detail), /2 个插件 \/ 2 个技能/)
})

test('codex_health：目标目录尚不存在时说明会自动创建（不算故障）', async () => {
  const fresh = makeTestDir('dsh-codex-port-ux-missing-')
  const health = buildCodexPortTools(resolveConfig({ codexHome: home, targetDir: join(fresh, 'skills') })).find((t) => t.name === 'codex_health')
  const value = await health.execute({})
  assert.equal(value.ok, true)
  assert.match(String(value.checks[2].detail), /首次 codex_port 会自动创建/)
  removeTestDir(fresh)
})

test('codex_health：主目录不存在时 ok=false 且下一步可执行', async () => {
  const health = buildCodexPortTools(resolveConfig({ codexHome: join(target, 'no-such-codex-home') })).find((t) => t.name === 'codex_health')
  const value = await health.execute({})
  assert.equal(value.ok, false)
  const text = health.output.render({}, value)[0].text
  assert.match(text, /自检：发现问题/)
  assert.match(text, /下一步：/)
  assert.match(text, /codexHome/)
})

test('cleanup', () => { removeTestDir(home); removeTestDir(target) })
