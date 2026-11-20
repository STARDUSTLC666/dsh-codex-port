import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { join } from 'node:path'
import { syncBuiltinESMExports } from 'node:module'
import { discoverPlugins } from '../lib/index.js'
import { buildFixtureCodexHome, removeTestDir } from './fixture.mjs'

test('discovery reads frontmatter without loading the full skill body', t => {
  const home = buildFixtureCodexHome()
  const file = join(home, '.tmp', 'plugins', 'plugins', 'remotion-fixture', 'skills', 'video-best', 'SKILL.md')
  fs.writeFileSync(file, '---\nname: renamed-example\ndescription: Header stays readable\n---\n' + 'large body content\n'.repeat(100000))
  const original = fs.readFileSync
  t.mock.method(fs, 'readFileSync', function (target, ...args) {
    if (String(target) === file) throw new Error('A listing must not allocate the complete skill body')
    return original.call(this, target, ...args)
  })
  syncBuiltinESMExports()
  t.after(() => { t.mock.restoreAll(); syncBuiltinESMExports(); removeTestDir(home) })
  const plugin = discoverPlugins(home).find(row => row.name === 'remotion-fixture')
  assert.equal(plugin.skills[0].skillName, 'renamed-example')
  assert.equal(plugin.skills[0].description, 'Header stays readable')
})

test('frontmatter split across read chunks preserves UTF-8 and the existing parser behavior', t => {
  const home = buildFixtureCodexHome()
  t.after(() => removeTestDir(home))
  const file = join(home, '.tmp', 'plugins', 'plugins', 'remotion-fixture', 'skills', 'video-best', 'SKILL.md')
  fs.writeFileSync(file, '---\r\nname: boundary-example\r\nmetadata:\r\n  note: "' + '📘'.repeat(9000) + '"\r\ndescription: Complete header\r\n---\r\n# Body\r\n')
  const skill = discoverPlugins(home).find(row => row.name === 'remotion-fixture').skills[0]
  assert.equal(skill.skillName, 'boundary-example')
  assert.equal(skill.description, 'Complete header')
})
