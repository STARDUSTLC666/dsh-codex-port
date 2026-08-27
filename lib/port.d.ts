import { type CodexPluginInfo, type CodexSkillSource } from './discover.js';
/** 单个技能的移植结果。 */
export interface PortResult {
    skill: string;
    plugin: string;
    status: 'ported' | 'skipped' | 'failed';
    reason: string;
    files: number;
}
/**
 * 移植单个技能到目标目录。
 */
export declare function portSkill(skill: CodexSkillSource, plugin: CodexPluginInfo, targetDir: string, overwrite: boolean): PortResult;
