/**
 * 移植执行：目录拷贝（剔除 agents 等 codex 专属文件）+ SKILL.md 转换 + 幂等跳过。
 *
 * @module dsh-codex-port/port
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { convertSkillFile, sanitizeSkillName } from './frontmatter.js'
import { type CodexPluginInfo, type CodexSkillSource } from './discover.js'

/** 单个技能的移植结果。 */
export interface PortResult {
  skill: string
  plugin: string
  status: 'ported' | 'skipped' | 'failed'
  reason: string
  files: number
}

/** codex 专属目录，移植时剔除。 */
const EXCLUDED_DIRS = new Set(['agents'])

/** 递归拷贝，跳过排除目录；返回拷贝文件数。 */
function copyTree(source: string, target: string): number {
  mkdirSync(target, { recursive: true })
  let count = 0
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue
    if (entry.isDirectory() && EXCLUDED_DIRS.has(entry.name)) continue
    const from = join(source, entry.name)
    const to = join(target, entry.name)
    if (entry.isDirectory()) {
      count += copyTree(from, to)
    } else {
      writeFileSync(to, readFileSync(from))
      count += 1
    }
  }
  return count
}

/**
 * 移植单个技能到目标目录。
 */
export function portSkill(skill: CodexSkillSource, plugin: CodexPluginInfo, targetDir: string, overwrite: boolean): PortResult {
  const safeName = sanitizeSkillName(skill.skillName !== '' ? skill.skillName : skill.skillDirName)
  if (safeName === null) {
    return { skill: skill.skillDirName, plugin: plugin.name, status: 'failed', reason: '技能名清洗后为空或不合法，已跳过（可能是纯中文或含危险字符的名称）', files: 0 }
  }
  const target = join(targetDir, safeName)
  if (existsSync(target) && !overwrite) {
    return { skill: safeName, plugin: plugin.name, status: 'skipped', reason: '目标技能已存在（overwrite=false），跳过以免覆盖', files: 0 }
  }
  try {
    if (existsSync(target)) rmSync(target, { recursive: true, force: true })
    let files = copyTree(skill.sourceDir, target)
    // 重写 SKILL.md 的 frontmatter
    const skillFile = join(target, 'SKILL.md')
    const original = readFileSync(skillFile, 'utf8')
    const converted = convertSkillFile(original, { pluginName: plugin.name, homepage: plugin.homepage, license: plugin.license }, safeName)
    writeFileSync(skillFile, converted, 'utf8')
    files = Math.max(files, 1)
    return { skill: safeName, plugin: plugin.name, status: 'ported', reason: '', files }
  } catch (error) {
    return { skill: safeName, plugin: plugin.name, status: 'failed', reason: error instanceof Error ? error.message : String(error), files: 0 }
  }
}
