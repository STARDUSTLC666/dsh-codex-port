import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { discoverPlugins, portSkill } from '../lib/index.js'
import { buildFixtureCodexHome, makeTestDir, removeTestDir } from './fixture.mjs'

const home = buildFixtureCodexHome()
const target = makeTestDir('dsh-codex-port-tgt-')

test('portSkill：拷贝 + 转换 + 剔除 agents', () => {
  const plugins = discoverPlugins(home)
  const remotion = plugins.find((p) => p.name === 'remotion-fixture')
  const result = portSkill(remotion.skills[0], remotion, target, false)
  assert.equal(result.status, 'ported')
  assert.equal(result.skill, 'video-best')
  assert.equal(result.files, 2, 'SKILL.md + rules/audio.md（agents 剔除）')
  assert.ok(existsSync(join(target, 'video-best', 'SKILL.md')))
  assert.ok(existsSync(join(target, 'video-best', 'rules', 'audio.md')))
  assert.equal(existsSync(join(target, 'video-best', 'agents')), false, 'agents 目录被剔除')
  const converted = readFileSync(join(target, 'video-best', 'SKILL.md'), 'utf8')
  assert.ok(converted.includes('allowed-tools: Bash'))
})

test('portSkill：同名跳过（overwrite=false）', () => {
  const plugins = discoverPlugins(home)
  const remotion = plugins.find((p) => p.name === 'remotion-fixture')
  const result = portSkill(remotion.skills[0], remotion, target, false)
  assert.equal(result.status, 'skipped')
  assert.ok(result.reason.includes('已存在'))
})

test('portSkill：overwrite=true 覆盖', () => {
  const plugins = discoverPlugins(home)
  const remotion = plugins.find((p) => p.name === 'remotion-fixture')
  // 先污染目标再覆盖
  writeFileSync(join(target, 'video-best', 'SKILL.md'), '# polluted', 'utf8')
  const result = portSkill(remotion.skills[0], remotion, target, true)
  assert.equal(result.status, 'ported')
  const converted = readFileSync(join(target, 'video-best', 'SKILL.md'), 'utf8')
  assert.ok(converted.includes('# Video Best'))
})

test('portSkill：非法技能名标记 failed', () => {
  const fake = {
    skillDirName: 'bad..name', skillName: '..', description: '',
    sourceDir: join(target, 'unused'), skillFile: join(target, 'unused', 'SKILL.md'),
  }
  const plugin = { name: 'p', version: '1', description: '', homepage: '', license: '', sourceDir: '', skills: [] }
  const result = portSkill(fake, plugin, target, false)
  assert.equal(result.status, 'failed')
})

test('cleanup', () => { removeTestDir(home); removeTestDir(target) })
