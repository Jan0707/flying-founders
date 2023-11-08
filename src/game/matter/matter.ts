import * as Matter from "matter-js";
import { Level } from "../Level.ts";
import { settings } from "../settings.ts";

export class LevelEvent {
  static readonly EVENT_FIRED = "fired";
  static readonly EVENT_HIT = "hit";
  static readonly EVENT_STOPPED = "stopped";
  static readonly EVENT_UPDATE_FOUNDER = "update_founder";

  name: string;
  payload: {};
  constructor(name: string, payload: object = {}) {
    this.name = name;
    this.payload = payload;
  }
}

export function createLevel(
  targetElement: HTMLElement,
  level: Level,
  eventHandler: (event: LevelEvent) => void,
) {
  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Detector = Matter.Detector;

  const engine = Engine.create();

  const render = Render.create({
    element: targetElement,
    engine: engine,
    options: {
      wireframes: false,
    },
  });

  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  Composite.add(engine.world, level.getAllBodies());

  let isFired = false;
  let currentBall = level.ballFactory.getBall();
  eventHandler(
    new LevelEvent(LevelEvent.EVENT_UPDATE_FOUNDER, {
      name: currentBall.plugin.lotum.name,
    }),
  );

  const sling = Constraint.create({
    pointA: {
      x: level.slingPosition.x,
      y: level.slingPosition.y,
    },
    bodyB: currentBall,
    stiffness: settings.sling.stiffness,
    length: settings.sling.length,
    render: {
      visible: false,
    },
  });

  const detector = Detector.create({
    bodies: level.objectsMovable.concat(level.targets).concat([currentBall]),
  });

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: Matter.Mouse.create(render.canvas),
    constraint: {
      render: {
        visible: false,
      },
    },
  });

  Matter.Events.on(mouseConstraint, "enddrag", (event) => {
    if (event.body === currentBall) {
      isFired = true;
      eventHandler(new LevelEvent(LevelEvent.EVENT_FIRED));
    }
  });

  Matter.Events.on(engine, "afterUpdate", () => {
    if (!isFired) return;
    if (currentBall.speed >= settings.ball.speedAtRest) return;

    eventHandler(new LevelEvent(LevelEvent.EVENT_STOPPED));
    console.log("Stopped");

    if (level.ballFactory?.getRemainingShots() === 0) {
      eventHandler(
        new LevelEvent(LevelEvent.EVENT_UPDATE_FOUNDER, { name: null }),
      );
      sling.bodyB = null;
      return;
    }

    currentBall = level.ballFactory?.getBall();
    eventHandler(
      new LevelEvent(LevelEvent.EVENT_UPDATE_FOUNDER, {
        name: currentBall.plugin.lotum.name,
      }),
    );

    sling.bodyB = currentBall;
    isFired = false;

    detector.bodies.push(currentBall);

    Composite.add(engine.world, [currentBall]);
  });

  Matter.Events.on(engine, "afterUpdate", () => {
    if (currentBall.position.y < 1000) return;
    Composite.remove(engine.world, currentBall);
    eventHandler(new LevelEvent(LevelEvent.EVENT_STOPPED));

    if (level.ballFactory?.getRemainingShots() === 0) return;

    currentBall = level.ballFactory?.getBall();

    sling.bodyB = currentBall;
    isFired = false;

    detector.bodies.push(currentBall);

    Composite.add(engine.world, [currentBall]);
  });

  Matter.Events.on(engine, "afterUpdate", () => {
    if (!isFired) return;

    const distanceX = Math.abs(currentBall.position.x - level.slingPosition.x);
    const distanceY = Math.abs(currentBall.position.y - level.slingPosition.y);
    const minDistance = settings.sling.minimalDistanceToRelease;

    if (!(distanceX <= minDistance && distanceY <= minDistance)) return;

    sling.bodyB = null;
    return;
  });

  Matter.Events.on(engine, "afterUpdate", () => {
    const collisions = Detector.collisions(detector);

    if (collisions.length === 0) return;

    console.log(collisions);

    collisions.forEach((collision) => {
      const bodyATarget = level.targets.indexOf(collision.bodyA);
      const bodyBTarget = level.targets.indexOf(collision.bodyB);

      if (bodyATarget >= 0 || bodyBTarget >= 0) {
        eventHandler(new LevelEvent(LevelEvent.EVENT_HIT));

        const targetToRemove =
          level.targets[Math.max(bodyATarget, bodyBTarget)];

        Composite.remove(engine.world, targetToRemove);

        detector.bodies = detector.bodies.filter((body) => {
          return body !== targetToRemove;
        });
      }
    });
  });

  Matter.Events.on(mouseConstraint, "mousedown", function () {
    // When the mouse is down, set the objects to static to prevent dragging
    level.objectsMovable
      .concat(level.targets)
      .forEach((object) => Matter.Body.setStatic(object, true));
  });

  Matter.Events.on(mouseConstraint, "mouseup", function () {
    // When the mouse is up, set the object back to not static to enable physics interaction and collision
    level.objectsMovable
      .concat(level.targets)
      .forEach((object) => Matter.Body.setStatic(object, false));
  });

  Composite.add(engine.world, [currentBall, sling, mouseConstraint]);

  return {
    skills: {
      powerPatron: () => {
        Body.setSpeed(currentBall, currentBall.speed * 5);
      },
    },
  };
}
