import * as Matter from "matter-js";
const Bodies = Matter.Bodies;

import Level from "./Level.ts";

import FOUNDER_DOMINIK from "./../assets/founders/dominik.png";
import FOUNDER_JENS from "./../assets/founders/jens.png";

export class BallFactory {
  level: Level;
  constructor(level: Level) {
    this.level = level;
  }

  getBall(): object {
    const name = this.level.stockpile.pop();
    let texture = null;

    if (name == "dominik") {
      texture = FOUNDER_DOMINIK;
    } else if (name === "jens") {
      texture = FOUNDER_JENS;
    }

    const ball = Bodies.circle(
      this.level.slingPosition.x,
      this.level.slingPosition.y,
      20,
      {
        render: {
          sprite: {
            texture: texture,
            xScale: 0.1,
            yScale: 0.1,
          },
        },
      },
    );

    ball.plugin.lotum = {
      name: name,
    };

    return ball;
  }

  getRemainingShots(): number {
    console.log(this.level.stockpile);

    return this.level.stockpile.length;
  }
}
