import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import { shuffle } from "../../util/shuffleArray.ts";

function getLevel(): Level {
  const level = new Level();
  const possibleTargets = shuffle(["jan", "jan"]);
  level.slingPosition = { x: 100, y: 500 };

  level.setStockpile(["dominik", "jens", "dominik", "jens"]);

  level.objectsStatic = [
    objectFactory.createGround("ground", 400, 610, 810, 60),
    objectFactory.createGround("platform", 600, 300, 250, 20),
  ];

  level.objectsMovable = [
    objectFactory.createWood_50_200(450, 540, 0),
    objectFactory.createGlass_20_100(520, 250, 0),
    objectFactory.createGlass_20_100(640, 250, 0),
    objectFactory.createWood_50_200(580, 220, 0.5 * Math.PI),


    //objectFactory.createPlant_50_100(520, 250, 0),
  ];

  level.targets = [
    objectFactory.createTarget(possibleTargets.pop(), 700, 540),
    objectFactory.createTarget(possibleTargets.pop(), 580, 250),
  ];

  return level;
}

export { getLevel };
