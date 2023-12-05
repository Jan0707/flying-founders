import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import { shuffle } from "../../util/shuffleArray.ts";

function getLevel(): Level {
  const level = new Level();
  const possibleTargets = shuffle(["jan", "jan"]);
  level.slingPosition = { x: 100, y: 650 };

  level.setStockpile(["dominik", "jens", "dominik"]);

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
    // objectFactory.createTarget(possibleTargets.pop(), 1095, 250),
  ];

  return level;
}

export { getLevel };
