/** 构造临时 Codex 家目录 fixture：解包插件 + 缓存插件 + 噪音目录。 */
import { mkdirSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export function buildFixtureCodexHome() {
  const home = mkdtempSync(join(tmpdir(), 'dsh-codex-port-fix-'))

  const unpacked = join(home, '.tmp', 'plugins', 'plugins', 'remotion-fixture')
  mkdirSync(join(unpacked, '.codex-plugin'), { recursive: true })
  mkdirSync(join(unpacked, 'skills', 'video-best', 'rules'), { recursive: true })
  mkdirSync(join(unpacked, 'skills', 'video-best', 'agents'), { recursive: true })
  writeFileSync(join(unpacked, '.codex-plugin', 'plugin.json'), JSON.stringify({
    name: 'remotion-fixture', version: '1.2.0', description: 'Video skills for testing', homepage: 'https://example.com/remotion', license: 'MIT',
  }))
  writeFileSync(join(unpacked, 'skills', 'video-best', 'SKILL.md'), [
    '---',
    'name: video-best',
    'description: Best practices for video creation',
    'metadata:',
    '  tags: video, react',
    '---',
    '# Video Best',
    '',
    'Body text with \'quotes\' and: colons.',
    '',
  ].join('\n'))
  writeFileSync(join(unpacked, 'skills', 'video-best', 'rules', 'audio.md'), '# Audio rules')
  writeFileSync(join(unpacked, 'skills', 'video-best', 'agents', 'openai.yaml'), 'codex-agent: true')

  const cache = join(home, 'plugins', 'cache', 'openai-api-curated', 'github-fixture', 'abc123')
  mkdirSync(join(cache, '.codex-plugin'), { recursive: true })
  mkdirSync(join(cache, 'skills', 'gh-tools'), { recursive: true })
  writeFileSync(join(cache, '.codex-plugin', 'plugin.json'), JSON.stringify({
    name: 'github-fixture', version: '0.9.0', description: '', homepage: '', license: 'Apache-2.0',
  }))
  writeFileSync(join(cache, 'skills', 'gh-tools', 'SKILL.md'), [
    '---',
    'name: gh-tools',
    'description: |',
    '  GitHub automation tools.',
    '  Covers issues, pull requests,',
    '  and releases.',
    '---',
    '# GH Tools',
    '',
    'Body.',
    '',
  ].join('\n'))

  // 噪音目录：没有 plugin.json，应被忽略
  mkdirSync(join(home, '.tmp', 'plugins', 'plugins', 'not-a-plugin', 'skills', 'x'), { recursive: true })
  writeFileSync(join(home, '.tmp', 'plugins', 'plugins', 'not-a-plugin', 'skills', 'x', 'SKILL.md'), '# x')

  return home
}
