import {Level} from "../level.ts";

import * as Matter from 'matter-js';
const Bodies = Matter.Bodies;

const level = new Level();
level.name = "1";
level.slingPosition = {x: 100, y: 500};

level.setStockpile([
    'dominik',
    'jens',
    'dominik',
    'jens',
]);

var wallA = Bodies.rectangle(450, 540, 20, 100);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var platform = Bodies.rectangle(600, 300, 200, 20, { isStatic: true });

var targetA = Bodies.rectangle(700, 540, 80, 80, {
    render: {
        sprite: {
            texture: '/jan.png',
            xScale: 0.2,
            yScale: 0.2,
        }
    }

});
var targetB = Bodies.rectangle(580, 250, 80, 80, {
    render: {
        sprite: {
            texture: '/jan.png',
            xScale: 0.2,
            yScale: 0.2,
        }
    }

});


level.objectsStatic = [
    ground,
    platform
];

level.objectsMovable = [
    wallA,
];

level.targets = [
    targetA,
    targetB,
];

export {level}
