import * as Matter from "matter-js";

import {Level} from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";
import {Target} from "../../util/Target.ts";

import LEVEL_BACKGROUND from "./../../assets/levels/level_1.jpg";

const Constraint = Matter.Constraint;

function getLevel(): Level {

    const targets = [
        new Target({x: 810, y: 720}),
        new Target({x: 900, y: 720}),
        new Target({x: 975, y: 550}),
        new Target({x: 848, y: 90}),
    ]

    const level = new Level(LEVEL_BACKGROUND, targets)

    level.objectsStatic = [
        //ground
        objectFactory.createObjectFromTopLeft("ground", 0, 750, 1180, 70, 0),

        //top left pillar
        objectFactory.createObjectFromTopLeft("platform", 480, 0, 10, 300, 0),

        objectFactory.createObjectFromTopLeft("platform", 510, 0, 10, 300, 0),
        objectFactory.createObjectFromTopLeft("platform", 480, 300, 10, 40, 0.5 * Math.PI),

        //bottom left pillar
        objectFactory.createObjectFromTopLeft("platform", 480, 550, 10, 200, 0),
        objectFactory.createObjectFromTopLeft("platform", 510, 550, 10, 200, 0),
        objectFactory.createObjectFromTopLeft("platform", 480, 540, 10, 40, 0.5 * Math.PI),

        //ceiling light
        //objectFactory.createObjectFromTopLeft("platform", 780, 110, 20, 150, 0.5 * Math.PI),

        //top right pillar
        objectFactory.createObjectFromTopLeft("platform", 1130, 0, 10, 300, 0),

        objectFactory.createObjectFromTopLeft("platform", 1160, 0, 10, 300, 0),
        objectFactory.createObjectFromTopLeft("platform", 1130, 300, 10, 40, 0.5 * Math.PI),


        //bottom right pillar
        objectFactory.createObjectFromTopLeft("platform", 1130, 450, 10, 300, 0),

        objectFactory.createObjectFromTopLeft("platform", 1160, 450, 10, 300, 0),
        objectFactory.createObjectFromTopLeft("platform", 1130, 440, 10, 40, 0.5 * Math.PI),
    ]

    const Beamerbar = objectFactory.createObjectFromTopLeft("wood", 765, 112, 180, 10, 0);

    //var group = Body.nextGroup(true);
    let ropeC = Matter.Composites.stack(775, 50, 1, 3, 5, 5, function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 5, 25/*, { collisionFilter: { group: group } }*/);
    });
    Matter.Composites.chain(ropeC, 0, 0.5, 0, -0.5, {stiffness: 1, damping: 0.1});
    Matter.Composite.add(ropeC, Constraint.create({
        bodyB: ropeC.bodies[0],
        pointB: {x: 0, y: -5},
        pointA: {x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y - 5},
        /*stiffness: 1.0,*/  damping: 0.1
    }));
    let ropeB = Matter.Composites.stack(935, 50, 1, 3, 5, 5, function (x: number, y: number) {
        return Matter.Bodies.rectangle(x, y, 5, 25);
    });
    Matter.Composites.chain(ropeB, 0, 0.5, 0, -0.5, {stiffness: 1, damping: 0.1});
    ropeB = Matter.Composite.add(ropeB, Constraint.create({
        bodyB: ropeB.bodies[0],
        pointB: {x: 0, y: -5},
        pointA: {x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y - 5},
        /*stiffness: 1.0,*/ damping: 0.1
    }));


    ropeB = Matter.Composite.add(ropeB, Constraint.create({
        bodyB: ropeB.bodies[2],
        pointB: {x: 0, y: 5},
        bodyA: Beamerbar,
        pointA: {x: +80, y: 0},
        /*stiffness: 1.0,*/ damping: 0.1
    }));

    ropeC = Matter.Composite.add(ropeC, Constraint.create({
        bodyB: ropeC.bodies[2],
        pointB: {x: 0, y: 5},
        bodyA: Beamerbar,
        pointA: {x: -80, y: 0},
        /*stiffness: 1.0,*/ damping: 0.1
    }));

    level.misc = [
        ropeB,
        ropeC,
        Beamerbar
    ]

    level.objectsMovable = [
        objectFactory.createObjectFromTopLeft("wood", 1140, 0, 20, 300, 0),//top right pillar
        objectFactory.createObjectFromTopLeft("wood", 490, 550, 20, 200, 0),//bottom left pillar
        objectFactory.createObjectFromTopLeft("wood", 490, 0, 20, 300, 0),//top left pillar
        objectFactory.createObjectFromTopLeft("wood", 1140, 450, 20, 300, 0),//bottom right pillar

        //glass left
        objectFactory.createObjectFromTopLeft("glass", 495, 310, 10, 230, 0),

        //glas right
        objectFactory.createObjectFromTopLeft("glass", 1145, 310, 10, 130, 0),

        //table
        objectFactory.createObjectFromTopLeft("wood", 700, 580, 20, 300, 0.5 * Math.PI), //table top
        objectFactory.createObjectFromTopLeft("wood", 730, 600, 20, 150, 0), //table leg left
        objectFactory.createObjectFromTopLeft("wood", 960, 600, 20, 150, 0), //table leg right
    ]

    return level;
}

export {getLevel};
