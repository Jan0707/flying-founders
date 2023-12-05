import { getLevel as getLevel1 } from "./levels/level1.ts";
import { getLevel as getLevel2 } from "./levels/level2.ts";
import { getLevel as getLevel3 } from "./levels/level3.ts";
import { getLevel as getLevel4 } from "./levels/level4.ts";
import { LevelCreatorFunction } from "./Level.ts";

class LevelProvider {
  levels: Map<string, LevelCreatorFunction>;
  constructor() {
    this.levels = new Map();

    this.levels.set("1", getLevel1);
    this.levels.set("2", getLevel2);
    this.levels.set("3", getLevel3);
    this.levels.set("4", getLevel4);
  }

  getLevelByName(name: string): LevelCreatorFunction | undefined {
    if (!this.levels.has(name)) return undefined;
    return this.levels.get(name);
  }
}

const levelProvider = new LevelProvider();

export { levelProvider };
