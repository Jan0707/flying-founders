import { Level } from "../Level.ts";
import { settings } from "../settings.ts";
import {
  Bodies,
  Body,
  Composite,
  Constraint,
  Detector,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";
import teabagImage from "../../assets/objects/teabag_300_300.png";
import { Founder } from "../Founders.ts";
import { Target } from "../../util/Target.ts";
import { playSound } from "../../SoundSystem.ts";
import { when } from "../../util/when.ts";
import { emitter } from "../../util/eventBus.ts";
import * as Matter from "matter-js";

export abstract class LevelEvent {
  readonly name: "fired" | "hit" | "stopped" | "update_founder";

  protected constructor(name: LevelEvent["name"]) {
    this.name = name;
  }
}

export class LevelEventUpdateFounder extends LevelEvent {
  override readonly name = "update_founder";

  constructor(readonly founder: Founder) {
    super("update_founder");
  }
}

export class LevelEventFired extends LevelEvent {
  override readonly name = "fired";

  constructor() {
    super("fired");
  }
}

export class LevelEventHit extends LevelEvent {
  override readonly name = "hit";

  constructor(readonly target: Target) {
    super("hit");
  }
}

export class LevelEventStopped extends LevelEvent {
  override readonly name = "stopped";

  constructor() {
    super("stopped");
  }
}

export function createLevel(
  targetElement: HTMLElement,
  level: Level,
  eventHandler: (event: LevelEvent) => void,
) {
  const engine = Engine.create({
    velocityIterations: 6,
    //enableSleeping: true,
    gravity: {
      scale: level.idx < 5 ? settings.engine.defaults.gravity : 0.0005,
    },
  });

  const render = Render.create({
    element: targetElement,
    engine: engine,
    options: {
      wireframes: false,
      width: targetElement.clientWidth,
      height: targetElement.clientHeight,
      background: "transparent",
    },
  });

  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  Composite.add(engine.world, level.getAllBodies());
  Composite.add(engine.world, level.composites);

  let isFired = false;
  let currentBall = level.ballFactory.getBall();
  eventHandler(new LevelEventUpdateFounder(currentBall.plugin.lotum.founder));

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
      lineWidth: 5,
      strokeStyle: "#FF0000",
    },
  });

  const detector = Detector.create({
    bodies: level.objectsMovable.concat(level.targets).concat([currentBall]),
  });

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
    constraint: {
      render: {
        visible: false,
      },
    },
  });

  function createExplosion(engine: Engine, origin: Body, force: number) {
    console.log("Running explosion");
    const bodies = Composite.allBodies(engine.world);
    // Loop over all the bodies and calculate the distance between them and the origin
    bodies.forEach((body) => {
      if (
        body != origin &&
        Math.abs(origin.position.y - body.position.y) < 300 &&
        Math.abs(origin.position.x - body.position.x) < 300
      ) {
        const forceMagnitude = force * body.mass;
        Body.applyForce(body, body.position, {
          x: Math.min(
            (1 / (body.position.x - origin.position.x)) * forceMagnitude,
            0.025,
          ),
          y: Math.min(
            (1 / (body.position.y - origin.position.y)) * forceMagnitude,
            0.025,
          ),
        });
      }
    });

    playSound("smallExplosion");
    playSound("bells");
  }

  function createTeabag(engine: Engine, positionX: number, positionY: number) {
    const teabag = Bodies.circle(positionX, positionY, 10, {
      render: {
        sprite: {
          texture: teabagImage,
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    });
    teabag.plugin = {
      lotum: {
        breakable: "instant",
      },
    };
    // Add teabag to world
    Composite.add(engine.world, teabag);
    detector.bodies.push(teabag);

    // Add an explosion to the teabags that happen after 1 second
    setTimeout(() => {
      // Let the teabags disappear
      createExplosion(engine, teabag, 0.4);
      Composite.remove(engine.world, teabag);
    }, 1000);
  }

  function setNewFounder() {
    removeOldFounder();
    console.log("placing new founder");
    currentBall = level.ballFactory.getBall();

    sling.bodyB = currentBall;
    isFired = false;

    detector.bodies.push(currentBall);
    Composite.add(engine.world, currentBall);

    eventHandler(new LevelEventUpdateFounder(currentBall.plugin.lotum.founder));
  }

  function removeOldFounder() {
    console.log("deleting old founder");
    Composite.remove(engine.world, currentBall);
    detector.bodies = detector.bodies.filter((body) => {
      return body !== currentBall;
    });
  }

  function removeTarget(target: Body) {
    eventHandler(new LevelEventHit(target.plugin.lotum.target));

    level.removeBody(target);
    Composite.remove(engine.world, target);

    detector.bodies = detector.bodies.filter((body) => {
      return body !== target;
    });
  }

  Events.on(mouseConstraint, "enddrag", (event) => {
    if ("body" in event && event.body === currentBall) {
      isFired = true;
      eventHandler(new LevelEventFired());
    }
  });

  // changes founders when coming to rest
  Events.on(engine, "afterUpdate", () => {
    if (!isFired) return;
    if (currentBall.speed >= settings.ball.speedAtRest) return;

    eventHandler(new LevelEventStopped());

    setNewFounder();
  });

  // out of bounds checks
  Events.on(engine, "afterUpdate", () => {
    if (level.idx >= 5) return;

    onOutOfBounds(currentBall, () => {
      console.log("Founder out of bounds", currentBall.position);

      Composite.remove(engine.world, currentBall);
      eventHandler(new LevelEventStopped());

      setNewFounder();

      // Reset gravity before next shot (just in case strategy slinger skill is somehow still active)
      engine.gravity.scale = settings.engine.defaults.gravity;
    });

    level.targets.forEach((target) => {
      onOutOfBounds(target, () => {
        console.log("Target out of bounds", target.position);
        removeTarget(target);
      });
    });

    function onOutOfBounds(body: Body, callback: () => void) {
      const { x, y } = body.position;
      if (y < -300 || x < 0 || x > 1200 || y > 1000) {
        callback();
      }
    }
  });

  Events.on(engine, "afterUpdate", () => {
    if (!isFired) return;

    const distanceX = Math.abs(currentBall.position.x - level.slingPosition.x);
    const distanceY = Math.abs(currentBall.position.y - level.slingPosition.y);
    const minDistance = settings.sling.minimalDistanceToRelease;

    if (!(distanceX <= minDistance && distanceY <= minDistance)) return;

    sling.bodyB = null;
    return;
  });

  // Track target hits
  Events.on(engine, "afterUpdate", () => {
    const collisions = Detector.collisions(detector);
    if (collisions.length === 0) return;

    collisions.forEach((collision) => {
      const targetHit =
        level.targets.find((b) => b === collision.bodyA) ??
        level.targets.find((b) => b === collision.bodyB);
      if (!targetHit) return;

      if (
        collision.bodyA.speed <= settings.targets.minimalSpeedToHit &&
        collision.bodyB.speed <= settings.targets.minimalSpeedToHit
      ) {
        return;
      }

      console.log(
        "Target hit",
        targetHit.plugin.lotum.target,
        targetHit.plugin.lotum.target.name,
      );

      removeTarget(targetHit);
    });
  });

  // Track hits on instantly breakable objects
  Events.on(engine, "afterUpdate", () => {
    const collisions = Detector.collisions(detector);
    if (collisions.length === 0) return;

    collisions.forEach((collision) => {
      if (
        collision.bodyA.plugin.lotum &&
        collision.bodyA.plugin.lotum.breakable === "instantly" &&
        collision.bodyB.speed >= settings.objects.instantBreakingSpeed
      ) {
        level.removeBody(collision.bodyA);
        Composite.remove(engine.world, collision.bodyA);
        detector.bodies = detector.bodies.filter((body) => {
          return body !== collision.bodyA;
        });

        when(collision.bodyA.plugin.lotum.type)({
          glass: () => playSound("breakingGlass"),
          wood: () => playSound("bonkWood"),
        });
      }
      if (
        collision.bodyB.plugin.lotum &&
        collision.bodyB.plugin.lotum.breakable === "instantly" &&
        collision.bodyA.speed >= settings.objects.instantBreakingSpeed
      ) {
        level.removeBody(collision.bodyB);
        Composite.remove(engine.world, collision.bodyB);
        detector.bodies = detector.bodies.filter((body) => {
          return body !== collision.bodyB;
        });

        when(collision.bodyB.plugin.lotum.type)({
          glass: () => playSound("breakingGlass"),
          wood: () => playSound("bonkWood"),
        });
      }
    });
  });

  // Tracks movement of eventually breakable objects
  Events.on(engine, "afterUpdate", () => {
    level.objectsMovable.forEach(function (object) {
      if (object.plugin.lotum.explodable && object.speed >= 3) {
        createExplosion(engine, object, 1);
        level.removeBody(object);
        Composite.remove(engine.world, object);
      }

      if (object.plugin.lotum.breakable !== "eventually") return;

      if (
        "speed" in object &&
        object.speed >= settings.objects.eventuallyBreakingSpeedStart &&
        !object.plugin.lotum.startedMoving
      ) {
        object.plugin.lotum.startedMoving = true;
      }
      if (
        "speed" in object &&
        object.speed <= settings.objects.eventuallyBreakingSpeedStop &&
        object.plugin.lotum.startedMoving
      ) {
        if (object.plugin.lotum.explodable) {
          createExplosion(engine, object, 1);
        }
        level.removeBody(object);
        Composite.remove(engine.world, object);
      }
    });
  });

  // Re-Enables gravity after hit
  Events.on(engine, "afterUpdate", () => {
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
    emitter.emit("canvasClicked");
  });

  Composite.add(engine.world, [currentBall, sling, mouseConstraint]);

  return {
    skills: {
      powerPatron: () => {
        console.log("Triggered skill: Power Patron");
        Body.setSpeed(currentBall, 40);
        playSound("wooDominik");
      },
      strategySlinger: () => {
        console.log("Triggered skill: Strategy Slinger");
        playSound("allrightyright");
        // Create Teabags
        createTeabag(
          engine,
          currentBall.position.x - 10,
          currentBall.position.y + 20,
        );
        createTeabag(
          engine,
          currentBall.position.x + 10,
          currentBall.position.y + 20,
        );

        // Imitate a jump of the ball by changing the direction of the ball to a slight upwards angle
        Body.setVelocity(currentBall, { x: 10, y: -10 });
      },
      explodingLaugh: () => {
        console.log("Triggered skill: exploding Laugh");
        createExplosion(engine, currentBall, 1.5);
        playSound("laughSebastian");
      },
    },
  };
}
