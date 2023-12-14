import {Level} from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import {shuffle} from "../../util/shuffleArray.ts";
import {targetList} from "../../util/targetList.ts";

import LEVEL_BACKGROUND from "./../../assets/levels/level_3.jpg";

function getLevel(): Level {
    const level = new Level();

    level.background = LEVEL_BACKGROUND;

    const possibleTargets = shuffle([
        targetList.AK,
        targetList.Alex,
        targetList.Alexandra,
        targetList.Alisa,
        targetList.Andrzej,
        targetList.Anja,
        targetList.Anselm,
        targetList.Anton,
        targetList.Arthur,
        targetList.Beko,
        targetList.Beni,
        targetList.Carlo,
        targetList.Dave,
        targetList.David,
        targetList.Dennis,
        targetList.Diana,
        targetList.Etienne,
        targetList.Fabian,
        targetList.Falk,
        targetList.Gabriel,
        targetList.Garrelt,
        targetList.Grebiel,
        targetList.Jan_D,
        targetList.Jan_G,
        targetList.Jo,
        targetList.Joel,
        targetList.Julia,
        targetList.Julian,
        targetList.Kayleigh,
        targetList.Lars,
        targetList.Maren,
        targetList.Matthias,
        targetList.Michael,
        targetList.Petra,
        targetList.Richard,
        targetList.Robin,
        targetList.Sasha,
        targetList.Sebi,
        targetList.Sinead,
        targetList.Sophie,
        targetList.Sven,
        targetList.Thomas,
        targetList.Tobias,
        targetList.Vanessa,
        targetList.Wessel,
        targetList.Yann,
    ]);
    level.slingPosition = {x: 100, y: 650};

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
    ];

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
    ];

    level.targets = [
        //Glass Boxes Balls
        objectFactory.createTarget(possibleTargets.pop(), 430, 400),
        objectFactory.createTarget(possibleTargets.pop(), 730, 400),

        //Table Balls
        objectFactory.createTarget(possibleTargets.pop(), 508, 620),
        objectFactory.createTarget(possibleTargets.pop(), 731, 722),

        //Shelf Balls
        //objectFactory.createTarget(possibleTargets.pop(), 1070, 540),
        objectFactory.createTarget(possibleTargets.pop(), 1120, 540),

        //objectFactory.createTarget(possibleTargets.pop(), 1070, 440),
        objectFactory.createTarget(possibleTargets.pop(), 1120, 440),
    ];

    level.misc = [];

    return level;
}

export {getLevel};
