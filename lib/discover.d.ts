/** 单个技能源。 */
export interface CodexSkillSource {
    skillDirName: string;
    skillName: string;
    description: string;
    sourceDir: string;
    skillFile: string;
}
/** 单个插件。 */
export interface CodexPluginInfo {
    name: string;
    version: string;
    description: string;
    homepage: string;
    license: string;
    sourceDir: string;
    skills: CodexSkillSource[];
}
/**
 * 发现所有 Codex 插件。
 * 顺序：解包目录（.tmp/plugins/plugins/*）优先，缓存目录（plugins/cache/**）其次；
 * 同名插件按 版本最新 > 目录修改时间 去重。
 */
export declare function discoverPlugins(codexHome: string): CodexPluginInfo[];
