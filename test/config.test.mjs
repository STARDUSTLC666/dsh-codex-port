import test from 'node:test'
import assert from 'node:assert/strict'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { resolveConfig } from '../lib/config.js'

test('Codex home honors an isolated CODEX_HOME and explicit configuration wins', () => {
  const previous = process.env.CODEX_HOME
  try {
    process.env.CODEX_HOME = join(homedir(), 'isolated-codex-test')
    assert.equal(resolveConfig({}).codexHome, process.env.CODEX_HOME)
    assert.equal(resolveConfig({ codexHome: 'explicit-home' }).codexHome, 'explicit-home')
    process.env.CODEX_HOME = '   '
    assert.equal(resolveConfig({}).codexHome, join(homedir(), '.codex'))
    delete process.env.CODEX_HOME
    assert.equal(resolveConfig(null).codexHome, join(homedir(), '.codex'))
  } finally {
    if (previous === undefined) delete process.env.CODEX_HOME
    else process.env.CODEX_HOME = previous
  }
})
