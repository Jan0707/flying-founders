<script setup lang="ts">
import {onMounted} from 'vue'

import * as Matter from 'matter-js';

import {levelProvider} from "../game/levelProvider.ts";

console.log(levelProvider);

const props = defineProps<{levelName: string}>()

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Detector = Matter.Detector;

var engine = Engine.create();

onMounted(() => {
  const level = levelProvider.getLevelByName(props.levelName);

  const render = Render.create({
    element: document.getElementById('world'),
    engine: engine,
    options: {
      wireframes: false
    }
  });

  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  Composite.add(engine.world, level.getAllBodies());

  let isFired = false;

  let ball = Bodies.circle(level.slingPosition.x, level.slingPosition.y, 20, {
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
      x: level.slingPosition.x,
      y: level.slingPosition.y,
    },
    bodyB: ball,
    stiffness: 0.05,
    length: 0.5,
    render: {
      visible: false,
    }

  })

  let detector = Detector.create({
    bodies: level.objectsMovable.concat(level.targets).concat([ball])
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

  Matter.Events.on(engine, 'afterUpdate', () => {
    if (!isFired) return;

    let distanceX = Math.abs(ball.position.x - level.slingPosition.x);
    let distanceY = Math.abs(ball.position.y - level.slingPosition.y);
    let minDistance = 5;

    if (!(distanceX <= minDistance && distanceY <= minDistance)) return;

    ball = Bodies.circle(level.slingPosition.x, level.slingPosition.y, 20, {
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

      const bodyATarget = level.targets.indexOf(collision.bodyA);
      const bodyBTarget = level.targets.indexOf(collision.bodyB);

      if (
          bodyATarget >= 0 || bodyBTarget >= 0
      ) {
        console.log('HIT');
        console.log(Math.max(bodyATarget, bodyBTarget));
        console.log(level.targets);

        const targetToRemove = level.targets[
            Math.max(bodyATarget, bodyBTarget)
            ];

        Composite.remove(engine.world, targetToRemove);

        detector.bodies = detector.bodies.filter((body) => {
          return body !== targetToRemove;
        });
      }
    });
  });

  Composite.add(engine.world, [ball, sling, slingMouseConstraint]);
})

</script>

<template>
  <div id="world"></div>
</template>

<style scoped>
</style>
