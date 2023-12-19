import glass_10_80 from "./../assets/objects/glass_10_80.png";
import glass_10_85 from "./../assets/objects/glass_10_85.png";
import glass_10_100 from "./../assets/objects/glass_10_100.png";
import glass_10_130 from "./../assets/objects/glass_10_130.png";
import glass_10_150 from "./../assets/objects/glass_10_150.png";
import glass_10_160 from "./../assets/objects/glass_10_160.png";
import glass_10_230 from "./../assets/objects/glass_10_230.png";
import glass_20_80 from "./../assets/objects/glass_20_80.png";
import glass_20_150 from "./../assets/objects/glass_20_150.png";

import platform_10_40 from "./../assets/objects/platform_10_40.png";
import platform_10_80 from "./../assets/objects/platform_10_80.png";
import platform_10_150 from "./../assets/objects/platform_10_150.png";
import platform_10_200 from "./../assets/objects/platform_10_200.png";
import platform_10_300 from "./../assets/objects/platform_10_300.png";
import platform_20_100 from "./../assets/objects/platform_20_100.png";
import platform_20_300 from "./../assets/objects/platform_20_300.png";
import platform_30_300 from "./../assets/objects/platform_30_300.png";

import wood_10_80 from "./../assets/objects/wood_10_80.png";
import wood_10_95 from "./../assets/objects/wood_10_95.png";
import wood_10_110 from "./../assets/objects/wood_10_110.png";
import wood_10_150 from "./../assets/objects/wood_10_150.png";
import wood_10_170 from "./../assets/objects/wood_10_170.png";
import wood_15_300 from "./../assets/objects/wood_15_300.png";
import wood_20_40 from "./../assets/objects/wood_20_40.png";
import wood_20_80 from "./../assets/objects/wood_20_80.png";
import wood_20_150 from "./../assets/objects/wood_20_150.png";
import wood_20_200 from "./../assets/objects/wood_20_200.png";
import wood_20_300 from "./../assets/objects/wood_20_300.png";
import wood_50_200 from "./../assets/objects/wood_50_200.png";
import { IChamferableBodyDefinition} from "matter-js";
import {when} from "./when.ts";
import {settings} from "../game/settings.ts";

export class GameObject {
    constructor(
        readonly type: ObjectType,
        readonly length: ObjectLength,
        readonly width: ObjectWidth,
    ){}

    private get name(): ConstructedObjectName {
        return `${this.type}_${this.length}_${this.width}`
    }

    get additionalOptions(): IChamferableBodyDefinition {
        const options: IChamferableBodyDefinition = {
            sleepThreshold: settings.objects.sleepThreshold,
            ...when(this.type) <IChamferableBodyDefinition>({
                ground: {
                    render: {
                        fillStyle: "transparent",
                    },
                    restitution: 0.8,
                    isStatic: true,
                },
                platform: {
                    render: {
                        fillStyle: "orange",
                        strokeStyle: "red",
                        lineWidth: 3,
                    },
                    restitution: 0.8,
                    isStatic: true,
                },
                wood: (() => {
                    console.log('creating wood')

                    return {
                    render: {
                        fillStyle: "brown",
                    },
                    restitution: 0.1,
                    friction: 0.95,
                    frictionStatic: 1000,
                    plugin: {
                        lotum: {
                            breakable: 'eventually',
                            type: 'wood'
                        }
                    }
                }})(),
                glass: {
                    render: {
                        fillStyle: "lightblue",
                    },
                    restitution: 0.05,
                    friction: 0.8,
                    frictionStatic: 1000,
                    plugin: {
                        lotum: {
                            breakable: 'instantly',
                            type: 'glass'
                        }
                    }
                },
                concrete: {
                    render: {
                        fillStyle: "grey",
                    },
                    mass: 5,
                    friction: 1,
                    frictionStatic: 100,
                    restitution: 0.95,
                }
            })
        };

        const imagePath = objects[this.name as ObjectName]
        if(imagePath) {
            options.render = {
                sprite: {
                    texture: imagePath,
                    xScale: 1,
                    yScale: 1,
                }
            }
        }

        return options
    }
}

export type ObjectType = 'glass' | 'platform' | 'wood' | 'concrete' | 'ground'
export type ObjectLength = 10 | 15 | 20 | 30 | 50
export type ObjectWidth = 40 | 80 | 85 | 95 | 100 | 110 | 130 | 150 | 160 | 170 | 200 | 230 | 300

export type ConstructedObjectName = `${ObjectType}_${ObjectLength}_${ObjectWidth}`

const objects = {
    glass_10_80,
    glass_10_85,
    glass_10_100,
    glass_10_130,
    glass_10_150,
    glass_10_160,
    glass_10_230,
    glass_20_80,
    glass_20_150,

    platform_10_40,
    platform_10_80,
    platform_10_150,
    platform_10_200,
    platform_10_300,
    platform_20_100,
    platform_20_300,
    platform_30_300,

    wood_10_80,
    wood_10_95,
    wood_10_110,
    wood_10_150,
    wood_10_170,
    wood_15_300,
    wood_20_40,
    wood_20_80,
    wood_20_150,
    wood_20_200,
    wood_20_300,
    wood_50_200,
} as const satisfies Partial<Record<ConstructedObjectName, string>>

export type ObjectName = keyof typeof objects