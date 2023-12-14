import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import { shuffle } from "../../util/shuffleArray.ts";

import * as Matter from "matter-js";

import { settings } from "../settings.ts";
import {targetList} from "../../util/targetList.ts";

import STAIRS_100_1000 from "./../../assets/objects/stairs_100_1000.png";
import LOTUM_BANNER_346_102 from "./../../assets/objects/lotum_banner_346_102.svg";
import LEVEL_BACKGROUND from "./../../assets/levels/credit_background.jpg";

import SZ_DESIGN_340_129 from "./../../assets/objects/sz_design_340_129.png";


function getLevel(): Level {
  const level = new Level();
  const possibleTargets = shuffle([
    targetList.Alisa,
    targetList.Andrzej,
    targetList.Carlo,
    targetList.Diana,
    targetList.Jo,
    targetList.Maren,
    targetList.Sven,
    targetList.Robin,
    targetList.Anja,
    targetList.Alexandra
    ]);
  level.slingPosition = { x: 1500, y: 1500 };

  const Bodies = Matter.Bodies;
  const Body = Matter.Body;
  const Constraint = Matter.Constraint;
  const Composite = Matter.Composite;
  const Composites = Matter.Composites;

  level.setStockpile(["sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik"]);

  settings.targets.minimalSpeedToHit = 100;
  settings.objects.eventuallyBreakingSpeedStart = 100;
  settings.objects.instantBreakingSpeed = 100;

  const woodOptions = {
    restitution: 0.5, friction:0.01, frictionstatic: 0,
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
    restitution: 0.05, friction:0.01, frictionstatic: 0,
    plugin: {
      lotum: {
        breakable: "instantly",
      }
    }
  };
// Define the number of steps
const stairCount = 35;

// Array to hold all the steps
var stairstack = [];



// Loop to create each step
  var stairstack = Matter.Composites.stack(0, 0, stairCount, 2, 0, 0, function(x, y, column) {
    return Matter.Bodies.rectangle(x - 66, y + column * stairCount, 100, 1000, {
        isStatic: true, friction:0.01, frictionstatic: 0,
        render: {
            sprite: {
                texture: STAIRS_100_1000 // Provide the correct path to your texture image here
            }
        }
    });
});

let lotumbanner = Matter.Bodies.rectangle(175, 700, 346, 102, {
  isStatic: true,
  render: {
    sprite: {
      texture: LOTUM_BANNER_346_102 // Stelle sicher, dass dies ein gültiger Pfad/URL ist
    }
  }
});

let lotumbannercomposite = Matter.Composite.create({
  bodies: lotumbanner // Füge den Körper der Composite hinzu
});


let Schriftzug_Design = Bodies.rectangle(170, -700, 340, 129, {
  friction:0.01, frictionstatic: 0,
  render: {
    sprite: {
      texture: SZ_DESIGN_340_129 // Provide the correct path to your texture image here
    }
  } 
});


  //stairstack.render.sprite.texture = STAIRS_100_500;

  level.objectsStatic = [
    objectFactory.createObjectFromTopLeft("ground", 0, 0, 5, -1000, 0),
    objectFactory.createObjectFromTopLeft("ground", 1280, 820, 5, 5, 0),
  ];

  level.objectsMovable = [
    //objectFactory.createObjectFromTopLeft("wood", 170, -700, 100, 350, 0),

  ];


  const numberOfTargets = 9; // You can adjust this number as needed

     // Initialize an array to store the coordinate pairs
        let values = [];

    for (let i = 0; i < numberOfTargets; i++) {
    // Generate a random y coordinate between -1000 and 0
    const y = Math.floor(Math.random() * (1 - (-1000))) - 1000;

    // Generate a random x coordinate between 180 and 250
    const x = Math.floor(Math.random() * (250 - 180 + 1)) + 180;

    // Add the coordinates to the values array
    values.push([x, y]); // Replace with objectFactory.createTarget(possibleTargets.pop(), x, y); if necessary
    }

    // Use the values array to create objects
    level.targets = [
    ...values.map(([x, y]) => {
        return objectFactory.createTarget(possibleTargets.pop(), x, y);
    }),
  ];

  
  level.background = LEVEL_BACKGROUND;  
  
  level.misc = [
    stairstack,
    lotumbannercomposite,
    Schriftzug_Design
  ];

  return level;
}




export { getLevel };

