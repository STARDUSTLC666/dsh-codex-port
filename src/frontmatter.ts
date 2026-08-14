/**
 * frontmatter 转换引擎：读取 Codex SKILL.md 的 YAML frontmatter，
 * 生成 DSH 格式（name/description/compatibility/allowed-tools）。
 *
 * @module dsh-codex-port/frontmatter
 */
import YAML from 'yaml'

/** 安全的技能名：DSH 技能目录名约束。 */
export const SKILL_NAME_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

/**
 * 清洗技能名：非法字符替换为下划线；空则返回 null（跳过该技能）。
 */
export function sanitizeSkillName(name: string): string | null {
  const cleaned = name.trim().replace(/[^A-Za-z0-9._-]/g, '_')
  if (cleaned === '' || !SKILL_NAME_PATTERN.test(cleaned)) return null
  if (cleaned.includes('..')) return null
  return cleaned
}

export interface ParsedSkillFile {
  frontmatter: Record<string, unknown>
  body: string
  hasFrontmatter: boolean
}

/**
 * 拆分 SKILL.md 的 frontmatter 与正文。
 */
export function parseSkillFile(text: string): ParsedSkillFile {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (!match) return { frontmatter: {}, body: text, hasFrontmatter: false }
  try {
    const parsed = YAML.parse(match[1])
    const record = typeof parsed === 'object' && parsed !== null ? parsed as Record<string, unknown> : {}
    return { frontmatter: record, body: text.slice(match[0].length), hasFrontmatter: true }
  } catch {
    return { frontmatter: {}, body: text, hasFrontmatter: false }
  }
}

/** 插件来源信息（用于 compatibility 行）。 */
export interface PluginAttribution {
  pluginName: string
  homepage: string
  license: string
}

/**
 * 生成 DSH 格式 frontmatter 文本（含首尾 ---）。
 */
export function toDshFrontmatter(frontmatter: Record<string, unknown>, attribution: PluginAttribution): string {
  const rawName = typeof frontmatter.name === 'string' ? frontmatter.name : ''
  const fallbackName = typeof frontmatter.title === 'string' ? frontmatter.title : ''
  const name = rawName !== '' ? rawName : fallbackName
  const description = typeof frontmatter.description === 'string' ? frontmatter.description : ''
  const compatibility = 'Ported from Codex plugin ' + attribution.pluginName + (attribution.homepage !== '' ? ' (' + attribution.homepage + ')' : '') + (attribution.license !== '' && attribution.license !== 'unknown' ? ', license ' + attribution.license : '') + '.'
  const doc = { name, description, compatibility, 'allowed-tools': 'Bash' }
  return '---\n' + YAML.stringify(doc).trimEnd() + '\n---\n'
}

/**
 * 转换整个 SKILL.md 文本。
 */
export function convertSkillFile(text: string, attribution: PluginAttribution, fallbackName: string): string {
  const parsed = parseSkillFile(text)
  const frontmatter = parsed.hasFrontmatter ? parsed.frontmatter : { name: fallbackName, description: '' }
  return toDshFrontmatter(frontmatter, attribution) + '\n' + parsed.body.trimStart()
}
