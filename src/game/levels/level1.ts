import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import { shuffle } from "../../util/shuffleArray.ts";
import * as Matter from "matter-js";

import WOOD_50_200 from "./../../assets/objects/wood_50_200.png";


const Bodies = Matter.Bodies;
const Body = Matter.Body;



function getLevel(): Level {

  const woodOptions = {
    restitution: 0.5,
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
    restitution: 0.05,
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

  level.setStockpile(["sebastian", "sebastian", "sebastian","sebastian","sebastian"]);

  level.objectsStatic = [
    //ground
    objectFactory.createObjectFromTopLeft("ground", 0, 750, 1180, 70, 0),

    //top left pillar
    objectFactory.createObjectFromTopLeft("platform", 480, 0, 10, 300, 0),
    
    objectFactory.createObjectFromTopLeft("platform", 510, 0, 10, 300, 0),
    objectFactory.createObjectFromTopLeft("platform", 480, 300, 10, 40, 0.5 * Math.PI),

    //bottom left pillar
    objectFactory.createObjectFromTopLeft("platform", 480, 450, 10, 300, 0),
    
    objectFactory.createObjectFromTopLeft("platform", 510, 450, 10, 300, 0),
    objectFactory.createObjectFromTopLeft("platform", 480, 440, 10, 40, 0.5 * Math.PI),

    //ceiling light
    objectFactory.createObjectFromTopLeft("platform", 780, 110, 20, 150, 0.5 * Math.PI),

    //top right pillar
    objectFactory.createObjectFromTopLeft("platform", 1130, 0, 10, 300, 0),
    
    objectFactory.createObjectFromTopLeft("platform", 1160, 0, 10, 300, 0),
    objectFactory.createObjectFromTopLeft("platform", 1130, 300, 10, 40, 0.5 * Math.PI),


    //bottom right pillar
    objectFactory.createObjectFromTopLeft("platform", 1130, 450, 10, 300, 0),
    
    objectFactory.createObjectFromTopLeft("platform", 1160, 450, 10, 300, 0),
    objectFactory.createObjectFromTopLeft("platform", 1130, 440, 10, 40, 0.5 * Math.PI),
  ];

  level.objectsMovable = [
    objectFactory.createObjectFromTopLeft("wood", 1140, 0, 20, 300, 0),//top right pillar
    objectFactory.createObjectFromTopLeft("wood", 490, 450, 20, 300, 0),//bottom left pillar
    objectFactory.createObjectFromTopLeft("wood", 490, 0, 20, 300, 0),//top left pillar
    objectFactory.createObjectFromTopLeft("wood", 1140, 450, 20, 300, 0),//bottom right pillar

    //glass left
    objectFactory.createObjectFromTopLeft("glass", 495, 310, 10, 130, 0),

    //glas right
    objectFactory.createObjectFromTopLeft("glass", 1145, 310, 10, 130, 0),

    //table
    objectFactory.createObjectFromTopLeft("wood", 700, 580, 20, 300, 0.5 * Math.PI), //table top
    objectFactory.createObjectFromTopLeft("wood", 730, 600, 20, 150, 0), //table leg left
    objectFactory.createObjectFromTopLeft("wood", 960, 600, 20, 150, 0), //table leg right
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
