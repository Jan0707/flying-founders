import {Target} from "../util/Target.ts";
import {Bodies, Body} from "matter-js";
import {GameObject, ObjectLength, ObjectType, ObjectWidth} from "../util/objectList.ts";

class ObjectFactory {

    createFromTargets(targets: Target[]) {
        return targets.map(target => this.createTarget(target.imagePath, target.startPosition.x, target.startPosition.y))
    }

    createTarget(imagePath: string, x: number, y: number): Body {
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
        type: ObjectType,
        x: number,
        y: number,
        length: ObjectLength,
        height: ObjectWidth,
        rotation: number,
        inputOptions = {}
    ): Body {

        const obj = new GameObject(type, length, height)

        const centerCoordinates = this.getCenterFromTopLeftCorner(x, y, length, height, rotation);
        const combinedOptions = Object.assign({}, obj.renderOptions, inputOptions);

        const createdObject = Bodies.rectangle(centerCoordinates.x, centerCoordinates.y, length, height, combinedOptions);

        if (rotation) {
            Body.rotate(createdObject, rotation);
        }

        return createdObject;
    }
}

export default new ObjectFactory();
