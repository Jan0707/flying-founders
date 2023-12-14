import {getLevel as getLevel1} from "./levels/level1.ts";
import {getLevel as getLevel2} from "./levels/level2.ts";
import {getLevel as getLevel3} from "./levels/level3.ts";
import {getLevel as getLevel4} from "./levels/level4.ts";
import {getLevel as getLevel5} from "./levels/level5.ts";
import {Level} from "./Level.ts";

export const levelNames = ["1", "2", "3", "4", "5"] as const

export type LevelName = typeof levelNames[number]

const levels: Record<LevelName, () => Level> = {
    "1": getLevel1,
    "2": getLevel2,
    "3": getLevel3,
    "4": getLevel4,
    "5": getLevel5
} as const

export function getLevelByName(name: LevelName): Level {
    return levels[name]();
}