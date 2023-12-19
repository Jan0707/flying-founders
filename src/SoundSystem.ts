import {Howl} from "howler";

import SOUND_PARTYLICIOUS from "./assets/sounds/partylicious.mp3";
import shoot from "./assets/sounds/shoot.mp3";

import AlisaSound from "./assets/sounds/alisa.mp3"
import CarloSound from "./assets/sounds/carlo.mp3"
import DennisSound from "./assets/sounds/dennis.mp3"
import DianaSound from "./assets/sounds/diana.mp3"
import FabianSound from "./assets/sounds/fabian.mp3"
import GarreltSound from "./assets/sounds/garrelt.mp3"
import LarsSound from "./assets/sounds/lars.mp3"
import RichardSound from "./assets/sounds/richard.mp3"
import VanessaSound from "./assets/sounds/vanessa.mp3"
import WesselSound from "./assets/sounds/wessel.mp3"
import YannSound from "./assets/sounds/yann.mp3"
import JulianSound from "./assets/sounds/julian.mp3"

import bells from "./assets/sounds/bells.mp3"
import smallExplosion from "./assets/sounds/small-explosion.mp3"
import wooDominik from "./assets/sounds/start-dominik.mp3"
import startSebastian from "./assets/sounds/start-sebastian.mp3"
import laughSebastian from "./assets/sounds/laugh-sebastian.mp3"
import allrightyright from "./assets/sounds/start-jens.mp3"
import employee1 from "./assets/sounds/employee-1.mp3"
import employee2 from "./assets/sounds/employee-2.mp3"
import employee3 from "./assets/sounds/employee-3.mp3"
import employee4 from "./assets/sounds/employee-4.mp3"
import employee5 from "./assets/sounds/employee-5.mp3"

import {TargetName} from "./util/Target.ts";

const howls: Partial<Record<TargetName, Howl>> &
    Record<
        'levelSuccess' |
        'bells' |
        'smallExplosion' |
        'wooDominik' |
        'startSebastian' |
        'laughSebastian' |
        'allrightyright' |
        'fired' |
        'employee1' |
        'employee2' |
        'employee3' |
        'employee4' |
        'employee5', Howl> = {
    Alisa: new Howl({src: [AlisaSound]}),
    Carlo: new Howl({src: [CarloSound]}),
    Dennis: new Howl({src: [DennisSound]}),
    Diana: new Howl({src: [DianaSound]}),
    Fabian: new Howl({src: [FabianSound]}),
    Garrelt: new Howl({src: [GarreltSound]}),
    Lars: new Howl({src: [LarsSound]}),
    Richard: new Howl({src: [RichardSound]}),
    Vanessa: new Howl({src: [VanessaSound]}),
    Wessel: new Howl({src: [WesselSound]}),
    Yann: new Howl({src: [YannSound]}),
    Julian: new Howl({src: [JulianSound]}),

    wooDominik: new Howl({src: [wooDominik]}),
    startSebastian: new Howl({src: [startSebastian]}),
    laughSebastian: new Howl({src: [laughSebastian]}),
    allrightyright: new Howl({src: [allrightyright]}),

    fired: new Howl({src: [shoot]}),
    bells: new Howl({src: [bells]}),
    smallExplosion: new Howl({src: [smallExplosion]}),
    levelSuccess: new Howl({src: [SOUND_PARTYLICIOUS]}),
    employee1: new Howl({src: [employee1]}),
    employee2: new Howl({src: [employee2]}),
    employee3: new Howl({src: [employee3]}),
    employee4: new Howl({src: [employee4]}),
    employee5: new Howl({src: [employee5]}),
}

export function playSound(key: TargetName | "levelSuccess" | 'bells' | 'smallExplosion' | 'wooDominik' | 'startSebastian' | 'laughSebastian' | 'allrightyright' | 'fired') {
    if (key in howls) {
        return howls[key]!.play()
    }

    const genericEmployeeHowls = [howls['employee1'], howls['employee2'], howls['employee3'], howls['employee4'], howls['employee5']]
    //get random element from genericEmployeeHowls
    const randomHowl = genericEmployeeHowls[Math.floor(Math.random() * genericEmployeeHowls.length)];
    return randomHowl!.play()
}