<script setup lang="ts">
import {ref} from "vue";
import {Howl} from "howler";

import AK from "./assets/targets/AK.png";
import Alex from "./assets/targets/Alex.png";
import Alexandra from "./assets/targets/Alexandra.png";
import Alisa from "./assets/targets/Alisa.png";
import Andrzej from "./assets/targets/Andrzej.png";
import Anja from "./assets/targets/Anja.png";
import Anselm from "./assets/targets/Anselm.png";
import Anton from "./assets/targets/Anton.png";
import Arthur from "./assets/targets/Arthur.png";
import Beko from "./assets/targets/Beko.png";
import Beni from "./assets/targets/Beni.png";
import Carlo from "./assets/targets/Carlo.png";
import Dave from "./assets/targets/Dave.png";
import David from "./assets/targets/David.png";
import Dennis from "./assets/targets/Dennis.png";
import Diana from "./assets/targets/Diana.png";
import Etienne from "./assets/targets/Etienne.png";
import Fabian from "./assets/targets/Fabian.png";
import Fabi from "./assets/targets/Fabi.png";
import Falk from "./assets/targets/Falk.png";
import Gabriel from "./assets/targets/Gabriel.png";
import Garrelt from "./assets/targets/Garrelt.png";
import Grebiel from "./assets/targets/Grebiel.png";
import Jan_D from "./assets/targets/Jan_D.png";
import Jan_G from "./assets/targets/Jan_G.png";
import Jo from "./assets/targets/Jo.png";
import Joel from "./assets/targets/Joel.png";
import Julia from "./assets/targets/Julia.png";
import Julian from "./assets/targets/Julian.png";
import Kayleigh from "./assets/targets/Kayleigh.png";
import Lars from "./assets/targets/Lars.png";
import Maren from "./assets/targets/Maren.png";
import Matthias from "./assets/targets/Matthias.png";
import Michael from "./assets/targets/Michael.png";
import Petra from "./assets/targets/Petra.png";
import Richard from "./assets/targets/Richard.png";
import Robin from "./assets/targets/Robin.png";
import Sasha from "./assets/targets/Sasha.png";
import Sebi from "./assets/targets/Sebi.png";
import Sinead from "./assets/targets/Sinead.png";
import Sophie from "./assets/targets/Sophie.png";
import Sven from "./assets/targets/Sven.png";
import Thomas from "./assets/targets/Thomas.png";
import Tobias from "./assets/targets/Tobias.png";
import Vanessa from "./assets/targets/Vanessa.png";
import Wessel from "./assets/targets/Wessel.png";
import Yann from "./assets/targets/Yann.png";

import AlisaSound from "./assets/sounds/alisa.mp3";
import CarloSound from "./assets/sounds/carlo.mp3";
import DennisSound from "./assets/sounds/dennis.mp3";
import DianaSound from "./assets/sounds/diana.mp3";
import FabianSound from "./assets/sounds/fabian.mp3";
import GarreltSound from "./assets/sounds/garrelt.mp3";
import LarsSound from "./assets/sounds/lars.mp3";
import JanGSound from "./assets/sounds/jan_g.mp3";
import RichardSound from "./assets/sounds/richard.mp3";
import VanessaSound from "./assets/sounds/vanessa.mp3";
import WesselSound from "./assets/sounds/wessel.mp3";
import YannSound from "./assets/sounds/yann.mp3";
import JulianSound from "./assets/sounds/julian.mp3";
import DaveSound from "./assets/sounds/dave.mp3";

