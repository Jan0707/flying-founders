import { Level } from "./Level.ts";
import { getLevel as getLevel1 } from "./levels/level1.ts";
import { getLevel as getLevel2 } from "./levels/level2.ts";
import { getLevel as getLevel3 } from "./levels/level3.ts";
import { getLevel as getLevel4 } from "./levels/level4.ts";
//credits levels
import { getLevel as getCreditsConcept } from "./levels/level5.ts";
import { getLevel as getCreditsDesign } from "./levels/level6.ts";
import { getLevel as getCreditsDevelopment } from "./levels/level7.ts";

export const levelNames = ["1", "2", "3", "4"] as const;
export const creditsNames = ["concept", "design", "development"] as const;

export type LevelName = (typeof levelNames)[number];
export type CreditsName = (typeof creditsNames)[number];

const levels: Record<LevelName, () => Level> = {
  "1": getLevel1,
  "2": getLevel2,
  "3": getLevel3,
  "4": getLevel4,
} as const;

export function getLevelByName(name: LevelName): Level {
  return levels[name]();
}

const creditsLevels: Record<CreditsName, () => Level> = {
  concept: getCreditsConcept,
  design: getCreditsDesign,
  development: getCreditsDevelopment,
} as const;

export function getCreditsLevelByName(name: CreditsName): Level {
  return creditsLevels[name]();
}
