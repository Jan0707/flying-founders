import * as Matter from "matter-js";
import { Level } from "../Level.ts";
import { settings } from "../settings.ts";
import { emitter } from "../../util/eventBus.ts";

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

  const engine = Engine.create({
    velocityIterations: 6,
  });

  const render = Render.create({
    element: targetElement,
    engine: engine,
    options: {
      wireframes: false,
      width: targetElement.clientWidth,
      height: targetElement.clientHeight,
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
    // Reset gravity before next shot (just in case strategy slinger skill is somehow still active)
    engine.gravity.scale = settings.engine.defaults.gravity;

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

  // Track target hits
  Matter.Events.on(engine, "afterUpdate", () => {
    const collisions = Detector.collisions(detector);
    if (collisions.length === 0) return;

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

  // Track hits on instantly breakable objects
  Matter.Events.on(engine, "afterUpdate", () => {
    const collisions = Detector.collisions(detector);
    if (collisions.length === 0) return;

    collisions.forEach((collision) => {
      if (
          collision.bodyA.plugin.lotum &&
          collision.bodyA.plugin.lotum.breakable === "instantly" &&
          collision.bodyB.speed >= settings.objects.instantBreakingSpeed

      ) {
        Composite.remove(engine.world, collision.bodyA);
        detector.bodies = detector.bodies.filter((body) => {
          return body !== collision.bodyA;
        });
      }
      if (
          collision.bodyB.plugin.lotum &&
          collision.bodyB.plugin.lotum.breakable === "instantly" &&
          collision.bodyA.speed >= settings.objects.instantBreakingSpeed
      ) {
        Composite.remove(engine.world, collision.bodyB);
        detector.bodies = detector.bodies.filter((body) => {
          return body !== collision.bodyB;
        });
      }
    });
  });

  // Tracks movement of eventually breakable objects
  Matter.Events.on(engine, "afterUpdate", () => {
    level.objectsMovable.forEach(function (object){
      if (object.plugin.lotum.breakable !== "eventually") return;
      if (object.speed >= settings.objects.eventuallyBreakingSpeedStart && !object.plugin.lotum.startedMoving) {
        object.plugin.lotum.startedMoving = true;
      }
      if (object.speed <= settings.objects.eventuallyBreakingSpeedStop && object.plugin.lotum.startedMoving) {
        Composite.remove(engine.world,object);
      }
    });
  });

  // Re-Enables gravity after hit
  Matter.Events.on(engine, "afterUpdate", () => {
    // If ball is at rest but gravity is still 0, reset it
    if (currentBall.speed < 0.1 && engine.gravity.scale == 0) {
      engine.gravity.scale = settings.engine.defaults.gravity;
    }

    // If gravity is normal, do nothing
    if (engine.gravity.scale > 0) return;

    const collisions = Detector.collisions(detector);
    if (collisions.length === 0) return;

    // If we hit something while gravity is 0, reset it.
    collisions.forEach((collision) => {
      if (collision.bodyA === currentBall || collision.bodyB === currentBall) {
        engine.gravity.scale = settings.engine.defaults.gravity;
      }
    });
  });

  Matter.Events.on(mouseConstraint, "mousedown", function () {
    // When the mouse is down, set the objects to static to prevent dragging
    level.objectsMovable
      .concat(level.targets)
      .forEach((object) => Matter.Body.setStatic(object, true));

    emitter.emit("canvasClicked");
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
        console.log("Triggered skill: Power Patron");
        Body.setSpeed(currentBall, currentBall.speed * 5);
      },
      strategySlinger: () => {
        console.log("Triggered skill: Strategy Slinger");
        engine.gravity.scale = 0;
        console.log(engine.gravity);

      },
    },
  };
}
