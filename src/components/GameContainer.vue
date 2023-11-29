<script setup lang="ts">
import Level from "./Level.vue";
import LevelInfo from "./LevelInfo.vue";
import MenuItems from "./MenuItems.vue";
import { ref, watch, onMounted } from "vue";
import { levelState } from "../game/levelState.ts";
import { gameState } from "../game/gameState.ts";
import LevelFinishedDialog from "./dialogs/LevelFinishedDialog.vue";
import LevelLostDialog from "./dialogs/LevelLostDialog.vue";
import { SoundSystem } from "./../SoundSystem.ts";
import {emitter} from "../util/eventBus.ts";
import StartScreen from "./StartScreen.vue";
import EndScreen from "./EndScreen.vue";

const levelKeys = ref(1);
const levelNamesIndex = ref(-1);

const levelNames = [
    "1",
    "2",
    "3",
];

const isLevelFinished = ref(false);
const isLevelLost = ref(false);

new SoundSystem();

watch(
  () => levelState.remainingTargetsCount,
  () => {
    if (levelState.remainingTargetsCount === 0) {
      isLevelFinished.value = true;
    }
  },
);

watch(
    () => levelState.remainingBallsCount,
    () => {
      if (levelState.remainingTargetsCount > 0 && levelState.remainingBallsCount === 0 && levelState.shots > 0
    ) {
        isLevelLost.value = true;
      } else {
        isLevelLost.value = false;
      }
    },
);

function reset() {
  levelKeys.value += 1;
}

function getNextLevel() {
  isLevelFinished.value = false;

  if (levelNamesIndex.value < levelNames.length - 1) {
    levelNamesIndex.value++;
    reset();
  } else {
   gameState.isGameOver = true;
   gameState.hasWon = true;
  }
}

onMounted(function () {

  getNextLevel();
 
  window.addEventListener("keydown", (e) => {
    if (e.key === "s") {
      emitter.emit("triggerSkill");
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "3") {
      levelNamesIndex.value = 1;
      isLevelFinished.value = true;
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "2") {
      levelNamesIndex.value = 0;
      isLevelFinished.value = true;
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "1") {
      levelNamesIndex.value = -1;
      isLevelFinished.value = true;
    }
  });
});
</script>

<template>
  <div class="game-container" v-if="!gameState.hasStarted">
    <StartScreen />
  </div>
  <div class="game-container" v-if="gameState.hasStarted && gameState.isGameOver && gameState.hasWon">
    <EndScreen />
  </div>
  <div class="game-container" v-if="gameState.hasStarted && !gameState.isGameOver">
    <div class="top-bar">
      <LevelInfo />
      <MenuItems @reset="reset" />
    </div>
    <Level :key="levelKeys" :levelName="levelNames[levelNamesIndex]"/>
    <LevelFinishedDialog
        v-if="isLevelFinished"
        class="dialog"
        :levelName="levelName"
        @continue="getNextLevel()"
    />
    <LevelLostDialog
        v-if="isLevelLost"
        class="dialog"
        :levelName="levelName"
        @reset="reset()"
    />
  </div>
</template>

<style scoped>
.game-container {
  background-color: hotpink;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 50px;
}

.dialog {
  position: absolute;
  top: 10%;
  left: 50%;
}
</style>
