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

    //right pillar
    objectFactory.createObjectFromTopLeft("platform", 1170, 670, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("platform", 1170, 370, 10, 300, 0),
    objectFactory.createObjectFromTopLeft("platform", 1170, 290, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("platform", 1170, 130, 10, 150, 0),

    objectFactory.createObjectFromTopLeft("wood", 1150, 290, 20, 300, 0),
    objectFactory.createObjectFromTopLeft("wood", 1150, 130, 20, 150, 0),

    objectFactory.createObjectFromTopLeft("platform", 1140, 130, 10, 150, 0),
    objectFactory.createObjectFromTopLeft("platform", 1140, 370, 10, 300, 0),

    //left pillar
    objectFactory.createObjectFromTopLeft("platform", 1040, 370, 10, 300, 0),
    objectFactory.createObjectFromTopLeft("platform", 1010, 290, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("platform", 1040, 130, 10, 150, 0),

    objectFactory.createObjectFromTopLeft("wood", 1020, 290, 20, 300, 0),
    objectFactory.createObjectFromTopLeft("wood", 1020, 130, 20, 150, 0),

    objectFactory.createObjectFromTopLeft("platform", 1010, 130, 10, 150, 0),
    objectFactory.createObjectFromTopLeft("platform", 1010, 370, 10, 300, 0),

    objectFactory.createObjectFromTopLeft("platform", 710, 290, 20, 300, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("platform", 860, 210, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("platform", 710, 400, 20, 300, 0.5 * Math.PI),









  ];

  level.objectsMovable = [
    //Lift right
    objectFactory.createObjectFromTopLeft("glass", 1155, 590, 10, 160, 0),

    //Lift left
    objectFactory.createObjectFromTopLeft("glass", 1025, 590, 10, 160, 0),

    //Lift center
    objectFactory.createObjectFromTopLeft("glass", 1020, 280, 10, 150, 0.5 * Math.PI),

    //Glass Barrier 1
    objectFactory.createObjectFromTopLeft("glass", 710, 210, 10, 80, 0),

    //Glass Barrier 2
    objectFactory.createObjectFromTopLeft("glass", 710, 310, 10, 80, 0),



    //Stack 0
    objectFactory.createObjectFromTopLeft("glass", 390, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 470, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 550, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 630, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 390, 660, 10, 90, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 480, 660, 10, 80, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 560, 660, 10, 90, 0.5 * Math.PI),


    //Stack 1
    objectFactory.createObjectFromTopLeft("glass", 470, 580, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 550, 580, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 630, 580, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 470, 570, 10, 90, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 560, 570, 10, 90, 0.5 * Math.PI),

    //Stack 2
    objectFactory.createObjectFromTopLeft("glass", 550, 490, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 630, 490, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 550, 480, 10, 100, 0.5 * Math.PI),


    //Stack 3
    objectFactory.createObjectFromTopLeft("glass", 630, 400, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 630, 390, 10, 100, 0.5 * Math.PI),










  ];

  level.targets = [
    objectFactory.createTarget(possibleTargets.pop(), 1095, 250),

  ];

  return level;
}

export { getLevel };
