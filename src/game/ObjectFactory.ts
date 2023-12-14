import * as Matter from "matter-js";

const Bodies = Matter.Bodies;
const Body = Matter.Body;

import {settings} from "./settings.ts";
import {objectList} from "../util/objectList.ts";
import {Target} from "../util/Target.ts";

class ObjectFactory {

    createFromTargets(targets: Target[]): object[] {
        return targets.map(target => this.createTarget(target.imagePath, target.startPosition.x, target.startPosition.y))
    }

    createTarget(imagePath: string, x: number, y: number): object {
        return Bodies.rectangle(x, y, 80, 80, {
            render: {
                sprite: {
                    texture: imagePath,
                    xScale: 80 / 175,
                    yScale: 80 / 175,
                },
            },
        });
    }

    getCenterFromTopLeftCorner(topX: number, topY: number, width: number, height: number, rotation: number): {
        x: number,
        y: number,
        rotation: number
    } {
        const centerX = topX + Math.cos(rotation) * 0.5 * width + Math.sin(rotation) * 0.5 * height;
        const centerY = topY + Math.sin(rotation) * 0.5 * width + Math.cos(rotation) * 0.5 * height;

        return {
            x: centerX,
            y: centerY,
            rotation: rotation
        }
    }

    createObjectFromTopLeft(
        type: string,
        x: number,
        y: number,
        length: number,
        height: number,
        rotation: number,
        inputOptions = {}
    ) {
        const options = {
            sleepThreshold: settings.objects.sleepThreshold,
        };

        if (type === "ground") {
            options.render = {
                fillStyle: "transparent",
            };
            options.restitution = 0.8;
            options.isStatic = true;
        }

        if (type === "platform") {
            options.render = {
                fillStyle: "orange",
                strokeStyle: "red",
                lineWidth: 3,
            };
            options.restitution = 0.8;
            options.isStatic = true;
        }

        if (type === "wood") {
            options.render = {
                fillStyle: "brown",
            };
            options.restitution = 0.1;
            options.friction = 0.95;
            options.frictionStatic = 1000;
            options.plugin = {
                lotum: {
                    breakable: "eventually",
                }
            };
        }

        if (type === "glass") {
            options.render = {
                fillStyle: "lightblue",
            };
            options.restitution = 0.05;
            options.friction = 0.8;
            options.frictionStatic = 1000;
            options.plugin = {
                lotum: {
                    breakable: "instantly",
                }
            };
        }

        if (type === "concrete") {
            options.render = {
                fillStyle: "grey",
            };
            options.mass = 5;
            options.friction = 1;
            options.frictionStatic = 100;
            options.restitution = 0.95;
        }

        const assetName = `${type}_${length}_${height}`;
        if (Object.keys(objectList).includes(assetName)) {
            options.render = {
                sprite: {
                    texture: objectList[assetName],
                },
            };
        }

        const centerCoordinates = this.getCenterFromTopLeftCorner(x, y, length, height, rotation);
        const combinedOptions = Object.assign({}, options, inputOptions);

        const createdObject = Bodies.rectangle(centerCoordinates.x, centerCoordinates.y, length, height, combinedOptions);

        //console.log(`Created ${type} object at x:${centerCoordinates.x} y:${centerCoordinates.y} with size of ${length} x ${height} from top left point of x:${x} y:${y}`);

        if (rotation) {
            Body.rotate(createdObject, rotation);
        }

        return createdObject;
    }
}

export default new ObjectFactory();
