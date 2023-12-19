import AK from "./../assets/targets/AK.png";
import Alex from "./../assets/targets/Alex.png";
import Alexandra from "./../assets/targets/Alexandra.png";
import Alisa from "./../assets/targets/Alisa.png";
import Andrzej from "./../assets/targets/Andrzej.png";
import Anja from "./../assets/targets/Anja.png";
import Anselm from "./../assets/targets/Anselm.png";
import Anton from "./../assets/targets/Anton.png";
import Arthur from "./../assets/targets/Arthur.png";
import Beko from "./../assets/targets/Beko.png";
import Beni from "./../assets/targets/Beni.png";
import Carlo from "./../assets/targets/Carlo.png";
import Dave from "./../assets/targets/Dave.png";
import David from "./../assets/targets/David.png";
import Dennis from "./../assets/targets/Dennis.png";
import Diana from "./../assets/targets/Diana.png";
import Etienne from "./../assets/targets/Etienne.png";
import Fabian from "./../assets/targets/Fabian.png";
import Fabi from "./../assets/targets/Fabi.png";
import Falk from "./../assets/targets/Falk.png";
import Gabriel from "./../assets/targets/Gabriel.png";
import Garrelt from "./../assets/targets/Garrelt.png";
import Grebiel from "./../assets/targets/Grebiel.png";
import Jan_D from "./../assets/targets/Jan_D.png";
import Jan_G from "./../assets/targets/Jan_G.png";
import Jo from "./../assets/targets/Jo.png";
import Joel from "./../assets/targets/Joel.png";
import Julia from "./../assets/targets/Julia.png";
import Julian from "./../assets/targets/Julian.png";
import Kayleigh from "./../assets/targets/Kayleigh.png";
import Lars from "./../assets/targets/Lars.png";
import Maren from "./../assets/targets/Maren.png";
import Matthias from "./../assets/targets/Matthias.png";
import Michael from "./../assets/targets/Michael.png";
import Petra from "./../assets/targets/Petra.png";
import Richard from "./../assets/targets/Richard.png";
import Robin from "./../assets/targets/Robin.png";
import Sasha from "./../assets/targets/Sasha.png";
import Sebi from "./../assets/targets/Sebi.png";
import Sinead from "./../assets/targets/Sinead.png";
import Sophie from "./../assets/targets/Sophie.png";
import Sven from "./../assets/targets/Sven.png";
import Thomas from "./../assets/targets/Thomas.png";
import Tobias from "./../assets/targets/Tobias.png";
import Vanessa from "./../assets/targets/Vanessa.png";
import Wessel from "./../assets/targets/Wessel.png";
import Yann from "./../assets/targets/Yann.png";

export class Target {
    constructor(
        readonly startPosition: { x: number, y: number },
        readonly name: TargetName = getRandomTargetName(),
    ) {}

    get imagePath() {
        return targets[this.name]
    }
}

const targets = {
    AK,
    Alex,
    Alexandra,
    Alisa,
    Andrzej,
    Anja,
    Anselm,
    Anton,
    Arthur,
    Beko,
    Beni,
    Carlo,
    Dave,
    David,
    Dennis,
    Diana,
    Etienne,
    Fabian,
    Fabi,
    Falk,
    Gabriel,
    Garrelt,
    Grebiel,
    Jan_D,
    Jan_G,
    Jo,
    Joel,
    Julia,
    Julian,
    Kayleigh,
    Lars,
    Maren,
    Matthias,
    Michael,
    Petra,
    Richard,
    Robin,
    Sasha,
    Sebi,
    Sinead,
    Sophie,
    Sven,
    Thomas,
    Tobias,
    Vanessa,
    Wessel,
    Yann,
} as const

export type TargetName = keyof typeof targets

function getRandomTargets(count: number): TargetName[] {
    const possibleTargets = Object.keys(targets) as TargetName[]
    const shuffledTargets = shuffle(possibleTargets)
    return shuffledTargets.slice(0, count)
}

const getRandomTargetName = (() => {
    const possibleTargets = getRandomTargets(Object.keys(targets).length)
    let unusedTargets = [...possibleTargets]
    return () => {
        if (unusedTargets.length === 0) {
            unusedTargets = [...possibleTargets]
        }

        return unusedTargets.pop()!
    }
})()


function shuffle(array: TargetName[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}
