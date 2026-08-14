/**
 * 三个面向模型的移植工具：codex_list / codex_port / codex_status。
 *
 * @module dsh-codex-port/tools
 */
import { existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { assertCodexHome, type ResolvedCodexPortConfig } from './config.js'
import { discoverPlugins, type CodexPluginInfo } from './discover.js'
import { portSkill, type PortResult } from './port.js'
import { sanitizeSkillName } from './frontmatter.js'

/** 模型可见的内容块。 */
export interface ContentBlock {
  type: 'text'
  text: string
}

/** 注册给 ctx.tools.register 的原始工具定义。 */
export interface CodexPortToolDefinition {
  name: string
  description: string
  parameters: { type: 'object'; properties: Record<string, unknown>; required?: string[] }
  output: {
    schema: Record<string, unknown>
    render(args: unknown, value: unknown): ContentBlock[]
  }
  execute(args: unknown, exec: unknown): Promise<unknown>
}

/** 编译作者 DSL 为原始 JSON Schema。 */
function compileParameters(spec: Record<string, any>): { type: 'object'; properties: Record<string, unknown>; required?: string[] } {
  const properties: Record<string, unknown> = {}
  const required: string[] = []
  for (const [key, prop] of Object.entries(spec)) {
    if (prop?.required === true) required.push(key)
    const node: Record<string, unknown> = {}
    if (typeof prop?.type === 'string') node.type = prop.type
    if (typeof prop?.description === 'string') node.description = prop.description
    if (prop?.type === 'array' && prop.items !== null && typeof prop.items === 'object') {
      node.items = { type: 'string' }
    }
    properties[key] = node
  }
  return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) }
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
}

function optionalString(args: Record<string, unknown>, key: string): string | undefined {
  const value = args[key]
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
}

function stringArray(args: Record<string, unknown>, key: string): string[] {
  const value = args[key]
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string' && item.trim() !== '').map((item) => item.trim())
}

const MAX_PLUGIN_LIMIT = 200

const pluginShape = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    version: { type: 'string' },
    description: { type: 'string' },
    homepage: { type: 'string' },
    license: { type: 'string' },
    skillCount: { type: 'integer' },
    skills: {
      type: 'array',
      items: {
        type: 'object',
        properties: { name: { type: 'string' }, description: { type: 'string' } },
        additionalProperties: true,
      },
    },
  },
  additionalProperties: true,
}

const listSchema = {
  type: 'object',
  properties: {
    count: { type: 'integer' },
    total: { type: 'integer' },
    codexHome: { type: 'string' },
    plugins: { type: 'array', items: pluginShape },
  },
  additionalProperties: true,
}

const portItemSchema = {
  type: 'object',
  properties: { skill: { type: 'string' }, plugin: { type: 'string' }, reason: { type: 'string' }, files: { type: 'integer' } },
  additionalProperties: true,
}

const portSchema = {
  type: 'object',
  properties: {
    targetDir: { type: 'string' },
    total: { type: 'integer' },
    counts: { type: 'object', properties: { ported: { type: 'integer' }, skipped: { type: 'integer' }, failed: { type: 'integer' } }, additionalProperties: true },
    ported: { type: 'array', items: portItemSchema },
    skipped: { type: 'array', items: portItemSchema },
    failed: { type: 'array', items: portItemSchema },
  },
  additionalProperties: true,
}

const statusSchema = {
  type: 'object',
  properties: {
    codexHome: { type: 'string' },
    targetDir: { type: 'string' },
    plugins: { type: 'integer' },
    skills: { type: 'integer' },
    installed: { type: 'integer' },
    missing: { type: 'integer' },
    missingNames: { type: 'array', items: { type: 'string' } },
  },
  additionalProperties: true,
}

/**
 * 构建三个工具定义。
 */
