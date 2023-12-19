import dominik from "./../assets/founders/dominik.png";
import jens from "./../assets/founders/jens.png";
import sebastian from "./../assets/founders/sebastian.png";
import { when } from "../util/when.ts";
import { IBodyDefinition } from "matter-js";

const founderImagePaths = {
  dominik,
  jens,
  sebastian,
} as const;

export type FounderName = keyof typeof founderImagePaths;

export class Founder {
  readonly imagePath: string;
  constructor(readonly name: FounderName) {
    this.imagePath = founderImagePaths[this.name];
  }

  get additionalOptions(): IBodyDefinition {
    return when(this.name)({
      dominik: {
        density: 10,
        mass: 5,
      },
      else: {},
    });
  }
}

export class Founders {
  readonly founders: Founder[];
  constructor(stockpile: FounderName[]) {
    this.founders = stockpile.map((name) => new Founder(name));
  }

  private founderIdx = 0;

  get next(): Founder {
    //in case the stockpile has been modified after we already received founders from it
    if (this.founderIdx > this.founders.length - 1) {
      this.founderIdx = 0;
    }
    const founder = this.founders[this.founderIdx];
    this.founderIdx = (this.founderIdx + 1) % this.founders.length;
    return founder;
  }
}
