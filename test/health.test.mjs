import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as fs from 'node:fs/promises'
import * as os from 'node:os'
import * as path from 'node:path'
import { buildCodexPortTools, resolveConfig } from '../lib/index.js'

test('codex_health 目录齐全时 ok=true', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-codex-health-'))
  await fs.mkdir(path.join(dir, 'plugins'))
  const cfg = resolveConfig({ codexHome: dir })
  const health = buildCodexPortTools(cfg).find((t) => t.name === 'codex_health')
  const value = await health.execute({})
  assert.equal(value.ok, true)
  assert.equal(value.codexHome, dir)
  await fs.rm(dir, { recursive: true, force: true })
})

test('codex_health 目录不存在时 ok=false 且有指引', async () => {
  const cfg = resolveConfig({ codexHome: path.join(os.tmpdir(), 'no-such-codex-dir-xyz') })
  const health = buildCodexPortTools(cfg).find((t) => t.name === 'codex_health')
  const value = await health.execute({})
  assert.equal(value.ok, false)
  assert.match(String(value.checks[0].detail), /不存在/)
})
