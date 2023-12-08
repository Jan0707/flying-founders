import { Level } from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import { shuffle } from "../../util/shuffleArray.ts";
import * as Matter from "matter-js";

function getLevel(): Level {
  const level = new Level();
  const possibleTargets = shuffle(["jan", "jan"]);
  level.slingPosition = { x: 150, y: 650 };

  const Bodies = Matter.Bodies;
  const Body = Matter.Body;
  const Constraint = Matter.Constraint;
  const Composite = Matter.Composite;
  const Composites = Matter.Composites;


  const woodOptions = {
    restitution: 0.01, friction:0.95, frictionstatic: 9, slop: 0.001,
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
    restitution: 0.01, friction:0.95, frictionstatic: 9, slop: 0.001,
    plugin: {
      lotum: {
        breakable: "instantly",
      }
    }
  };

  level.setStockpile(["sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik","sebastian", "jens", "dominik"]);

  var Beamerbar = objectFactory.createObjectFromTopLeft("wood", 260, 140, 180, 10, 0);

  //var group = Body.nextGroup(true);
   var ropeC = Matter.Composites.stack(275, 50, 1, 3, 5, 5, function(x, y) {
      return Matter.Bodies.rectangle(x, y , 5, 25/*, { collisionFilter: { group: group } }*/);
     });
    Matter.Composites.chain(ropeC, 0, 0.5, 0, -0.5, { stiffness: 1, damping: 0.1});
    Matter.Composite.add(ropeC, Constraint.create({ 
    bodyB: ropeC.bodies[0],
    pointB: { x: 0, y: -5 },
    pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y -5},
     damping: 0.1
    }));   
  var ropeB = Matter.Composites.stack(435, 50, 1, 3, 5, 5, function(x, y) {
     return Matter.Bodies.rectangle(x, y , 5, 25);
      }); 
    Matter.Composites.chain(ropeB, 0, 0.5, 0, -0.5, { stiffness: 1, damping: 0.1});
    ropeB = Matter.Composite.add(ropeB, Constraint.create({ 
    bodyB: ropeB.bodies[0],
    pointB: { x: 0, y: -5 },
    pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y - 5 },
     damping: 0.1
    }));


    ropeB = Matter.Composite.add(ropeB, Constraint.create({
      bodyB: ropeB.bodies[2],
      pointB: {x: 0, y: 5},
      bodyA: Beamerbar, 
      pointA: {x: +80, y: 0},
      damping: 0.1
    }));

    ropeC = Matter.Composite.add(ropeC, Constraint.create({
      bodyB: ropeC.bodies[2],
      pointB: {x: 0, y: 5},
      bodyA: Beamerbar, 
      pointA: {x: -80, y: 0},
      damping: 0.1
    }));




  level.objectsStatic = [
    //ground
    objectFactory.createObjectFromTopLeft("ground", 0, 750, 1180, 70, 0),

    //right pillar
    //objectFactory.createObjectFromTopLeft("platform", 1170, 670, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("platform", 1170, 370, 10, 300, 0),
    objectFactory.createObjectFromTopLeft("platform", 1170, 290, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("platform", 1170, 130, 10, 150, 0),

    objectFactory.createObjectFromTopLeft("wood", 1155, 290, 15, 300, 0),
    objectFactory.createObjectFromTopLeft("wood", 1150, 130, 20, 150, 0),

    objectFactory.createObjectFromTopLeft("platform", 1140, 130, 10, 150, 0),
    objectFactory.createObjectFromTopLeft("platform", 1140, 370, 10, 300, 0),

    //left pillar
    objectFactory.createObjectFromTopLeft("platform", 1040, 370, 10, 300, 0),
    objectFactory.createObjectFromTopLeft("platform", 1010, 290, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("platform", 1040, 130, 10, 150, 0),

    objectFactory.createObjectFromTopLeft("wood", 1025, 290, 15, 300, 0),
    objectFactory.createObjectFromTopLeft("wood", 1020, 130, 20, 150, 0),

    objectFactory.createObjectFromTopLeft("platform", 1010, 130, 10, 150, 0),
    objectFactory.createObjectFromTopLeft("platform", 1010, 370, 10, 300, 0),

    objectFactory.createObjectFromTopLeft("platform", 710, 290, 20, 300, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("platform", 860, 210, 10, 80, 0),
    objectFactory.createObjectFromTopLeft("platform", 710, 405, 20, 300, 0.5 * Math.PI),
  ];
  level.misc = [
     ropeB,
     ropeC,
     Beamerbar
   ];
  level.objectsMovable = [
    //Lift right
    objectFactory.createObjectFromTopLeft("glass", 1155, 590, 10, 160, 0),

    //Lift left
    objectFactory.createObjectFromTopLeft("glass", 1025, 590, 10, 160, 0),

    //Lift center
    objectFactory.createObjectFromTopLeft("glass", 1020, 280, 10, 150, 0.5 * Math.PI),

    //Glass Barrier 1
    objectFactory.createObjectFromTopLeft("glass", 710, 210, 10, 80, 0),

    //Glass Barrier 2
    objectFactory.createObjectFromTopLeft("glass", 710, 310, 10, 85, 0),


    //Stack 0
    objectFactory.createObjectFromTopLeft("glass", 390, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 470, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 550, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 630, 670, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 390, 660, 10, 90, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 480, 660, 10, 80, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 560, 660, 10, 95, 0.5 * Math.PI),

    //Stack 1
    objectFactory.createObjectFromTopLeft("glass", 470, 580, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 550, 580, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 630, 580, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 470, 570, 10, 95, 0.5 * Math.PI),
    objectFactory.createObjectFromTopLeft("wood", 560, 570, 10, 95, 0.5 * Math.PI),

    //Stack 2
    objectFactory.createObjectFromTopLeft("glass", 550, 490, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("glass", 630, 490, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 550, 480, 10, 110, 0.5 * Math.PI),

    //Stack 3
    objectFactory.createObjectFromTopLeft("glass", 630, 400, 20, 80, 0),
    objectFactory.createObjectFromTopLeft("wood", 630, 390, 10, 110, 0.5 * Math.PI),
  ];

  level.targets = [
    objectFactory.createTarget(possibleTargets.pop(), 1095, 248),
    objectFactory.createTarget(possibleTargets.pop(), 410, 625),
    objectFactory.createTarget(possibleTargets.pop(), 950, 700),
    objectFactory.createTarget(possibleTargets.pop(), 950, 280),
    objectFactory.createTarget(possibleTargets.pop(), 950, 380),
    objectFactory.createTarget(possibleTargets.pop(), 360, 90),
  ];
  
  return level;
}

export { getLevel };
