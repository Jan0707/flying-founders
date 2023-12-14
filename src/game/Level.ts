import {BallFactory} from "./BallFactory.ts";
import {Target} from "../util/Target.ts";
import objectFactory from "./ObjectFactory.ts";
import {Body} from "matter-js";

export class Level {
    readonly targets: Body[];

    constructor(
        readonly background: string,
        targets: Target[],
        readonly slingPosition: { x: number; y: number } = {x: 100, y: 650},
    ) {
        this.targets = objectFactory.createFromTargets(targets)
    }

    objectsMovable: any[];
    objectsStatic: any[];
    misc: any[];

    private stockpile = ['sebastian', 'jens', 'dominik']

    readonly ballFactory = new BallFactory(this)

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

    setStockpile(stockpile: string[]) {
        this.stockpile = stockpile;
    }

    getAllBodies(): unknown[] {
        console.debug('AHAAAAAAA ', this.targets)
        return this.targets.concat(this.objectsMovable).concat(this.objectsStatic).concat(this.misc);
    }
}