export function buildCodexPortTools(config: ResolvedCodexPortConfig): CodexPortToolDefinition[] {
  const getPlugins = (): CodexPluginInfo[] => {
    assertCodexHome(config.codexHome)
    return discoverPlugins(config.codexHome)
  }

  const codexList: CodexPortToolDefinition = {
    name: 'codex_list',
    description: '列出 ~/.codex 里发现的 Codex 官方插件与其技能（含解包目录与插件缓存）。可选 plugin 过滤插件名、skill 过滤技能名。limit 控制返回插件数（1-200，默认 20）。',
    parameters: compileParameters({
      plugin: { type: 'string', description: '按插件名过滤（不区分大小写，子串匹配，可选）。' },
      skill: { type: 'string', description: '按技能名过滤（不区分大小写，子串匹配，可选）。' },
      limit: { type: 'integer', description: '返回插件数 1-200，默认 20。' },
    }),
    output: {
      schema: listSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        const plugins = Array.isArray(rec.plugins) ? rec.plugins : []
        const lines = ['发现 ' + rec.total + ' 个 Codex 插件（返回前 ' + plugins.length + ' 个）：']
        for (const plugin of plugins) {
          const p = asRecord(plugin)
          lines.push('- ' + p.name + '@' + p.version + '（' + p.skillCount + ' 个技能）：' + String(p.description ?? '').slice(0, 80))
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const plugins = getPlugins()
      const pluginFilter = optionalString(args, 'plugin')?.toLowerCase()
      const skillFilter = optionalString(args, 'skill')?.toLowerCase()
      const limitRaw = args.limit
      const limit = typeof limitRaw === 'number' && Number.isInteger(limitRaw) ? Math.min(MAX_PLUGIN_LIMIT, Math.max(1, limitRaw)) : 20
      const filtered = plugins.filter((plugin) => {
        if (pluginFilter !== undefined && !plugin.name.toLowerCase().includes(pluginFilter)) return false
        if (skillFilter !== undefined && !plugin.skills.some((skill) => skill.skillName.toLowerCase().includes(skillFilter))) return false
        return true
      })
      const rows = filtered.slice(0, limit).map((plugin) => ({
        name: plugin.name,
        version: plugin.version,
        description: plugin.description,
        homepage: plugin.homepage,
        license: plugin.license,
        skillCount: plugin.skills.length,
        skills: plugin.skills.map((skill) => ({ name: skill.skillName, description: skill.description })),
      }))
      return { count: rows.length, total: plugins.length, codexHome: config.codexHome, plugins: rows }
    },
  }

  const codexPort: CodexPortToolDefinition = {
    name: 'codex_port',
    description: '把 Codex 插件技能移植为 DSH 技能（写入 DSH 技能目录）。frontmatter 自动转换、剔除 agents 等 codex 专属文件、名称清洗、同名默认跳过（overwrite=true 覆盖）。plugins/skills 参数可限定范围，缺省移植全部。',
    parameters: compileParameters({
      plugins: { type: 'array', items: { type: 'string' }, description: '只移植这些插件（插件名，不区分大小写，可选）。' },
      skills: { type: 'array', items: { type: 'string' }, description: '只移植这些技能（技能名，不区分大小写，可选）。' },
      targetDir: { type: 'string', description: '目标技能目录（可选，默认 <DSH_HOME>/skills）。' },
      overwrite: { type: 'boolean', description: '是否覆盖同名技能（默认 false=跳过）。' },
    }),
    output: {
      schema: portSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        const counts = asRecord(rec.counts)
        const lines = ['移植完成：新移植 ' + counts.ported + ' 个，跳过 ' + counts.skipped + ' 个，失败 ' + counts.failed + ' 个。目标目录：' + rec.targetDir]
        const ported = Array.isArray(rec.ported) ? rec.ported : []
        for (const item of ported.slice(0, 20)) {
          const row = asRecord(item)
          lines.push('- ' + row.skill + '（来自 ' + row.plugin + '，' + row.files + ' 个文件）')
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const plugins = getPlugins()
      const pluginFilter = stringArray(args, 'plugins').map((name) => name.toLowerCase())
      const skillFilter = stringArray(args, 'skills').map((name) => name.toLowerCase())
      const targetRaw = optionalString(args, 'targetDir')
      const targetDir = targetRaw !== undefined ? resolve(targetRaw) : config.targetDir
      const overwrite = args.overwrite === true ? true : config.overwrite
      mkdirSync(targetDir, { recursive: true })
      const selected: Array<{ plugin: CodexPluginInfo; skills: CodexPluginInfo['skills'] }> = []
      for (const plugin of plugins) {
        if (pluginFilter.length > 0 && !pluginFilter.includes(plugin.name.toLowerCase())) continue
        const skills = skillFilter.length > 0
          ? plugin.skills.filter((skill) => skillFilter.includes(skill.skillName.toLowerCase()))
          : plugin.skills
        if (skills.length > 0) selected.push({ plugin, skills })
      }
      const ported: PortResult[] = []
      const skipped: PortResult[] = []
      const failed: PortResult[] = []
      for (const group of selected) {
        for (const skill of group.skills) {
          const result = portSkill(skill, group.plugin, targetDir, overwrite)
          if (result.status === 'ported') ported.push(result)
          else if (result.status === 'skipped') skipped.push(result)
          else failed.push(result)
        }
      }
      return {
        targetDir,
        total: ported.length + skipped.length + failed.length,
        counts: { ported: ported.length, skipped: skipped.length, failed: failed.length },
        ported: ported.map((r) => ({ skill: r.skill, plugin: r.plugin, files: r.files })),
        skipped: skipped.map((r) => ({ skill: r.skill, plugin: r.plugin, reason: r.reason })),
        failed: failed.map((r) => ({ skill: r.skill, plugin: r.plugin, reason: r.reason })),
      }
    },
  }

  const codexStatus: CodexPortToolDefinition = {
    name: 'codex_status',
    description: '对比 Codex 技能源与 DSH 技能目录：报告可用技能总数、已移植数、未移植清单（前 100 个）。',
    parameters: compileParameters({}),
    output: {
      schema: statusSchema,
      render: (_args, value) => {
        const rec = asRecord(value)
        return [{ type: 'text', text: 'Codex 技能 ' + rec.skills + ' 个，已移植 ' + rec.installed + ' 个，未移植 ' + rec.missing + ' 个。目标目录：' + rec.targetDir }]
      },
    },
    async execute() {
      const plugins = getPlugins()
      const allSkills: Array<{ name: string; plugin: string }> = []
      for (const plugin of plugins) {
        for (const skill of plugin.skills) allSkills.push({ name: skill.skillName, plugin: plugin.name })
      }
      const missingNames: string[] = []
      let installed = 0
      for (const skill of allSkills) {
        const safeName = sanitizeSkillName(skill.name)
        if (safeName !== null && existsSync(resolve(config.targetDir, safeName))) {
          installed += 1
        } else {
          missingNames.push(skill.name)
        }
      }
      return {
        codexHome: config.codexHome,
        targetDir: config.targetDir,
        plugins: plugins.length,
        skills: allSkills.length,
        installed,
        missing: allSkills.length - installed,
        missingNames: missingNames.slice(0, 100),
      }
    },
  }

  return [codexList, codexPort, codexStatus]
}
