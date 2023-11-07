import * as Matter from "matter-js";
const Bodies = Matter.Bodies;
const Body = Matter.Body;

class ObjectFactory {
  createTarget(name: string, x: number, y: number): object {
    return Bodies.rectangle(x, y, 80, 80, {
      render: {
        sprite: {
          texture: `/${name}.png`,
          xScale: 0.2,
          yScale: 0.2,
        },
      },
    });
  }
  createGround(
    type: string,
    x: number,
    y: number,
    length: number,
    height: number,
  ): object {
    const options = { isStatic: true };

    if (type === "ground") {
      options.render = {
        fillStyle: "green",
      };
    }

    if (type === "platform") {
      options.render = {
        fillStyle: "orange",
        strokeStyle: "red",
        lineWidth: 3,
      };
    }

    return Bodies.rectangle(x, y, length, height, options);
  }

  createObject(
    type: string,
    x: number,
    y: number,
    length: number,
    height: number,
    rotation: number,
  ): object {
    const options = {};

    if (type === "wood") {
      options.render = {
        fillStyle: "brown",
      };
    }

    const createdObject = Bodies.rectangle(x, y, length, height, options);

    if (rotation) {
      Body.rotate(createdObject, rotation);
    }

    return createdObject;
  }
}

export default new ObjectFactory();
