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
 * Port one skill without deleting its previous installation. Each rename is a
 * filesystem operation; the complete replacement is not atomic on Windows.
 */
export declare function portSkill(skill: CodexSkillSource, plugin: CodexPluginInfo, targetDir: string, overwrite: boolean): PortResult;
