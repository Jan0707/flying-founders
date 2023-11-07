import { BallFactory } from "./BallFactory.ts";

class Level {
  targets: any[];
  objectsMovable: any[];
  objectsStatic: any[];
  slingPosition: { x: number; y: number };
  stockpile: string[];
  ballFactory: BallFactory | undefined;

  setStockpile(stockpile: string[]) {
    this.stockpile = stockpile;
    this.ballFactory = new BallFactory(this);
  }

  getAllBodies(): [any] {
    return this.targets.concat(this.objectsMovable).concat(this.objectsStatic);
  }
}

type LevelCreatorFunction = () => Level;

export { Level, LevelCreatorFunction };
