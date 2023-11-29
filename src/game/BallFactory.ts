import * as Matter from "matter-js";
const Bodies = Matter.Bodies;

import Level from "./Level.ts";

import FOUNDER_DOMINIK from "./../assets/founders/dominik.png";
import FOUNDER_JENS from "./../assets/founders/jens.png";
import FOUNDER_SEBASTIAN from "./../assets/founders/sebastian.png";

export class BallFactory {
  level: Level;
  constructor(level: Level) {
    this.level = level;
  }

  getBall(): object {
    const name = this.level.stockpile.pop();
    let texture = null;
    let scales = 0.15;

    if (name == "dominik") {
      texture = FOUNDER_DOMINIK;
    } else if (name === "jens") {
      texture = FOUNDER_JENS;
    } else if (name === "sebastian") {
      texture = FOUNDER_SEBASTIAN;
      scales = 0.05
    }

    const ball = Bodies.circle(
      this.level.slingPosition.x,
      this.level.slingPosition.y,
      30,
      {
        render: {
          sprite: {
            texture: texture,
            xScale: scales,
            yScale: scales,
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
    return this.level.stockpile.length;
  }
}
