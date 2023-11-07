import * as Matter from "matter-js";
const Bodies = Matter.Bodies;

import Level from "./Level.ts";

export class BallFactory {
  //
  level: Level;
  constructor(level: Level) {
    this.level = level;
  }

  getBall(): object {
    const name = this.level.stockpile.pop();

    const ball = Bodies.circle(
      this.level.slingPosition.x,
      this.level.slingPosition.y,
      20,
      {
        render: {
          sprite: {
            texture: `/${name}.png`,
            xScale: 0.1,
            yScale: 0.1,
          },
        },
      },
    );

    return ball;
  }

  getRemainingShots(): number {
    console.log(this.level.stockpile);

    return this.level.stockpile.length;
  }
}
