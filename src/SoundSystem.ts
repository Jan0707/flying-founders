import {Howl, Howler} from "howler";
import { emitter } from "./util/eventBus.ts";

import SOUND_SUPERSHOT from "./assets/sounds/supershot.mp3"
import SOUND_PARTYLICIOUS from "./assets/sounds/partylicious.mp3"

class SoundSystem {
    constructor() {
        const supershot = new Howl({
            src: [SOUND_SUPERSHOT],
        });
        const partylicious = new Howl({
            src: [SOUND_PARTYLICIOUS],
        });
        emitter.on("playSound", function (event: {name?: string}) {
            switch (event.name) {
                case "hit":
                    supershot.play();
                    break;
                case "openLevelFinishedDialog":
                    partylicious.play();
                    break;
                default:
                    console.warn(`Encountered unknown event name for "playSound" : ${event.name}`)
                    break;
            }
        });
    }
}

export { SoundSystem };
