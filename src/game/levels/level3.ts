import {Level} from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import {Target} from "../../util/Target.ts";

import LEVEL_BACKGROUND from "./../../assets/levels/level_3.jpg";

function getLevel(): Level {
    const targets = [
        //Glass Boxes Balls
        new Target({x: 430, y: 400}),
        new Target({x: 730, y: 400}),

        //Table Balls
        new Target({x: 508, y: 620}),
        new Target({x: 731, y: 722}),

        //Shelf Balls
        //new Target({x: 1070, y: 540}),
        new Target({x: 1120, y: 540}),

        //new Target({x: 1070, y: 440}),
        new Target({x: 1120, y: 440}),
        ]

    const level = new Level(LEVEL_BACKGROUND, targets)

    level.objectsStatic = [
        //Ground
        objectFactory.createObjectFromTopLeft("ground", 0, 750, 1180, 70, 0),

        //Box 1 Platform
        objectFactory.createObjectFromTopLeft("platform", 380, 430, 20, 100, 0.5 * Math.PI),

        //Box 2 Platform
        objectFactory.createObjectFromTopLeft("platform", 680, 430, 20, 100, 0.5 * Math.PI),

        //TV
        objectFactory.createObjectFromTopLeft("platform", 1000, 300, 30, 300, 0),

        // Back wall, NO asset available
        objectFactory.createObjectFromTopLeft("platform", 1181, 0, 70, 820, 0),
    ]

    level.objectsMovable = [
        //Table 1
        objectFactory.createObjectFromTopLeft("wood", 310, 670, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 385, 670, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 465, 670, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 540, 670, 10, 80, 0),

        objectFactory.createObjectFromTopLeft("wood", 310, 660, 10, 80, 0.5 * Math.PI),
        objectFactory.createObjectFromTopLeft("wood", 390, 660, 10, 80, 0.5 * Math.PI),
        objectFactory.createObjectFromTopLeft("wood", 470, 660, 10, 80, 0.5 * Math.PI),


        //Table 2
        objectFactory.createObjectFromTopLeft("wood", 611, 670, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 685, 670, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 765, 670, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 840, 670, 10, 80, 0),

        objectFactory.createObjectFromTopLeft("wood", 611, 660, 10, 80, 0.5 * Math.PI),
        objectFactory.createObjectFromTopLeft("wood", 691, 660, 10, 80, 0.5 * Math.PI),
        objectFactory.createObjectFromTopLeft("wood", 771, 660, 10, 80, 0.5 * Math.PI),

        //Box 1 Glasses
        objectFactory.createObjectFromTopLeft("glass", 390, 350, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("glass", 460, 350, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("glass", 380, 340, 10, 100, 0.5 * Math.PI),

        //Box 2 Glasses
        objectFactory.createObjectFromTopLeft("glass", 680, 350, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("glass", 770, 350, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("glass", 680, 340, 10, 100, 0.5 * Math.PI),

        //TV Sideboard
        objectFactory.createObjectFromTopLeft("glass", 1010, 600, 20, 150, 0),

        //Back Shelf
        objectFactory.createObjectFromTopLeft("glass", 1030, 670, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 1170, 670, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("glass", 1030, 660, 10, 150, 0.5 * Math.PI),
        objectFactory.createObjectFromTopLeft("glass", 1030, 579, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 1170, 579, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 1030, 570, 10, 150, 0.5 * Math.PI),
        objectFactory.createObjectFromTopLeft("wood", 1030, 500, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 1170, 500, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 1030, 490, 10, 150, 0.5 * Math.PI),
        objectFactory.createObjectFromTopLeft("wood", 1030, 410, 10, 80, 0),
        objectFactory.createObjectFromTopLeft("wood", 1170, 410, 10, 80, 0),
    ]

    return level;
}

export {getLevel};
