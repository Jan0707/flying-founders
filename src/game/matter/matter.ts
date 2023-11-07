import * as Matter from "matter-js";
import { Level } from "../Level.ts";

export class LevelEvent {
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

  let ball = level.ballFactory.getBall();

  const sling = Constraint.create({
    pointA: {
      x: level.slingPosition.x,
      y: level.slingPosition.y,
    },
    bodyB: ball,
    stiffness: 0.05,
    length: 0.5,
    render: {
      visible: false,
    },
  });

  const detector = Detector.create({
    bodies: level.objectsMovable.concat(level.targets).concat([ball]),
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
    if (event.body === ball) {
      isFired = true;
      eventHandler(new LevelEvent("fired"));
    }
  });

  Matter.Events.on(engine, "afterUpdate", () => {
    if (!isFired) return;

    const distanceX = Math.abs(ball.position.x - level.slingPosition.x);
    const distanceY = Math.abs(ball.position.y - level.slingPosition.y);
    const minDistance = 5;

    if (!(distanceX <= minDistance && distanceY <= minDistance)) return;

    if (level.ballFactory?.getRemainingShots() === 0) {
      sling.bodyB = null;
      return;
    }

    ball = level.ballFactory?.getBall();

    sling.bodyB = ball;
    isFired = false;

    detector.bodies.push(ball);

    Composite.add(engine.world, [ball]);
  });

  Matter.Events.on(engine, "afterUpdate", (event) => {
    const collisions = Detector.collisions(detector);

    if (collisions.length === 0) return;

    console.log(collisions);

    collisions.forEach((collision) => {
      const bodyATarget = level.targets.indexOf(collision.bodyA);
      const bodyBTarget = level.targets.indexOf(collision.bodyB);

      if (bodyATarget >= 0 || bodyBTarget >= 0) {
        console.log("HIT");
        console.log(Math.max(bodyATarget, bodyBTarget));
        console.log(level.targets);

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

  Composite.add(engine.world, [ball, sling, mouseConstraint]);
}
