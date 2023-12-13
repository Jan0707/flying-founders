import { BallFactory } from "./BallFactory.ts";

class Level {
  background: string | undefined;
  targets: any[];
  objectsMovable: any[];
  objectsStatic: any[];
  slingPosition: { x: number; y: number };
  stockpile: string[];
  ballFactory: BallFactory | undefined;
  misc: any[];
  
  setStockpile(stockpile: string[]) {
    this.stockpile = stockpile;
    this.ballFactory = new BallFactory(this);
  }

  getAllBodies(): [any] {
    return this.targets.concat(this.objectsMovable).concat(this.objectsStatic).concat(this.misc);
  }
}

type LevelCreatorFunction = () => Level;

export { Level, LevelCreatorFunction };
