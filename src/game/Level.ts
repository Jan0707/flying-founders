import {BallFactory} from "./BallFactory.ts";
import {Target} from "../util/Target.ts";
import objectFactory from "./ObjectFactory.ts";
import {Body, Composite} from "matter-js";
import {FounderName, Founders} from "./Founders.ts";

export class Level {
    readonly targets: Body[];
    readonly founders: Founders
    readonly ballFactory = new BallFactory(this)

    objectsMovable: Body[] = [];
    objectsStatic: Body[] = [];
    misc: Body[] = [];
    composites: Composite[] = []

    constructor(
        readonly background: string,
        targets: Target[],
        readonly slingPosition: { x: number; y: number } = {x: 100, y: 650},
        readonly stockPile: FounderName[] = ['sebastian', 'jens', 'dominik']
    ) {
        this.targets = objectFactory.createTargetBodies(targets)
        this.founders = new Founders(stockPile)
    }

    getAllBodies() {
        return this.targets
            .concat(this.objectsMovable)
            .concat(this.objectsStatic)
            .concat(this.misc)
    }
}