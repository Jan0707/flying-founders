<script setup lang="ts">
import { onMounted } from 'vue'

import * as Matter from 'matter-js';

defineProps<{ }>()

// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Detector = Matter.Detector;

// create an engine
var engine = Engine.create();


onMounted(() => {

// create a renderer
  var render = Render.create({
    element: document.getElementById('world'),
    engine: engine,
    options: {
      wireframes: false
    }
  });

// run the renderer
  Render.run(render);

// create runner
  var runner = Runner.create();

// run the engine
  Runner.run(runner, engine);

// create two boxes and a ground
  var targetA = Bodies.rectangle(700, 540, 80, 80, {
    render: {
      sprite: {
        texture: '/jan.png',
        xScale: 0.2,
        yScale: 0.2,
      }
    }

  });
  var wallA = Bodies.rectangle(450, 540, 20, 100);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  const ballPosition = {
    x: 100,
    y: 500
  };

  let isFired = false;

  let ball = Bodies.circle(ballPosition.x, ballPosition.y, 20, {
    render: {
      sprite: {
        texture: '/dominik.png',
        xScale: 0.10,
        yScale: 0.10,
      }
    }
  });
  let sling = Constraint.create({
    pointA: {
      x: ballPosition.x,
      y: ballPosition.y
    },
    bodyB: ball,
    stiffness: 0.05,
    length: 0.5,
    render: {
      visible: false,
    }

  })

  let detector = Detector.create({
    bodies: [
      targetA,
      wallA,
      ball,
    ]
  });

  let slingMouseConstraint = MouseConstraint.create(engine, {
    mouse: Matter.Mouse.create(render.canvas),
    constraint: {
      render: {
        visible: false
      }
    }
  })

  Matter.Events.on(slingMouseConstraint, 'enddrag', (event) => {
    if (event.body === ball) {
      isFired = true;
    }
  });

  Matter.Events.on(engine, 'afterUpdate', (event) => {
    if (!isFired) return;

    let distanceX = Math.abs(ball.position.x - ballPosition.x);
    let distanceY = Math.abs(ball.position.y - ballPosition.y);
    let minDistance = 5;

    if (!(distanceX <= minDistance && distanceY <= minDistance)) return;

    ball = Bodies.circle(ballPosition.x, ballPosition.y, 20, {
      render: {
        sprite: {
          texture: '/dominik.png',
          xScale: 0.10,
          yScale: 0.10,
        }
      }
    });
    sling.bodyB = ball;
    isFired = false;

    detector.bodies.push(ball);

    Composite.add(engine.world, [ball]);
  });

  Matter.Events.on(engine, 'afterUpdate', (event) => {
    const collisions = Detector.collisions(detector);

    if (collisions.length === 0) return;

    console.log(collisions);

    collisions.forEach((collision) => {
      if (
          (collision.bodyA === targetA || collision.bodyB === targetA)
      ) {
        console.log('HIT');
        detector.bodies = [];
        Composite.remove(engine.world, targetA);
      }
    });
  });

// add all of the bodies to the world
  Composite.add(engine.world, [targetA, wallA, ground]);

// add all of the bodies to the world
  Composite.add(engine.world, [ball, sling, slingMouseConstraint]);})

</script>

<template>
  <div id="world"></div>
</template>

<style scoped>
</style>
