/** 插件行配置（cordis.patch.yml 里的 config 段，可缺省）。 */
export interface CodexPortConfig {
    codexHome?: string;
    targetDir?: string;
    overwrite?: boolean;
}
/** 解析后的配置。 */
export interface ResolvedCodexPortConfig {
    codexHome: string;
    targetDir: string;
    overwrite: boolean;
}
/** 默认 DSH 技能目录：$DSH_HOME/skills，否则 ~/.dsh/skills。 */
export declare function defaultTargetDir(env?: NodeJS.ProcessEnv): string;
/**
 * 解析并校验配置（目录存在性在执行时惰性检查，这里只校验类型）。
 */
export declare function resolveConfig(config: CodexPortConfig | undefined | null): ResolvedCodexPortConfig;
/** 惰性校验：目录不存在时抛中文指引。 */
export declare function assertCodexHome(codexHome: string): void;