const initialTargets = [
  {
    name: 'AK',
    image: AK,
    readable: true,
  },
  {
    name: 'Alex',
    image: Alex,
    readable: true,
  },
  {
    name: 'Alexandra',
    image: Alexandra,
    readable: true,
  },
  {
    name: 'Alisa',
    image: Alisa,
    readable: true,
    sound: new Howl({src: [AlisaSound]}),
  },
  {
    name: 'Andrzej',
    image: Andrzej,
    readable: true,
  },
  {
    name: 'Anja',
    image: Anja,
    readable: true,
  },
  {
    name: 'Anselm',
    image: Anselm,
    readable: true,
  },
  {
    name: 'Anton',
    image: Anton,
    readable: true,
  },
  {
    name: 'Arthur',
    image: Arthur,
    readable: true,
  },
  {
    name: 'Beko',
    image: Beko,
    readable: true,
  },
  {
    name: 'Beni',
    image: Beni,
    readable: true,
  },
  {
    name: 'Carlo',
    image: Carlo,
    readable: true,
    sound: new Howl({src: [CarloSound]}),
  },
  {
    name: 'Dave',
    image: Dave,
    readable: true,
    sound: new Howl({src: [DaveSound]}),
  },
  {
    name: 'David',
    image: David,
    readable: true,
  },
  {
    name: 'Dennis',
    image: Dennis,
    readable: true,
    sound: new Howl({src: [DennisSound]}),
  },
  {
    name: 'Diana',
    image: Diana,
    readable: true,
    sound: new Howl({src: [DianaSound]}),
  },
  {
    name: 'Etienne',
    image: Etienne,
    readable: true,
  },
  {
    name: 'Fabian',
    image: Fabian,
    readable: true,
    sound: new Howl({src: [FabianSound]}),
  },
  {
    name: 'Fabi',
    image: Fabi,
    readable: true,
  },
  {
    name: 'Falk',
    image: Falk,
    readable: true,
  },
  {
    name: 'Gabriel',
    image: Gabriel,
    readable: true,
  },
  {
    name: 'Garrelt',
    image: Garrelt,
    readable: true,
    sound: new Howl({src: [GarreltSound]}),
  },
  {
    name: 'Grebiel',
    image: Grebiel,
    readable: true,
  },
  {
    name: 'Jan_D',
    image: Jan_D,
    readable: true,
  },
  {
    name: 'Jan_G',
    image: Jan_G,
    readable: true,
    sound: new Howl({ src: [JanGSound] }),
  },
  {
    name: 'Jo',
    image: Jo,
    readable: true,
  },
  {
    name: 'Joel',
    image: Joel,
    readable: true,
  },
  {
    name: 'Julia',
    image: Julia,
    readable: true,
  },
  {
    name: 'Julian',
    image: Julian,
    readable: true,
    sound: new Howl({src: [JulianSound]}),
  },
  {
    name: 'Kayleigh',
    image: Kayleigh,
    readable: true,
  },
  {
    name: 'Lars',
    image: Lars,
    readable: true,
    sound: new Howl({src: [LarsSound]}),
  },
  {
    name: 'Maren',
    image: Maren,
    readable: true,
  },
  {
    name: 'Matthias',
    image: Matthias,
    readable: true,
  },
  {
    name: 'Michael',
    image: Michael,
    readable: true,
  },
  {
    name: 'Petra',
    image: Petra,
    readable: true,
  },
  {
    name: 'Richard',
    image: Richard,
    readable: true,
    sound: new Howl({src: [RichardSound]}),
  },
  {
    name: 'Robin',
    image: Robin,
    readable: true,
  },
  {
    name: 'Sasha',
    image: Sasha,
    readable: true,
  },
  {
    name: 'Sebi',
    image: Sebi,
    readable: true,
  },
  {
    name: 'Sinead',
    image: Sinead,
    readable: true,
  },
  {
    name: 'Sophie',
    image: Sophie,
    readable: true,
  },
  {
    name: 'Sven',
    image: Sven,
    readable: true,
  },
  {
    name: 'Thomas',
    image: Thomas,
    readable: true,
  },
  {
    name: 'Tobias',
    image: Tobias,
    readable: true,
  },
  {
    name: 'Vanessa',
    image: Vanessa,
    readable: true,
    sound: new Howl({src: [VanessaSound]}),
  },
  {
    name: 'Wessel',
    image: Wessel,
    readable: true,
    sound: new Howl({src: [WesselSound]}),
  },
  {
    name: 'Yann',
    image: Yann,
    readable: true,
    sound: new Howl({src: [YannSound]}),
  },
];

let targets = ref(initialTargets);

const flipTargetReadability = (target) => {
  target.readable = !target.readable;
}

const playSound = (target) => {
  if (target.sound) {
    target.sound.play();
  }
}

const hideAll = () => {
  targets.value.forEach((target)=>{target.readable = false;})
}

const showAll = () => {
  targets.value.forEach((target)=>{target.readable = true;})
}

</script>

<template>
  <div class="heads-title-bar">
    <div>
      <h1>Lotumdex</h1>
    </div>
    <div class="icon-bar">
      <span class="material-symbols-outlined" v-on:click="showAll()">
        visibility
      </span>
      <span class="material-symbols-outlined" v-on:click="hideAll()">
        visibility_off
      </span>
    </div>
  </div>

  <div class="heads-grid">
    <div class="heads-grid-card" v-for="target in targets" v-on:click="flipTargetReadability(target)">
      <img v-bind:src="target.image" v-on:click="playSound(target)"/>
      <span v-if="target.readable">{{ target.name }}</span>
    </div>
  </div>
</template>

<style>
  * {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  }

  .heads-title-bar {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  .icon-bar span {
    font-size: 44pt;
    padding: 5pt;
  }

  h1 {
    margin: 0.5em;
  }

  .heads-grid {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }

  .heads-grid-card {
    display: flex;
    flex-flow: row;
    align-items: center;


    background-color: #cfff00;
    color: black;

    flex: 1 1 200pt;

    padding: 5pt;
  }

  .heads-grid-card img {
    width: 70pt;
  }

  .heads-grid-card span {
    padding-left: 10pt;
    font-size: 1.5em;

  }
</style>
