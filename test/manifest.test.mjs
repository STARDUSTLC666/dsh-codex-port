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
  assert.match(pkg.version, /^\d+\.\d+\.\d+$/)
  assert.equal(pkg.dsh.manifestVersion, 1)
  assert.equal(pkg.exports['./locale/*.json'], './locale/*.json')
  assert.ok(existsSync(new URL('../locale/zh.json', import.meta.url)))
  assert.ok(existsSync(new URL('../locale/en.json', import.meta.url)))
})

test('Cordis 4 ctx.effect 卸载时正确清理工具注册', async () => {
  const { apply } = await import('../lib/index.js')
  const active = new Set()
  const effects = []
  apply({
    tools: {
      register(def) {
        active.add(def.name)
        return () => active.delete(def.name)
      },
    },
    effect(fn) { effects.push(fn()) },
  }, {})
  assert.equal(active.size, 4)
  for (const dispose of effects) dispose?.()
  assert.equal(active.size, 0)
})
