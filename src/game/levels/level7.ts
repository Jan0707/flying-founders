import {Level} from "../Level.ts";
import objectFactory from "../ObjectFactory.ts";

import {settings} from "../settings.ts";

import STAIRS_100_1000 from "./../../assets/objects/stairs_100_1000.png";
import LOTUM_BANNER_346_102 from "./../../assets/objects/lotum_banner_346_102.svg";
import LEVEL_BACKGROUND from "./../../assets/levels/credit_background.jpg";
import SZ_DEVELOPMENT_342_129 from "./../../assets/objects/sz_development_342_129.png";
import {Target, TargetName} from "../../util/Target.ts";
import {Bodies, Composite, Composites} from "matter-js";

function getLevel(): Level {
    const contributors: TargetName[] = [
        "Sven",
        "Julian",
        "Jan_G",
        "Wessel",
        "Anton",
        "Richard",
        "Dave"
    ]
    const targets = contributors.map((c) => new Target({
        x: Math.floor(Math.random() * 50) + 180,
        y: Math.floor(Math.random() * 400) - 1000
    }, c))
    const level = new Level(7, LEVEL_BACKGROUND, targets, {x: 1500, y: 1500});

    settings.targets.minimalSpeedToHit = 100;
    settings.objects.eventuallyBreakingSpeedStart = 100;
    settings.objects.instantBreakingSpeed = 100;

    // Define the number of steps
    const stairCount = 35;

    // Loop to create each step
    const stairstack = Composites.stack(0, 0, stairCount, 2, 0, 0, function (x, y, column) {
        return Bodies.rectangle(x - 66, y + column * stairCount, 100, 1000, {
            isStatic: true, friction: 0.01, frictionstatic: 0,
            render: {
                sprite: {
                    texture: STAIRS_100_1000 // Provide the correct path to your texture image here
                }
            }
        });
    });

    const lotumbanner = Bodies.rectangle(175, 700, 346, 102, {
        isStatic: true,
        render: {
            sprite: {
                texture: LOTUM_BANNER_346_102 // Stelle sicher, dass dies ein gültiger Pfad/URL ist
            }
        }
    });

    const lotumbannercomposite = Composite.create({
        bodies: [lotumbanner] // Füge den Körper der Composite hinzu
    });


    const Schriftzug_Development = Bodies.rectangle(170, -700, 342, 129, {
        friction: 0.01, frictionstatic: 0,
        render: {
            sprite: {
                texture: SZ_DEVELOPMENT_342_129 // Provide the correct path to your texture image here
            }
        }
    });

    level.objectsStatic = [
        objectFactory.createObjectFromTopLeft("ground", 0, 0, 5, -1000, 0),
        objectFactory.createObjectFromTopLeft("ground", 1280, 820, 5, 5, 0),
    ];


    level.misc = [
        Schriftzug_Development
    ];

    level.composites = [
        stairstack,
        lotumbannercomposite,
    ]

    return level;
}


export {getLevel};

