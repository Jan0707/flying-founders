import {Level} from "./Level.ts";
import {Bodies} from "matter-js";

export class BallFactory {
    level: Level;

    constructor(level: Level) {
        this.level = level;
    }

    getBall() {
        const founder = this.level.founders.next

        const ball = Bodies.circle(
            this.level.slingPosition.x,
            this.level.slingPosition.y,
            30,
            {
                render: {
                    sprite: {
                        texture: founder.imagePath,
                        xScale: 60 / 175,
                        yScale: 60 / 175,
                    },
                },
            },
        );

        ball.plugin.lotum = {
            founder
        };

        return ball;
    }
}
