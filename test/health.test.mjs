import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { buildCodexPortTools, resolveConfig } from '../lib/index.js'
import { makeTestDir, removeTestDir, testRoot } from './fixture.mjs'

test('codex_health 目录齐全时 ok=true', async () => {
  const dir = makeTestDir('dsh-codex-health-')
  await fs.mkdir(path.join(dir, 'plugins'))
  const cfg = resolveConfig({ codexHome: dir })
  const health = buildCodexPortTools(cfg).find((t) => t.name === 'codex_health')
  const value = await health.execute({})
  assert.equal(value.ok, true)
  assert.equal(value.codexHome, dir)
  removeTestDir(dir)
})

test('codex_health 目录不存在时 ok=false 且有指引', async () => {
  const cfg = resolveConfig({ codexHome: path.join(testRoot, 'no-such-codex-dir-xyz') })
  const health = buildCodexPortTools(cfg).find((t) => t.name === 'codex_health')
  const value = await health.execute({})
  assert.equal(value.ok, false)
  assert.match(String(value.checks[0].detail), /不存在/)
})
