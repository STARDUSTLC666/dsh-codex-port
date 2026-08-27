/**
 * dsh-codex-port 配置解析：Codex 家目录、目标技能目录、覆写策略。
 *
 * @module dsh-codex-port/config
 */
import { homedir } from 'node:os';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
/** 默认 DSH 技能目录：$DSH_HOME/skills，否则 ~/.dsh/skills。 */
export function defaultTargetDir(env = process.env) {
    const home = env.DSH_HOME ?? '';
    return home !== '' ? join(home, 'skills') : join(homedir(), '.dsh', 'skills');
}
/**
 * 解析并校验配置（目录存在性在执行时惰性检查，这里只校验类型）。
 */
export function resolveConfig(config) {
    const cfg = config ?? {};
    const codexHome = typeof cfg.codexHome === 'string' && cfg.codexHome.trim() !== '' ? cfg.codexHome.trim() : join(homedir(), '.codex');
    const targetDir = typeof cfg.targetDir === 'string' && cfg.targetDir.trim() !== '' ? cfg.targetDir.trim() : defaultTargetDir();
    const overwrite = cfg.overwrite === true;
    return { codexHome, targetDir, overwrite };
}
/** 惰性校验：目录不存在时抛中文指引。 */
export function assertCodexHome(codexHome) {
    if (!existsSync(codexHome)) {
        throw new Error('Codex 家目录不存在：' + codexHome + '。请检查是否安装了 Codex CLI，或在 cordis.patch.yml 里用 codexHome 显式指定。');
    }
}
