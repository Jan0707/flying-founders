import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";

const level = new Level();
level.name = "2";
level.slingPosition = { x: 100, y: 500 };

level.setStockpile(["jens", "jens", "jens", "dominik"]);

level.objectsStatic = [
  objectFactory.createGround("ground", 400, 610, 810, 60),
  objectFactory.createGround("platform", 400, 300, 200, 20),
];

level.objectsMovable = [
  objectFactory.createObject("wood", 200, 540, 20, 100, 0),
];

level.targets = [
  objectFactory.createTarget("jan", 700, 540),
  objectFactory.createTarget("jan", 380, 250),
];

export { level };
