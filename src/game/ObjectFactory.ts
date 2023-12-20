import {Target} from "../util/Target.ts";
import {Bodies, Body, IChamferableBodyDefinition} from "matter-js";
import {
    GameObject,
    ObjectLength,
    ObjectType,
    ObjectWidth,
} from "../util/objectList.ts";

import PRESENT_45_60 from "./../assets/objects/present_45_60.png";
import CHAIR from "./../assets/objects/Slingshot.png";

class ObjectFactory {
    createTargetBodies(targets: Target[]) {
        return targets.map((target) => this.createTargetBody(target));
    }

    createTargetBody(target: Target): Body {
        return Bodies.rectangle(
            target.startPosition.x,
            target.startPosition.y,
            80,
            80,
            {
                plugin: {
                    lotum: {
                        target,
                    },
                },
                render: {
                    sprite: {
                        texture: target.imagePath,
                        xScale: 80 / 175,
                        yScale: 80 / 175,
                    },
                },
            },
        );
    }

    createSlingBody(x: number, y: number) {
        // create options that prevent all collisions
        const options: IChamferableBodyDefinition = {
            plugin: {
                lotum: {
                    sling: true,
                },
            },
            collisionFilter: {
                category: 0x0000,
                mask: 0x0000,
            },
            isStatic: true,
            render: {
                sprite: {
                    texture: CHAIR,
                    xScale: 1/10,
                    yScale: 1/10
                },
            },
        };

        return Bodies.rectangle(x, y, 45, 60, options)
    }

    createPresent_45_60(x
                            :
                            number, y
                            :
                            number
    ) {
        const options = {
            render: {
                sprite: {
                    texture: PRESENT_45_60,
                    xScale: 1,
                    yScale: 1,
                },
            },
            plugin: {
                lotum: {
                    explodable: true,
                },
            },
        };

        const createdObject = Bodies.rectangle(x, y, 45, 60, options);
        return createdObject;
    }

    getCenterFromTopLeftCorner(
        topX
            :
            number,
        topY
            :
            number,
        width
            :
            number,
        height
            :
            number,
        rotation
            :
            number,
    ):
        {
            x: number;
            y: number;
            rotation: number;
        } {
        const centerX =
            topX +
            Math.cos(rotation) * 0.5 * width +
            Math.sin(rotation) * 0.5 * height;
        const centerY =
            topY +
            Math.sin(rotation) * 0.5 * width +
            Math.cos(rotation) * 0.5 * height;

        return {
            x: centerX,
            y: centerY,
            rotation: rotation,
        };
    }

    createObjectFromTopLeft(
        type
            :
            ObjectType,
        x
            :
            number,
        y
            :
            number,
        length
            :
            ObjectLength,
        height
            :
            ObjectWidth,
        rotation
            :
            number,
        inputOptions = {},
    ):
        Body {
        const obj = new GameObject(type, length, height);

        const centerCoordinates = this.getCenterFromTopLeftCorner(
            x,
            y,
            length,
            height,
            rotation,
        );
        const combinedOptions = Object.assign(
            {},
            obj.additionalOptions,
            inputOptions,
        );

        const createdObject = Bodies.rectangle(
            centerCoordinates.x,
            centerCoordinates.y,
            length,
            height,
            combinedOptions,
        );

        if (rotation) {
            Body.rotate(createdObject, rotation);
        }

        return createdObject;
    }
}

export default new ObjectFactory();
