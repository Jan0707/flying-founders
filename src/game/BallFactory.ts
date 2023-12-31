import { Level } from "./Level.ts";
import { Bodies } from "matter-js";

export class BallFactory {
  level: Level;

  constructor(level: Level) {
    this.level = level;
  }

  getBall() {
    const founder = this.level.founders.next;

    const ball = Bodies.circle(
      this.level.slingPosition.x,
      this.level.slingPosition.y,
      40,
      {
        render: {
          sprite: {
            texture: founder.imagePath,
            xScale: 80 / 175,
            yScale: 80 / 175,
          },
        },
        ...founder.additionalOptions,
      },
    );

    ball.plugin.lotum = {
      founder,
    };

    return ball;
  }
}
