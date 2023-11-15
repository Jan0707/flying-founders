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
    objectFactory.createObjectFromTopLeft("ground", 0, 750, 1180, 70, 0),
    objectFactory.createObjectFromTopLeft("platform", 560, 0, 20, 300, 0),
    objectFactory.createObjectFromTopLeft("platform", 560, 450, 20, 300, 0),

    objectFactory.createObjectFromTopLeft("platform", 780, 110, 20, 150, 0.5 * Math.PI),

    objectFactory.createObjectFromTopLeft("platform", 1150, 0, 20, 300, 0),
    objectFactory.createObjectFromTopLeft("platform", 1150, 450, 20, 300, 0),
  ];

  level.objectsMovable = [
    objectFactory.createObjectFromTopLeft("glass", 565, 300, 10, 150, 0),
    objectFactory.createObjectFromTopLeft("wood", 700, 580, 20, 300, 0.5 * Math.PI),
    
    objectFactory.createObjectFromTopLeft("wood", 730, 600, 20, 150, 0),
    objectFactory.createObjectFromTopLeft("wood", 960, 600, 20, 150, 0),
  ];

  level.targets = [
    objectFactory.createTarget(possibleTargets.pop(), 810, 720),
    objectFactory.createTarget(possibleTargets.pop(), 900, 720),
    objectFactory.createTarget(possibleTargets.pop(), 975, 550),
    objectFactory.createTarget(possibleTargets.pop(), 900, 80),
  ];

  return level;
}

export { getLevel };
