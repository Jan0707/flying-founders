import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import { shuffle } from "../../util/shuffleArray.ts";

function getLevel(): Level {
  const level = new Level();
  const possibleTargets = shuffle(["jan", "jan"]);
  level.slingPosition = { x: 100, y: 200 };

  level.setStockpile(["dominik", "jens", "dominik", "jens"]);

  level.objectsStatic = [
    objectFactory.createGround("ground", 422, 280, 844, 20),
  ];

  level.objectsMovable = [
    objectFactory.createGlass_20_100(560, 220, 0),
    objectFactory.createGlass_20_100(690, 220, 0),
    objectFactory.createWood_50_200(625, 165, 0.5 * Math.PI),
  ];

  level.targets = [
    objectFactory.createTarget(possibleTargets.pop(), 620, 230),
  ];

  return level;
}

export { getLevel };
