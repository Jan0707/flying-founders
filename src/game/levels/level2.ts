import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import { shuffle } from "../../util/shuffleArray.ts";

function getLevel(): Level {
  const level = new Level();
  const possibleTargets = shuffle(["jan", "jan"]);
  level.slingPosition = { x: 100, y: 500 };

  level.setStockpile(["jens", "jens", "jens", "dominik"]);

  level.objectsStatic = [
    objectFactory.createGround("ground", 400, 610, 810, 60),
    objectFactory.createGround("platform", 400, 300, 200, 20),
  ];

  level.objectsMovable = [
    objectFactory.createObject("concrete", 200, 540, 20, 100, 0),
  ];

  level.targets = [
    objectFactory.createTarget(possibleTargets.pop(), 700, 540),
    objectFactory.createTarget(possibleTargets.pop(), 380, 250),
  ];

  return level;
}

export { getLevel };
