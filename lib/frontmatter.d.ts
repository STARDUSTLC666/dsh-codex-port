/** 安全的技能名：DSH 技能目录名约束。 */
export declare const SKILL_NAME_PATTERN: RegExp;
/**
 * 清洗技能名：非法字符替换为下划线；空则返回 null（跳过该技能）。
 */
export declare function sanitizeSkillName(name: string): string | null;
export interface ParsedSkillFile {
    frontmatter: Record<string, unknown>;
    body: string;
    hasFrontmatter: boolean;
}
/**
 * 拆分 SKILL.md 的 frontmatter 与正文。
 */
export declare function parseSkillFile(text: string): ParsedSkillFile;
/** 插件来源信息（用于 compatibility 行）。 */
export interface PluginAttribution {
    pluginName: string;
    homepage: string;
    license: string;
}
/**
 * 生成 DSH 格式 frontmatter 文本（含首尾 ---）。
 */
export declare function toDshFrontmatter(frontmatter: Record<string, unknown>, attribution: PluginAttribution): string;
/**
 * 转换整个 SKILL.md 文本。
 */
export declare function convertSkillFile(text: string, attribution: PluginAttribution, fallbackName: string): string;
