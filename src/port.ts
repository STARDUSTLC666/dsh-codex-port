/**
 * Stage and validate skill copies before replacing an installation; retain backups for recovery.
 * @module dsh-codex-port/port
 */
import fs from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { convertSkillFile, parseSkillFile, sanitizeSkillName } from './frontmatter.js'
import { type CodexPluginInfo, type CodexSkillSource } from './discover.js'

/** 单个技能的移植结果。 */
export interface PortResult {
  skill: string
  plugin: string
  status: 'ported' | 'skipped' | 'failed'
  reason: string
  files: number
}

const EXCLUDED_DIRS = new Set(['agents'])
// Matches Harness skill.isSkillName; keep the public filename sanitizer unchanged.
const DSH_SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isWithin(root: string, path: string): boolean {
  const child = relative(root, path)
  return child !== '' && child !== '..' && !child.startsWith('..' + sep) && !isAbsolute(child)
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

/** Anchor every move to the resolved target root, rejecting symlinks and changed parents. */
class InstallRoot {
  readonly path: string

  constructor(targetDir: string) {
    if (targetDir.trim() === '') throw new Error('目标技能目录不能为空')
    const requested = resolve(targetDir)
    if (dirname(requested) === requested) throw new Error('不能把文件系统根目录作为技能目录')
    const existing = fs.lstatSync(requested, { throwIfNoEntry: false })
    if (existing?.isSymbolicLink()) throw new Error('目标技能根目录不能是符号链接或目录联接')
    // Resolve absent target roots through their existing ancestor without creating
    // anything yet: overlap with the source must fail before filesystem writes.
    let ancestor = requested
    while (fs.lstatSync(ancestor, { throwIfNoEntry: false }) === undefined) ancestor = dirname(ancestor)
    this.path = resolve(fs.realpathSync(ancestor), relative(ancestor, requested))
  }

  check(path: string): string {
    const absolute = resolve(path)
    if (!isWithin(this.path, absolute)) throw new Error('安装路径越出目标技能根目录：' + absolute)
    const root = fs.lstatSync(this.path)
    if (!root.isDirectory() || root.isSymbolicLink() || fs.realpathSync(this.path) !== this.path) {
      throw new Error('目标技能根目录在安装期间发生变化')
    }
    const parent = fs.realpathSync(dirname(absolute))
    if (parent !== this.path && !isWithin(this.path, parent)) throw new Error('安装路径的父目录越界：' + absolute)
    if (parent !== dirname(absolute)) throw new Error('安装路径的父目录包含符号链接或目录联接：' + absolute)
    const entry = fs.lstatSync(absolute, { throwIfNoEntry: false })
    if (entry?.isSymbolicLink()) throw new Error('安装路径不能是符号链接或目录联接：' + absolute)
    if (entry !== undefined && !isWithin(this.path, fs.realpathSync(absolute))) {
      throw new Error('安装路径解析后越界：' + absolute)
    }
    return absolute
  }

  move(source: string, target: string): void {
    const from = this.check(source)
    const to = this.check(target)
    if (!fs.lstatSync(from).isDirectory()) throw new Error('只能切换技能目录：' + from)
    if (fs.lstatSync(to, { throwIfNoEntry: false }) !== undefined) throw new Error('切换目标已存在，保留现场：' + to)
    fs.renameSync(from, to)
  }
}

/** Copy only regular files/directories; the destination is a new private staging tree. */
function copyTree(source: string, target: string, sourceRoot: string, root: InstallRoot): number {
  if (source !== sourceRoot && !isWithin(sourceRoot, fs.realpathSync(source))) throw new Error('技能源目录越界')
  if (fs.lstatSync(source).isSymbolicLink()) throw new Error('技能源目录不能是符号链接')
  fs.mkdirSync(root.check(target))
  let count = 0
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = join(source, entry.name)
    const to = root.check(join(target, entry.name))
    const stat = fs.lstatSync(from)
    if (stat.isSymbolicLink()) continue
    if (stat.isDirectory() && EXCLUDED_DIRS.has(entry.name)) continue
    if (!isWithin(sourceRoot, fs.realpathSync(from))) throw new Error('技能源文件解析后越界：' + from)
    if (stat.isDirectory()) count += copyTree(from, to, sourceRoot, root)
    else if (stat.isFile()) {
      fs.copyFileSync(from, to, fs.constants.COPYFILE_EXCL)
      count += 1
    } else throw new Error('技能目录含非普通文件：' + from)
  }
  return count
}

/**
 * Port one skill without deleting its previous installation. Each rename is a
 * filesystem operation; the complete replacement is not atomic on Windows.
 */
