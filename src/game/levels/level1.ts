import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";

function getLevel(): Level {
  const level = new Level();
  level.slingPosition = { x: 100, y: 500 };

  level.setStockpile(["dominik", "jens", "dominik", "jens"]);

  level.objectsStatic = [
    objectFactory.createGround("ground", 400, 610, 810, 60),
    objectFactory.createGround("platform", 600, 300, 200, 20),
  ];

  level.objectsMovable = [
    objectFactory.createObject("wood", 450, 540, 20, 100, 0),
  ];

  level.targets = [
    objectFactory.createTarget("jan", 700, 540),
    objectFactory.createTarget("jan", 580, 250),
  ];

  return level;
}

export { getLevel };
