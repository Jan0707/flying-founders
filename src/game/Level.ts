import {BallFactory} from "./BallFactory.ts";

class Level {
    background: string | undefined;
    targets: any[];
    objectsMovable: any[];
    objectsStatic: any[];
    slingPosition: { x: number; y: number };
    private stockpile = ['sebastian', 'jens', 'dominik']
    ballFactory: BallFactory | undefined;
    misc: any[];

    setStockpile(stockpile: string[]) {
        this.stockpile = stockpile;
        this.ballFactory = new BallFactory(this);
    }

    readonly getFounderFromStockpile = (() => {
        let founderIdx = 0
        return () => {
            //in case the stockpile has been modified after we already received founders from it
            if (founderIdx > this.stockpile.length - 1) {
                founderIdx = 0
            }
            const founder = this.stockpile[founderIdx]
            founderIdx = (founderIdx + 1) % this.stockpile.length
            return founder
        }
    })()

    getAllBodies(): [any] {
        return this.targets.concat(this.objectsMovable).concat(this.objectsStatic).concat(this.misc);
    }
}

type LevelCreatorFunction = () => Level;

export {Level, LevelCreatorFunction};
