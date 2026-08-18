/**
 * 插件发现：扫描 Codex 家目录里的解包插件（.tmp/plugins/plugins/*）与
 * 插件缓存（plugins/cache/<分类>/<名>/<版本或哈希>/），解析 plugin.json 与 skills。
 *
 * @module dsh-codex-port/discover
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

/** 单个技能源。 */
export interface CodexSkillSource {
  skillDirName: string
  skillName: string
  description: string
  sourceDir: string
  skillFile: string
}

/** 单个插件。 */
export interface CodexPluginInfo {
  name: string
  version: string
  description: string
  homepage: string
  license: string
  sourceDir: string
  skills: CodexSkillSource[]
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
}

function isDir(path: string): boolean {
  try { return statSync(path).isDirectory() } catch { return false }
}

/** 语义化版本比较：按数字段逐段比较，忽略 v 前缀与 pre-release 后缀。 */
function isNewerVersion(a: string, b: string): boolean {
  const parse = (v: string): number[] => {
    const match = /v?(\d+(?:\.\d+)*)/.exec(v)
    if (match === null) return []
    return match[1].split('.').map((n) => Number(n))
  }
  const pa = parse(a)
  const pb = parse(b)
  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i += 1) {
    const x = pa[i] ?? 0
    const y = pb[i] ?? 0
    if (x !== y) return x > y
  }
  return false
}

/** 读取 plugin.json；缺失或非法返回 null。 */
function readPluginManifest(pluginDir: string): { name: string; version: string; description: string; homepage: string; license: string } | null {
  const manifestPath = join(pluginDir, '.codex-plugin', 'plugin.json')
  if (!existsSync(manifestPath)) return null
  try {
    const raw = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, unknown>
    const name = typeof raw.name === 'string' ? raw.name : ''
    if (name === '') return null
    return {
      name,
      version: typeof raw.version === 'string' ? raw.version : 'unknown',
      description: typeof raw.description === 'string' ? raw.description : '',
      homepage: typeof raw.homepage === 'string' ? raw.homepage : '',
      license: typeof raw.license === 'string' ? raw.license : 'unknown',
    }
  } catch {
    return null
  }
}

/** 从插件目录枚举技能（skills/<dir>/SKILL.md）。 */
function enumerateSkills(pluginDir: string): CodexSkillSource[] {
  const skillsDir = join(pluginDir, 'skills')
  if (!isDir(skillsDir)) return []
  const result: CodexSkillSource[] = []
  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const skillDir = join(skillsDir, entry.name)
    const skillFile = join(skillDir, 'SKILL.md')
    if (!existsSync(skillFile)) continue
    let skillName = entry.name
    let description = ''
    try {
      const text = readFileSync(skillFile, 'utf8')
      const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)
      if (match) {
        // 粗略读取 name/description（完整解析在移植时用 YAML 做）
        const nameMatch = /^name:\s*(.+)$/m.exec(match[1])
        const descMatch = /^description:\s*(.+)$/m.exec(match[1])
        if (nameMatch) skillName = nameMatch[1].trim().replace(/^["']|["']$/g, '')
        if (descMatch) description = descMatch[1].trim().replace(/^["']|["']$/g, '').slice(0, 160)
      }
    } catch { /* 读取失败保持目录名 */ }
    result.push({ skillDirName: entry.name, skillName, description, sourceDir: skillDir, skillFile })
  }
  return result
}

/**
 * 发现所有 Codex 插件。
 * 顺序：解包目录（.tmp/plugins/plugins/*）优先，缓存目录（plugins/cache/**）其次；
 * 同名插件按 版本最新 > 目录修改时间 去重。
 */
export function discoverPlugins(codexHome: string): CodexPluginInfo[] {
  const found = new Map<string, CodexPluginInfo>()
  const seen = new Set<string>()
  const candidates: Array<{ dir: string; priority: number }> = []

  const unpacked = join(codexHome, '.tmp', 'plugins', 'plugins')
  if (isDir(unpacked)) {
    for (const entry of readdirSync(unpacked, { withFileTypes: true })) {
      if (entry.isDirectory()) candidates.push({ dir: join(unpacked, entry.name), priority: 2 })
    }
  }
  const cacheRoot = join(codexHome, 'plugins', 'cache')
  if (isDir(cacheRoot)) {
    for (const category of readdirSync(cacheRoot, { withFileTypes: true })) {
      if (!category.isDirectory()) continue
      const categoryDir = join(cacheRoot, category.name)
      for (const nameEntry of readdirSync(categoryDir, { withFileTypes: true })) {
        if (!nameEntry.isDirectory()) continue
        const nameDir = join(categoryDir, nameEntry.name)
        if (existsSync(join(nameDir, '.codex-plugin', 'plugin.json'))) {
          candidates.push({ dir: nameDir, priority: 1 })
        } else {
          for (const child of readdirSync(nameDir, { withFileTypes: true })) {
            if (child.isDirectory()) candidates.push({ dir: join(nameDir, child.name), priority: 0 })
          }
        }
      }
    }
  }

  for (const candidate of candidates) {
    const manifest = readPluginManifest(candidate.dir)
    if (manifest === null) continue
    const key = manifest.name.toLowerCase()
    const skills = enumerateSkills(candidate.dir)
    const info: CodexPluginInfo = { ...manifest, sourceDir: candidate.dir, skills }
    const existing = found.get(key)
    if (existing === undefined) {
      found.set(key, info)
      seen.add(key + ':' + candidate.dir)
    } else {
      const betterPriority = candidate.priority > (candidates.find((c) => c.dir === existing.sourceDir)?.priority ?? -1)
      const newerVersion = manifest.version !== 'unknown' && manifest.version !== existing.version && isNewerVersion(manifest.version, existing.version)
      if (betterPriority || newerVersion) found.set(key, info)
    }
  }
  return [...found.values()].sort((a, b) => a.name.localeCompare(b.name))
}
