/**
 * dsh-codex-port —— Codex 插件 → DSH 技能移植工具插件（node 半身）。
 *
 * 插件导出 apply(ctx, config)：注册三个面向模型的工具（codex_list / codex_port /
 * codex_status），扫描 ~/.codex 的解包插件与缓存，把官方 Codex 插件技能批量移植为
 * DSH 技能。纯文件系统操作，零运行时依赖（仅 yaml 解析）。
 *
 * @module dsh-codex-port
 */
import { resolveConfig } from './config.js';
import { buildCodexPortTools } from './tools.js';
/** cordis 服务注入：apply 里要用 ctx.tools，必须显式声明。 */
export const name = 'codex-port';
export const inject = ['tools'];
/**
 * 插件入口：解析配置并注册三个移植工具。
 */
export function apply(ctx, config) {
    let cfg;
    try {
        cfg = resolveConfig(config);
    }
    catch (error) {
        console.warn('[dsh-codex-port] ' + (error instanceof Error ? error.message : String(error)));
        cfg = resolveConfig(null);
    }
    const disposers = [];
    for (const definition of buildCodexPortTools(cfg)) {
        disposers.push(ctx.tools.register(definition));
    }
    if (typeof ctx.on === 'function') {
        ctx.on('dispose', () => {
            for (const dispose of disposers)
                dispose();
        });
    }
}
export * from './config.js';
export * from './discover.js';
export * from './frontmatter.js';
export * from './port.js';
export * from './tools.js';
