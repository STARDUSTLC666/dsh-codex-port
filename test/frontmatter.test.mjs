import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import YAML from 'yaml'
import { sanitizeSkillName, parseSkillFile, convertSkillFile, toDshFrontmatter } from '../lib/index.js'
import { buildFixtureCodexHome } from './fixture.mjs'

const home = buildFixtureCodexHome()

test('sanitizeSkillName：合法名保留，非法字符替换，防穿越', () => {
  assert.equal(sanitizeSkillName('video-best'), 'video-best')
  assert.equal(sanitizeSkillName('a/b\\c'), 'a_b_c')
  assert.equal(sanitizeSkillName('..'), null)
  assert.equal(sanitizeSkillName('../etc'), null)
  assert.equal(sanitizeSkillName(''), null)
})

test('parseSkillFile：拆分 frontmatter 与正文', () => {
  const text = readFileSync(join(home, '.tmp', 'plugins', 'plugins', 'remotion-fixture', 'skills', 'video-best', 'SKILL.md'), 'utf8')
  const parsed = parseSkillFile(text)
  assert.equal(parsed.hasFrontmatter, true)
  assert.equal(parsed.frontmatter.name, 'video-best')
  assert.equal(typeof parsed.frontmatter.metadata, 'object')
  assert.ok(parsed.body.includes('# Video Best'))
})

test('多行 description（| 块）完整解析', () => {
  const text = readFileSync(join(home, 'plugins', 'cache', 'openai-api-curated', 'github-fixture', 'abc123', 'skills', 'gh-tools', 'SKILL.md'), 'utf8')
  const parsed = parseSkillFile(text)
  assert.equal(parsed.frontmatter.name, 'gh-tools')
  assert.ok(parsed.frontmatter.description.includes('GitHub automation tools.'))
  assert.ok(parsed.frontmatter.description.includes('releases.'))
})

test('convertSkillFile 产出合法 DSH frontmatter（可 YAML 回读）', () => {
  const text = readFileSync(join(home, '.tmp', 'plugins', 'plugins', 'remotion-fixture', 'skills', 'video-best', 'SKILL.md'), 'utf8')
  const converted = convertSkillFile(text, { pluginName: 'remotion-fixture', homepage: 'https://example.com/remotion', license: 'MIT' }, 'video-best')
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(converted)
  assert.ok(match, '有 frontmatter')
  const doc = YAML.parse(match[1])
  assert.equal(doc.name, 'video-best')
  assert.equal(doc['allowed-tools'], 'Bash')
  assert.ok(doc.description.includes('Best practices'))
  assert.ok(doc.compatibility.includes('remotion-fixture'))
  assert.ok(doc.compatibility.includes('https://example.com/remotion'))
  assert.ok(converted.includes('# Video Best'), '正文保留')
  assert.ok(converted.includes('colons.'), '正文冒号不被破坏')
})

test('无 frontmatter 的文件用回退名转换', () => {
  const converted = convertSkillFile('# Plain body', { pluginName: 'x', homepage: '', license: '' }, 'plain-skill')
  const doc = YAML.parse(/^---\r?\n([\s\S]*?)\r?\n---/.exec(converted)[1])
  assert.equal(doc.name, 'plain-skill')
  assert.equal(doc.description, '')
})

test('toDshFrontmatter 输出可解析', () => {
  const text = toDshFrontmatter({ name: 'demo', description: 'A: B \'quoted\' text' }, { pluginName: 'demo-plugin', homepage: '', license: 'MIT' })
  const doc = YAML.parse(text.slice(4, text.lastIndexOf('---')).trim())
  assert.equal(doc.name, 'demo')
  assert.equal(doc.description, "A: B 'quoted' text")
})

test('cleanup', () => { rmSync(home, { recursive: true, force: true }) })
