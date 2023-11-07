import { level as level1 } from "./levels/level1.ts";
import { level as level2 } from "./levels/level2.ts";
import { Level } from "./Level.ts";

class LevelProvider {
  levels: Level[];
  constructor(levels: Level[]) {
    this.levels = levels;
  }

  getLevelByName(name: string): Level | undefined {
    return this.levels.find((level) => level.name === name);
  }
}

const levelProvider = new LevelProvider([level1, level2]);

export { levelProvider };
