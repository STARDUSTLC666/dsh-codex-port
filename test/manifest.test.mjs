import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

test('dsh.bundle.patch 指向存在的补丁文件', () => {
  const pkg = require('../package.json')
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  assert.ok(existsSync(new URL('../cordis.patch.yml', import.meta.url)))
})

test('exports 暴露 package.json 与 cordis.patch.yml', () => {
  const pkg = require('../package.json')
  assert.equal(pkg.exports['./package.json'], './package.json')
  assert.equal(pkg.exports['./cordis.patch.yml'], './cordis.patch.yml')
})

test('cordis.patch.yml 插入行名为 dsh-codex-port', () => {
  const patch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
  assert.match(patch, /name: 'dsh-codex-port'/)
  assert.match(patch, /- insert:/)
})

test('名称与版本', () => {
  const pkg = require('../package.json')
  assert.equal(pkg.name, 'dsh-codex-port')
  assert.equal(pkg.version, '0.1.0')
})
