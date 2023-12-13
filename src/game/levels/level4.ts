import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import { shuffle } from "../../util/shuffleArray.ts";
import {targetList} from "../../util/targetList.ts";

import LEVEL_BACKGROUND from "./../../assets/levels/level_4.jpg";

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
  level.slingPosition = { x: 100, y: 650 };

  level.setStockpile(["sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik"]);

  level.objectsStatic = [
    //ground
    objectFactory.createObjectFromTopLeft("ground", 0, 750, 1180, 70, 0),

    //Glass Pillar Holder Bottom
    objectFactory.createObjectFromTopLeft("platform", 360, 670, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("platform", 390, 670, 10, 80, 0),

    //Glass Pillar Holder Top
    objectFactory.createObjectFromTopLeft("platform", 360, 0, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("platform", 390, 0, 10, 80, 0),

    objectFactory.createObjectFromTopLeft("platform", 660, 160, 10, 80, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("platform", 740, 160, 10, 80, 0.5 * Math.PI),
  ];

  level.objectsMovable = [
    //Glass Pillar
    objectFactory.createObjectFromTopLeft("glass", 370, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 370, 590, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 370, 510, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 370, 430, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 370, 350, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 370, 270, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 370, 190, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 370, 110, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 370, 30, 20, 80, 0),

    objectFactory.createObjectFromTopLeft("glass", 660, 80, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 660, 0, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 810, 80, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 810, 0, 10, 80, 0),


    //First Floor
    objectFactory.createObjectFromTopLeft("wood", 730, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 750, 710, 20, 40, 0),
    objectFactory.createObjectFromTopLeft("wood", 770, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 840, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 920, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 1000, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 1160, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 750, 630, 20, 80, 0),

    objectFactory.createObjectFromTopLeft("wood", 770, 660, 10, 80, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 850, 660, 10, 80, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 930, 660, 10, 80, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 1010, 660, 10, 170, 0.5 * Math.PI), //longer as in figma

    //Second Floor
    objectFactory.createObjectFromTopLeft("wood", 840, 580, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 920, 580, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 1000, 580, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 1160, 580, 20, 80, 0),

    objectFactory.createObjectFromTopLeft("wood", 850, 570, 10, 80, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 930, 570, 10, 80, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 1010, 570, 10, 170, 0.5 * Math.PI), //longer as in figma

    //Third Floor
    objectFactory.createObjectFromTopLeft("wood", 920, 490, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 1000, 490, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 1160, 490, 20, 80, 0),

    objectFactory.createObjectFromTopLeft("wood", 930, 480, 10, 80, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 1010, 480, 10, 170, 0.5 * Math.PI), //longer as in figma

    //Fourth Floor
    objectFactory.createObjectFromTopLeft("wood", 1000, 400, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 1080, 400, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 1160, 400, 20, 80, 0),

    objectFactory.createObjectFromTopLeft("wood", 1010, 390, 10, 80, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 1090, 390, 10, 80, 0.5 * Math.PI),

  ];

  level.targets = [
    objectFactory.createTarget(possibleTargets.pop(), 1095, 250),
    objectFactory.createTarget(possibleTargets.pop(), 200, 50),
  ];

  level.misc = [];

  return level;
}

export { getLevel };
