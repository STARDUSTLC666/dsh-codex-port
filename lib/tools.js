/**
 * 三个面向模型的移植工具：codex_list / codex_port / codex_status。
 *
 * @module dsh-codex-port/tools
 */
import { accessSync, constants, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { assertCodexHome } from './config.js';
import { discoverPlugins } from './discover.js';
import { portSkill, findInstalledSkill } from './port.js';
import { sanitizeSkillName } from './frontmatter.js';
/** 编译作者 DSL 为原始 JSON Schema。 */
function compileParameters(spec) {
    const properties = {};
    const required = [];
    for (const [key, prop] of Object.entries(spec)) {
        if (prop?.required === true)
            required.push(key);
        const node = {};
        if (typeof prop?.type === 'string')
            node.type = prop.type;
        if (typeof prop?.description === 'string')
            node.description = prop.description;
        if (prop?.type === 'array' && prop.items !== null && typeof prop.items === 'object') {
            node.items = { type: 'string' };
        }
        properties[key] = node;
    }
    return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) };
}
function asRecord(value) {
    return typeof value === 'object' && value !== null ? value : {};
}
function optionalString(args, key) {
    const value = args[key];
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;
}
function stringArray(args, key) {
    const value = args[key];
    if (!Array.isArray(value))
        return [];
    return value.filter((item) => typeof item === 'string' && item.trim() !== '').map((item) => item.trim());
}
const MAX_PLUGIN_LIMIT = 200;
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
};
const listSchema = {
    type: 'object',
    properties: {
        count: { type: 'integer' },
        total: { type: 'integer' },
        codexHome: { type: 'string' },
        plugins: { type: 'array', items: pluginShape },
    },
    additionalProperties: true,
};
const portItemSchema = {
    type: 'object',
    properties: { skill: { type: 'string' }, plugin: { type: 'string' }, reason: { type: 'string' }, files: { type: 'integer' } },
    additionalProperties: true,
};
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
};
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
};
export function buildCodexPortTools(config, dependencies = {}) {
    const getPlugins = () => {
        assertCodexHome(config.codexHome);
        return discoverPlugins(config.codexHome);
    };
    const codexList = {
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
                const rec = asRecord(value);
                const plugins = Array.isArray(rec.plugins) ? rec.plugins : [];
                if (plugins.length === 0) {
                    return [{ type: 'text', text: Number(rec.total ?? 0) === 0
                                ? '没有在 ' + rec.codexHome + ' 里发现 Codex 插件。下一步：先在 Codex 里安装官方插件（或确认 codexHome 指向正确目录），再运行 codex_health 复查。'
                                : '过滤条件没有命中：共发现 ' + rec.total + ' 个插件，但没有符合 plugin / skill 条件的。下一步：去掉过滤参数重新调用 codex_list。' }];
                }
                const lines = ['发现 ' + rec.total + ' 个 Codex 插件（返回前 ' + plugins.length + ' 个）：'];
                for (const plugin of plugins) {
                    const p = asRecord(plugin);
                    lines.push('- ' + p.name + '@' + p.version + '（' + p.skillCount + ' 个技能）：' + String(p.description ?? '').slice(0, 80));
                }
                lines.push('下一步：用 codex_port 移植（可先加 dryRun:true 预览），或用 plugin / skill 参数过滤。');
                return [{ type: 'text', text: lines.join('\n') }];
            },
        },
        async execute(rawArgs) {
            const args = asRecord(rawArgs);
            const plugins = getPlugins();
            const pluginFilter = optionalString(args, 'plugin')?.toLowerCase();
            const skillFilter = optionalString(args, 'skill')?.toLowerCase();
            const limitRaw = args.limit;
            const limit = typeof limitRaw === 'number' && Number.isInteger(limitRaw) ? Math.min(MAX_PLUGIN_LIMIT, Math.max(1, limitRaw)) : 20;
            const filtered = plugins.filter((plugin) => {
                if (pluginFilter !== undefined && !plugin.name.toLowerCase().includes(pluginFilter))
                    return false;
                if (skillFilter !== undefined && !plugin.skills.some((skill) => skill.skillName.toLowerCase().includes(skillFilter)))
                    return false;
                return true;
            });
            const rows = filtered.slice(0, limit).map((plugin) => ({
                name: plugin.name,
                version: plugin.version,
                description: plugin.description,
                homepage: plugin.homepage,
                license: plugin.license,
                skillCount: plugin.skills.length,
                skills: plugin.skills.map((skill) => ({ name: skill.skillName, description: skill.description })),
            }));
            return { count: rows.length, total: plugins.length, codexHome: config.codexHome, plugins: rows };
        },
    };
    const codexPort = {
        name: 'codex_port',
        description: '把 Codex 插件技能移植为 DSH 技能（写入 DSH 技能目录）。frontmatter 自动转换、剔除 agents 等 codex 专属文件、名称清洗、同名默认跳过（overwrite=true 覆盖）。plugins/skills 参数可限定范围，缺省移植全部。',
        parameters: compileParameters({
            plugins: { type: 'array', items: { type: 'string' }, description: '只移植这些插件（插件名，不区分大小写，可选）。' },
            skills: { type: 'array', items: { type: 'string' }, description: '只移植这些技能（技能名，不区分大小写，可选）。' },
            targetDir: { type: 'string', description: '目标技能目录（可选，默认 <DSH_HOME>/skills）。' },
            overwrite: { type: 'boolean', description: '是否覆盖同名技能（默认 false=跳过）。' },
            dryRun: { type: 'boolean', description: '为 true 时，只验证并预览安装/替换/跳过清单，不创建目录或修改文件。' },
        }),
        output: {
            schema: portSchema,
            render: (_args, value) => {
                const rec = asRecord(value);
                const counts = asRecord(rec.counts);
                const planned = Array.isArray(rec.planned) ? rec.planned : [];
                if (rec.dryRun === true) {
                    // 预览以前直接 dump JSON，聊天里读不动；改为分组清单，并保留「不改文件」的明确说明。
                    const lines = ['移植预览（未修改任何文件）：计划 ' + String(rec.plannedCount ?? planned.length) + ' 个，跳过 ' + String(counts.skipped ?? 0) + ' 个，失败 ' + String(counts.failed ?? 0) + ' 个。目标目录：' + rec.targetDir];
                    if (planned.length === 0)
                        lines.push('- 没有可移植的技能：确认 codex_list 能看到插件，或调整 plugins / skills 过滤。');
                    for (const item of planned.slice(0, 30)) {
                        const row = asRecord(item);
                        lines.push('+ ' + row.skill + '（来自 ' + row.plugin + '）' + (row.reason ? '：' + row.reason : ''));
                    }
                    if (planned.length > 30)
                        lines.push('…另有 ' + (planned.length - 30) + ' 个未列出');
                    lines.push('', '下一步：确认清单无误后，去掉 dryRun 再调用一次 codex_port 才会真正写入。');
                    return [{ type: 'text', text: lines.join('\n') }];
                }
                const ported = Array.isArray(rec.ported) ? rec.ported : [];
                const skipped = Array.isArray(rec.skipped) ? rec.skipped : [];
                const failed = Array.isArray(rec.failed) ? rec.failed : [];
                const lines = ['移植完成：新移植 ' + String(counts.ported ?? 0) + ' 个，跳过 ' + String(counts.skipped ?? 0) + ' 个，失败 ' + String(counts.failed ?? 0) + ' 个。目标目录：' + rec.targetDir];
                for (const item of ported.slice(0, 20)) {
                    const row = asRecord(item);
                    lines.push('+ ' + row.skill + '（来自 ' + row.plugin + '，' + row.files + ' 个文件）' + (row.reason ? '：' + row.reason : ''));
                }
                if (ported.length > 20)
                    lines.push('…另有 ' + (ported.length - 20) + ' 个移植成功未列出');
                // 失败与跳过以前只在 payload 里，聊天里看不到原因，用户只能重跑一次才发现同名被挡。
                if (failed.length > 0) {
                    lines.push('', '失败 ' + failed.length + ' 个：');
                    for (const item of failed.slice(0, 10)) {
                        const row = asRecord(item);
                        lines.push('- ' + row.skill + '（来自 ' + row.plugin + '）：' + String(row.reason ?? ''));
                    }
                }
                if (skipped.length > 0) {
                    lines.push('', '跳过 ' + skipped.length + ' 个：');
                    for (const item of skipped.slice(0, 10)) {
                        const row = asRecord(item);
                        lines.push('- ' + row.skill + '（来自 ' + row.plugin + '）：' + String(row.reason ?? ''));
                    }
                    if (skipped.length > 10)
                        lines.push('…另有 ' + (skipped.length - 10) + ' 个跳过未列出');
                }
                if (failed.length > 0)
                    lines.push('', '下一步：按上面失败原因修正后，用 skills / plugins 只重跑失败的这几项；不改动已完成的部分。');
                else if (skipped.length > 0)
                    lines.push('', '下一步：确认要覆盖同名技能时，加 overwrite:true 重跑（会保留 previous/ 备份与 recovery.json）。');
                else
                    lines.push('', '下一步：用 codex_status 确认已移植数量，或直接在 DSH 里使用这些技能。');
                return [{ type: 'text', text: lines.join('\n') }];
            },
        },
        async execute(rawArgs, exec) {
            const signal = exec?.signal;
            signal?.throwIfAborted();
            const args = asRecord(rawArgs);
            const plugins = getPlugins();
            const pluginFilter = stringArray(args, 'plugins').map((name) => name.toLowerCase());
            const skillFilter = stringArray(args, 'skills').map((name) => name.toLowerCase());
            const targetRaw = optionalString(args, 'targetDir');
            const cwd = exec?.agent?.session?.header?.cwd || process.cwd();
            const targetDir = resolve(cwd, targetRaw ?? config.targetDir);
            const overwrite = args.overwrite === true ? true : config.overwrite;
            const dryRun = args.dryRun === true;
            const selected = [];
            for (const plugin of plugins) {
                if (pluginFilter.length > 0 && !pluginFilter.includes(plugin.name.toLowerCase()))
                    continue;
                const skills = skillFilter.length > 0
                    ? plugin.skills.filter((skill) => skillFilter.includes(skill.skillName.toLowerCase()))
                    : plugin.skills;
                if (skills.length > 0)
                    selected.push({ plugin, skills });
            }
            const ported = [];
            const skipped = [];
            const failed = [];
            const planned = [];
            const existingNames = new Set(await dependencies.existingSkillNames?.({ cwd, scope: exec?.agent, signal }) ?? []);
            for (const group of selected) {
                for (const skill of group.skills) {
                    signal?.throwIfAborted();
                    const identity = sanitizeSkillName(skill.skillName || skill.skillDirName);
                    const result = !overwrite && identity && existingNames.has(identity)
                        ? { skill: identity, plugin: group.plugin.name, status: 'skipped', reason: '宿主已有同名技能（可能来自其它根目录），overwrite=false，已跳过以免遮蔽', files: 0 }
                        : portSkill(skill, group.plugin, targetDir, overwrite, dryRun);
                    if (result.status === 'ported' || result.status === 'planned')
                        existingNames.add(result.skill);
                    if (result.status === 'ported')
                        ported.push(result);
                    else if (result.status === 'skipped')
                        skipped.push(result);
                    else if (result.status === 'planned')
                        planned.push(result);
                    else
                        failed.push(result);
                }
            }
            return {
                targetDir,
                total: ported.length + skipped.length + failed.length + planned.length,
                counts: { ported: ported.length, skipped: skipped.length, failed: failed.length },
                ported: ported.map((r) => ({ skill: r.skill, plugin: r.plugin, files: r.files, ...(r.reason ? { reason: r.reason } : {}), ...(r.policyChanges ? { policyChanges: r.policyChanges } : {}) })),
                skipped: skipped.map((r) => ({ skill: r.skill, plugin: r.plugin, reason: r.reason })),
                failed: failed.map((r) => ({ skill: r.skill, plugin: r.plugin, reason: r.reason })),
                ...(dryRun ? { dryRun, plannedCount: planned.length, planned: planned.map(r => ({ skill: r.skill, plugin: r.plugin, reason: r.reason })) } : {}),
            };
        },
    };
    const codexStatus = {
        name: 'codex_status',
        description: '对比 Codex 技能源与 DSH 技能目录：报告可用技能总数、已移植数、未移植清单（前 100 个）。',
        parameters: compileParameters({}),
        output: {
            schema: statusSchema,
            render: (_args, value) => {
                const rec = asRecord(value);
                const missingNames = Array.isArray(rec.missingNames) ? rec.missingNames.map(String) : [];
                const lines = ['Codex 技能 ' + rec.skills + ' 个（' + rec.plugins + ' 个插件），已移植 ' + rec.installed + ' 个，未移植 ' + rec.missing + ' 个。目标目录：' + rec.targetDir];
                if (missingNames.length > 0) {
                    lines.push('未移植：' + missingNames.slice(0, 20).join('、') + (missingNames.length > 20 ? '…' : ''));
                    lines.push('下一步：用 codex_port 移植（需要预览时加 dryRun:true）。');
                }
                else if (Number(rec.skills ?? 0) > 0) {
                    lines.push('下一步：全部技能已移植，可直接在 DSH 里使用；Codex 更新插件后重新运行 codex_port 即可同步。');
                }
                else {
                    lines.push('下一步：Codex 里还没有可移植的技能，先在 Codex 安装官方插件，再用 codex_list 确认。');
                }
                return [{ type: 'text', text: lines.join('\n') }];
            },
        },
        async execute(_args, exec) {
            const cwd = exec?.agent?.session?.header?.cwd || process.cwd();
            const targetDir = resolve(cwd, config.targetDir);
            const plugins = getPlugins();
            const allSkills = [];
            for (const plugin of plugins) {
                for (const skill of plugin.skills)
                    allSkills.push({ name: skill.skillName, plugin: plugin.name });
            }
            const missingNames = [];
            let installed = 0;
            for (const skill of allSkills) {
                const safeName = sanitizeSkillName(skill.name);
                if (safeName !== null && findInstalledSkill(targetDir, safeName) !== undefined) {
                    installed += 1;
                }
                else {
                    missingNames.push(skill.name);
                }
            }
            return {
                codexHome: config.codexHome,
                targetDir,
                plugins: plugins.length,
                skills: allSkills.length,
                installed,
                missing: allSkills.length - installed,
                missingNames: missingNames.slice(0, 100),
            };
        },
    };
    const codexHealth = {
        name: 'codex_health',
        description: 'dsh-codex-port 自检：检查 Codex 主目录（~/.codex 或自定义）是否存在、插件目录是否可见（不执行任何移植）。遇到问题时先运行本工具定位。',
        parameters: compileParameters({
            codexHome: { type: 'string', description: 'Codex 主目录（可选，缺省用配置或 ~/.codex）。' },
        }),
        output: {
            schema: { type: 'object', additionalProperties: true },
            render: (_args, value) => {
                const rec = asRecord(value);
                const checks = Array.isArray(rec.checks) ? rec.checks : [];
                const lines = ['dsh-codex-port 自检' + (rec.ok === true ? '：正常。' : '：发现问题。')];
                const failed = [];
                for (const item of checks) {
                    const c = asRecord(item);
                    lines.push('- ' + c.name + '：' + (c.ok === true ? '✅ ' + String(c.detail ?? '') : '❌ ' + String(c.detail ?? '')));
                    if (c.ok !== true)
                        failed.push(String(c.name));
                }
                if (failed.length > 0) {
                    lines.push('', '下一步：');
                    if (failed.includes('Codex 主目录'))
                        lines.push('  · 确认已安装 Codex CLI（默认 ~/.codex），或在插件配置里用 codexHome 指定真实目录后重启。');
                    if (failed.includes('目标技能目录'))
                        lines.push('  · 目标技能目录不可写：检查目录权限/所属用户，或在调用 codex_port 时用 targetDir 指定一个可写目录。');
                    if (failed.some(name => name.includes('可发现插件')))
                        lines.push('  · 扫描插件失败：确认 ~/.codex 没有被其它进程占用或权限受限，再重新运行 codex_health。');
                    lines.push('  · 修好后重新运行 codex_health，再执行 codex_list 看可移植的技能。');
                }
                return [{ type: 'text', text: lines.join('\n') }];
            },
        },
        async execute(rawArgs) {
            const args = asRecord(rawArgs);
            const home = optionalString(args, 'codexHome') ?? config.codexHome;
            const checks = [];
            try {
                assertCodexHome(home);
                checks.push({ name: 'Codex 主目录', ok: true, detail: home });
            }
            catch (error) {
                checks.push({ name: 'Codex 主目录', ok: false, detail: error instanceof Error ? error.message : String(error) });
                return { ok: false, plugin: 'dsh-codex-port', codexHome: home, targetDir: config.targetDir, checks };
            }
            let ok = true;
            const pluginsDir = home + '/plugins';
            const pluginsOk = existsSync(pluginsDir);
            // 没装插件不是故障：空目录照样能自检，只说明「暂时没有可移植的技能」。
            checks.push({ name: '插件目录', ok: true, detail: pluginsOk ? pluginsDir : pluginsDir + '（不存在：Codex 里还没安装官方插件，安装后重新运行本自检）' });
            // 目标技能目录是移植真正写入的位置，以前自检完全不看它。
            const targetDir = config.targetDir;
            if (!existsSync(targetDir)) {
                const parent = dirname(targetDir);
                checks.push({ name: '目标技能目录', ok: true, detail: targetDir + '（尚不存在，首次 codex_port 会自动创建' + (existsSync(parent) ? '' : '；父目录 ' + parent + ' 也会一并创建') + '）' });
            }
            else {
                try {
                    accessSync(targetDir, constants.W_OK);
                    checks.push({ name: '目标技能目录', ok: true, detail: targetDir + '（存在且可写）' });
                }
                catch {
                    ok = false;
                    checks.push({ name: '目标技能目录', ok: false, detail: targetDir + ' 不可写：请检查目录权限，或在调用 codex_port 时用 targetDir 指定其它可写目录' });
                }
            }
            try {
                const plugins = discoverPlugins(home);
                const skillCount = plugins.reduce((sum, plugin) => sum + plugin.skills.length, 0);
                checks.push({ name: '可发现插件', ok: true, detail: plugins.length + ' 个插件 / ' + skillCount + ' 个技能' + (skillCount === 0 ? '（还没有可移植的技能，先在 Codex 安装官方插件）' : '') });
            }
            catch (error) {
                ok = false;
                checks.push({ name: '可发现插件', ok: false, detail: error instanceof Error ? error.message : String(error) });
            }
            return { ok, plugin: 'dsh-codex-port', codexHome: home, targetDir, checks };
        },
    };
    return [codexList, codexPort, codexStatus, codexHealth];
}
