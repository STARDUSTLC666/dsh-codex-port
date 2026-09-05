import { test } from 'node:test'
import assert from 'node:assert/strict'
import { discoverPlugins } from '../lib/index.js'
import { buildFixtureCodexHome, removeTestDir } from './fixture.mjs'

const home = buildFixtureCodexHome()

test('发现 2 个插件并忽略无 manifest 的目录', () => {
  const plugins = discoverPlugins(home)
  assert.equal(plugins.length, 2)
  const names = plugins.map((p) => p.name).sort()
  assert.deepEqual(names, ['github-fixture', 'remotion-fixture'])
})

test('插件元信息与技能枚举', () => {
  const plugins = discoverPlugins(home)
  const remotion = plugins.find((p) => p.name === 'remotion-fixture')
  assert.equal(remotion.version, '1.2.0')
  assert.equal(remotion.homepage, 'https://example.com/remotion')
  assert.equal(remotion.license, 'MIT')
  assert.equal(remotion.skills.length, 1)
  assert.equal(remotion.skills[0].skillName, 'video-best')
  assert.equal(remotion.skills[0].skillDirName, 'video-best')
  assert.ok(remotion.skills[0].description.includes('Best practices'))
})

test('缓存目录里的插件也被发现（版本哈希子目录）', () => {
  const plugins = discoverPlugins(home)
  const github = plugins.find((p) => p.name === 'github-fixture')
  assert.equal(github.version, '0.9.0')
  assert.equal(github.skills.length, 1)
  assert.equal(github.skills[0].skillName, 'gh-tools')
})

test('cleanup', () => { removeTestDir(home) })
