import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import { shuffle } from "../../util/shuffleArray.ts";
import * as Matter from "matter-js";

import WOOD_50_200 from "./../../assets/objects/wood_50_200.png";


const Bodies = Matter.Bodies;
const Body = Matter.Body;



function getLevel(): Level {

  const woodOptions = {
    restitution: 0.9,
    plugin: {
      lotum: {
        breakable: "eventually",
      }
    }
  };

  const glassOptions = {
    render: {
      fillStyle: "lightblue",
    },
    restitution: 0.25,
    plugin: {
      lotum: {
        breakable: "instantly",
      }
    }
  };

  const tableTop = Bodies.rectangle(800, 525, 50, 400, woodOptions)
  Body.rotate(tableTop, 0.5 * Math.PI);


  const level = new Level();
  const possibleTargets = shuffle(["jan", "jan"]);
  level.slingPosition = { x: 100, y: 650 };

  level.setStockpile(["dominik", "jens", "dominik"]);

  level.objectsStatic = [
    objectFactory.createGround("platform", 450, 25, 50, 50),
    objectFactory.createGround("platform", 450, 150, 50, 200),
    objectFactory.createGround("platform", 450, 650, 50, 200),
    objectFactory.createGround("ground", 590, 785, 1180, 70),
    objectFactory.createGround("platform", 776, 125, 200, 50),

    objectFactory.createGround("platform", 1150, 25, 50, 50),
    objectFactory.createGround("platform", 1150, 150, 50, 200),
    objectFactory.createGround("platform", 1150, 650, 50, 200),
  ];

  level.objectsMovable = [
    // Bodies.rectangle(450, 300, 25, 98, glassOptions),
    // Bodies.rectangle(450, 450, 25, 200, glassOptions),
    Bodies.rectangle(450, 400, 10, 290, glassOptions),
    tableTop,
    Bodies.rectangle(638, 650, 25, 200, woodOptions),
    Bodies.rectangle(962, 650, 25, 200, woodOptions),
    Bodies.rectangle(650, 475, 50, 50, woodOptions),
    objectFactory.createGlass_50_100(1150, 300, 0),
    objectFactory.createGlass_50_200(1150, 450, 0),
  ];

  level.targets = [
    objectFactory.createTarget(possibleTargets.pop(), 1100, 710),
    objectFactory.createTarget(possibleTargets.pop(), 720, 710),
    objectFactory.createTarget(possibleTargets.pop(), 900, 710),
    objectFactory.createTarget(possibleTargets.pop(), 850, 50),
  ];

  return level;
}

export { getLevel };
