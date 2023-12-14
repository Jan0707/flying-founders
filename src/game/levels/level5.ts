import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";

function getLevel(): Level {
  const level = new Level();
  const possibleTargets = ["jan", "jan"]
  level.slingPosition = { x: 100, y: 650 };


// Define the number of steps
//const stairCount = 25;

// Array to hold all the steps
//var stairstack = [];

// Loop to create each step
  /*var stairstack = Matter.Composites.stack(0, 0, stairCount + 2, 1, 0, 0, function(x, y, column) {
    return Matter.Bodies.rectangle(x - 50, y + column * 35, 100, 1000, {
        isStatic: true,
    });
    });*/


  level.objectsStatic = [

  ];

  level.objectsMovable = [

  ];

  level.targets = [
    objectFactory.createTarget(possibleTargets.pop(), 1095, 250),
    objectFactory.createTarget(possibleTargets.pop(), 200, 50),
  ];

  level.misc = [
    //stairstack
  ];

  return level;
}

export { getLevel };