export function portSkill(skill: CodexSkillSource, plugin: CodexPluginInfo, targetDir: string, overwrite: boolean): PortResult {
  const safeName = sanitizeSkillName(skill.skillName !== '' ? skill.skillName : skill.skillDirName)
  if (safeName === null || safeName.endsWith('.') || /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(safeName)) {
    return { skill: skill.skillDirName, plugin: plugin.name, status: 'failed', reason: '技能名清洗后为空或不合法，已跳过（可能是纯中文或含危险字符的名称）', files: 0 }
  }
  let root: InstallRoot | undefined
  let target = ''
  let transaction = ''
  let incoming = ''
  let previous = ''
  let backedUp = false
  let installed = false
  const record = (phase: string, error?: string): void => {
    if (root === undefined || transaction === '') return
    const file = root.check(join(transaction, 'recovery.json'))
    fs.writeFileSync(file, JSON.stringify({ version: 1, skill: safeName, target, incoming, previous, phase, ...(error === undefined ? {} : { error }) }, null, 2) + '\n', 'utf8')
  }
  try {
    root = new InstallRoot(targetDir)
    target = join(root.path, safeName)
    if (fs.lstatSync(root.path, { throwIfNoEntry: false }) !== undefined) root.check(target)
    const existing = fs.lstatSync(target, { throwIfNoEntry: false })
    if (existing !== undefined && !overwrite) {
      return { skill: safeName, plugin: plugin.name, status: 'skipped', reason: '目标技能已存在（overwrite=false），跳过以免覆盖', files: 0 }
    }
    if (existing !== undefined && !existing.isDirectory()) throw new Error('目标技能不是目录，拒绝覆盖：' + target)
    const sourceEntry = fs.lstatSync(skill.sourceDir)
    if (!sourceEntry.isDirectory() || sourceEntry.isSymbolicLink()) throw new Error('技能源必须是普通目录')
    const source = fs.realpathSync(skill.sourceDir)
    if (source === root.path || isWithin(source, root.path) || source === target || isWithin(target, source)) {
      throw new Error('技能源与安装目标重叠，拒绝递归复制或移动源目录')
    }
    fs.mkdirSync(root.path, { recursive: true })
    root.check(target)
    transaction = fs.mkdtempSync(root.check(join(root.path, '.dsh-port-' + safeName + '-')))
    incoming = root.check(join(transaction, 'incoming'))
    previous = root.check(join(transaction, 'previous'))
    record('preparing')
    const files = copyTree(source, incoming, source, root)
    const skillFile = root.check(join(incoming, 'SKILL.md'))
    const converted = convertSkillFile(fs.readFileSync(skillFile, 'utf8'), {
      pluginName: plugin.name, homepage: plugin.homepage, license: plugin.license,
    }, safeName)
    fs.writeFileSync(skillFile, converted, 'utf8')
    // Validate the bytes that were actually written, before moving the old skill.
    const parsed = parseSkillFile(fs.readFileSync(skillFile, 'utf8'))
    if (!parsed.hasFrontmatter || typeof parsed.frontmatter.name !== 'string'
      || !DSH_SKILL_NAME.test(parsed.frontmatter.name) || parsed.frontmatter.name !== safeName
      || typeof parsed.frontmatter.description !== 'string' || parsed.frontmatter.description.length === 0) {
      throw new Error('转换后的 SKILL.md 未通过 DSH 技能名称、目录一致性或非空描述校验')
    }
    record('prepared')
    if (existing !== undefined) {
      root.move(target, previous)
      backedUp = true
      record('previous-backed-up')
    }
    root.move(incoming, target)
    installed = true
    let reason = ''
    try { record('installed') } catch (error) {
      reason = '技能已安装，但恢复记录更新失败：' + errorText(error) + '；恢复目录：' + transaction
    }
    return { skill: safeName, plugin: plugin.name, status: 'ported', reason, files: Math.max(files, 1) }
  } catch (error) {
    let reason = errorText(error)
    let phase = 'failed-before-switch'
    if (backedUp && !installed) {
      try {
        root!.move(previous, target)
        phase = 'rolled-back'
        reason += '；已恢复原技能'
      } catch (rollbackError) {
        phase = 'rollback-failed'
        reason += '；自动恢复失败：' + errorText(rollbackError) + '；原技能备份：' + previous
      }
    }
    if (transaction !== '') {
      try { record(phase, reason) } catch (recordError) { reason += '；恢复记录写入失败：' + errorText(recordError) }
      reason += '；恢复资料保留在：' + transaction
    }
    return { skill: safeName, plugin: plugin.name, status: 'failed', reason, files: 0 }
  }
}
