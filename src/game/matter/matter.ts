import {Level} from "../Level.ts";
import {settings} from "../settings.ts";
import {
    Bodies,
    Body,
    Composite,
    Constraint,
    Detector,
    Engine,
    Mouse,
    MouseConstraint,
    Render,
    Runner,
    Events,
} from "matter-js";

export class LevelEvent {
    static readonly EVENT_FIRED = "fired";
    static readonly EVENT_HIT = "hit";
    static readonly EVENT_STOPPED = "stopped";
    static readonly EVENT_UPDATE_FOUNDER = "update_founder";

    name: string;
    payload: object;

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

    const engine = Engine.create({
        velocityIterations: 6,
        //enableSleeping: true,
        gravity: {
            scale: settings.engine.defaults.gravity,
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
    Composite.add(engine.world, level.composites)

    let isFired = false;
    let currentBall = level.ballFactory.getBall();
    eventHandler(
        new LevelEvent(LevelEvent.EVENT_UPDATE_FOUNDER, {
            name: currentBall.plugin.lotum.founder.name,
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
            lineWidth: 5,
            strokeStyle: '#FF0000'
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
            if (body != origin && Math.abs(origin.position.y - body.position.y) < 300 && Math.abs(origin.position.x - body.position.x) < 300) {
                const forceMagnitude = force * body.mass;
                Body.applyForce(body, body.position, {
                    x: Math.min((1 / (body.position.x - origin.position.x) * forceMagnitude), 0.025),
                    y: Math.min((1 / (body.position.y - origin.position.y) * forceMagnitude), 0.025)
                });
            }
        });
    }

    function createTeabag(engine: Engine, positionX: number, positionY: number) {
        const teabag = Bodies.circle(positionX, positionY, 10, {
            render: {
                sprite: {
                    texture: "src/assets/objects/teabag_300_300.png",
                    xScale: 0.1,
                    yScale: 0.1,
                }
            },
        });
        teabag.plugin = {
            lotum: {
                breakable: "instant",
            }
        }
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

    Events.on(mouseConstraint, "enddrag", (event) => {
        if ('body' in event && event.body === currentBall) {
            isFired = true;
            eventHandler(new LevelEvent(LevelEvent.EVENT_FIRED));
        }
    });

    Events.on(engine, "afterUpdate", () => {
        if (!isFired) return;
        if (currentBall.speed >= settings.ball.speedAtRest) return;

        eventHandler(new LevelEvent(LevelEvent.EVENT_STOPPED));

        currentBall = level.ballFactory.getBall();
        eventHandler(
            new LevelEvent(LevelEvent.EVENT_UPDATE_FOUNDER, {
                name: currentBall.plugin.lotum.founder.name,
            }),
        );

        sling.bodyB = currentBall;
        isFired = false;


        detector.bodies.push(currentBall);

        Composite.add(engine.world, [currentBall]);
    });

    Events.on(engine, "afterUpdate", () => {
        if (currentBall.position.y < 1000) return;
        Composite.remove(engine.world, currentBall);
        eventHandler(new LevelEvent(LevelEvent.EVENT_STOPPED));

        currentBall = level.ballFactory?.getBall();

        sling.bodyB = currentBall;
        isFired = false;

        // Reset gravity before next shot (just in case strategy slinger skill is somehow still active)
        engine.gravity.scale = settings.engine.defaults.gravity;

        detector.bodies.push(currentBall);

        Composite.add(engine.world, [currentBall]);
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
            const bodyATarget = level.targets.indexOf(collision.bodyA);
            const bodyBTarget = level.targets.indexOf(collision.bodyB);

            if (bodyATarget >= 0 || bodyBTarget >= 0) {
                if (collision.bodyA.speed <= settings.targets.minimalSpeedToHit && collision.bodyB.speed <= settings.targets.minimalSpeedToHit) {
                    return;
                }

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
    Events.on(engine, "afterUpdate", () => {
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
    Events.on(engine, "afterUpdate", () => {
        level.objectsMovable.forEach(function (object) {
            if (object.plugin.lotum.breakable !== "eventually") return;

            if ('speed' in object && object.speed >= settings.objects.eventuallyBreakingSpeedStart && !object.plugin.lotum.startedMoving) {
                object.plugin.lotum.startedMoving = true;
            }
            if ('speed' in object && object.speed <= settings.objects.eventuallyBreakingSpeedStop && object.plugin.lotum.startedMoving) {
                if (object.plugin.lotum.explodable == true) {
                    createExplosion(engine, object, 1);
                }
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
//Commented because it causes crash when combined with beamer. Can we limit it to less objects?
    // Matter.Events.on(mouseConstraint, "mousedown", function () {
    //   // When the mouse is down, set the objects to static to prevent dragging
    //   level.objectsMovable
    //     .concat(level.targets)
    //     .forEach((object) => Matter.Body.setStatic(object, true));

    //   emitter.emit("canvasClicked");
    // });

    // Matter.Events.on(mouseConstraint, "mouseup", function () {
    //   // When the mouse is up, set the object back to not static to enable physics interaction and collision
    //   level.objectsMovable
    //     .concat(level.targets)
    //     .forEach((object) => Matter.Body.setStatic(object, false));
    // });

    // an example of using mouse events on a mouse
    Events.on(mouseConstraint, 'startdrag', function (event) {
        console.log('startdrag', event);
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
                // Create Teabags
                createTeabag(engine, currentBall.position.x - 10, currentBall.position.y + 20);
                createTeabag(engine, currentBall.position.x + 10, currentBall.position.y + 20);

                // Imitate a jump of the ball by changing the direction of the ball to a slight upwards angle
                Body.setVelocity(currentBall, {x: 10, y: -10});

            },
            explodingLaugh: () => {
                console.log("Triggered skill: exploding Laugh");
                createExplosion(engine, currentBall, 1.5);
            }
        },
    };
}
