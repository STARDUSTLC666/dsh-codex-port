import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { discoverPlugins, portSkill, parseSkillFile, convertSkillFile, buildCodexPortTools, resolveConfig } from '../lib/index.js'
import { buildFixtureCodexHome, makeTestDir, removeTestDir } from './fixture.mjs'

function fixture(t) {
  const home = buildFixtureCodexHome(), target = makeTestDir('policy-target-')
  t.after(() => { removeTestDir(home); removeTestDir(target) })
  const plugin = discoverPlugins(home).find(plugin => plugin.name === 'remotion-fixture')
  return { home, target, plugin, skill: plugin.skills[0] }
}
test('skill invocation controls, routing metadata and skill-level license survive conversion', () => {
  const result = parseSkillFile(convertSkillFile('---\nname: manual-skill\ndescription: Synthetic\nlicense: Apache-2.0\ndisable-model-invocation: true\nuser-invocable: false\nwhenToUse: Only when explicitly requested\nmetadata:\n  category: maintenance\n---\n# Body', { pluginName: 'synthetic', license: 'MIT', homepage: '' }, 'manual-skill'))
  assert.equal(result.frontmatter['disable-model-invocation'], true)
  assert.equal(result.frontmatter['user-invocable'], false)
  assert.equal(result.frontmatter.whenToUse, 'Only when explicitly requested')
  assert.deepEqual(result.frontmatter.metadata, { category: 'maintenance' })
  assert.equal(result.frontmatter.license, 'Apache-2.0')
  assert.match(result.frontmatter.compatibility, /Apache-2\.0/)
})
test('agents/openai.yaml manual-only policy maps before agents are excluded; preview explains it', t => {
  const f = fixture(t)
  writeFileSync(join(f.skill.sourceDir, 'agents/openai.yaml'), 'interface:\n  display_name: Synthetic\npolicy:\n  allow_implicit_invocation: false\n')
  const preview = portSkill(f.skill, f.plugin, f.target, false, true)
  assert.equal(preview.status, 'planned')
  assert.match(preview.reason, /手动|显式/)
  assert.deepEqual(readdirSync(f.target), [])
  const result = portSkill(f.skill, f.plugin, f.target, false)
  assert.equal(result.status, 'ported')
  const header = parseSkillFile(readFileSync(join(f.target, 'video-best/SKILL.md'), 'utf8')).frontmatter
  assert.equal(header['disable-model-invocation'], true)
  assert.equal(existsSync(join(f.target, 'video-best/agents')), false)
})
test('overwrite=false preserves flat files and differently named folders with the same skill identity', t => {
  const f = fixture(t), text = '---\nname: video-best\ndescription: My own skill\n---\nUser original'
  for (const shape of ['flat', 'alias']) {
    const target = join(f.target, shape); mkdirSync(target)
    const file = shape === 'flat' ? join(target, 'video-best.md') : join(target, 'my-original/SKILL.md')
    if (shape === 'alias') mkdirSync(join(target, 'my-original'))
    writeFileSync(file, text)
    const result = portSkill(f.skill, f.plugin, target, false)
    assert.equal(result.status, 'skipped', shape)
    assert.equal(readFileSync(file, 'utf8'), text)
    assert.equal(existsSync(join(target, 'video-best')), false)
  }
})
test('native catalog collisions from other roots are skipped without creating a shadowing skill', async t => {
  const f = fixture(t)
  const tools = buildCodexPortTools(resolveConfig({ codexHome: f.home, targetDir: f.target }), { existingSkillNames: async () => ['video-best'] })
  const preview = await tools.find(tool => tool.name === 'codex_port').execute({ dryRun: true }, {})
  assert.equal(preview.counts.skipped, 1)
  assert.equal(preview.plannedCount, 1)
  assert.deepEqual(readdirSync(f.target), [])
})
test('malformed invocation policy cannot silently enable automatic invocation', t => {
  const f = fixture(t)
  writeFileSync(join(f.skill.sourceDir, 'agents/openai.yaml'), 'policy:\n  allow_implicit_invocation: "false"\n')
  const result = portSkill(f.skill, f.plugin, f.target, false)
  assert.equal(result.status, 'failed')
  assert.match(result.reason, /allow_implicit_invocation|策略/)
  assert.deepEqual(readdirSync(f.target), [])
})

test('status counts valid identities, not empty installation directories', async t => {
  const f = fixture(t)
  mkdirSync(join(f.target, 'video-best'))
  const status = buildCodexPortTools(resolveConfig({ codexHome: f.home, targetDir: f.target })).find(tool => tool.name === 'codex_status')
  const receipt = await status.execute({}, {})
  assert.equal(receipt.installed, 0)
  assert.ok(receipt.missingNames.includes('video-best'))
})
