<script setup lang="ts">
import Level from "./Level.vue";
import LevelInfo from "./LevelInfo.vue";
import MenuItems from "./MenuItems.vue";
import {ref, watch, onMounted, computed} from "vue";
import {levelState} from "../game/levelState.ts";
import {gameState} from "../game/gameState.ts";
import LevelFinishedDialog from "./dialogs/LevelFinishedDialog.vue";
import {emitter} from "../util/eventBus.ts";
import StartScreen from "./StartScreen.vue";
import EndScreen from "./EndScreen.vue";
import {levelNames} from "../game/levelProvider.ts";
import CreditsLevel from "./CreditsLevel.vue";

const levelKeys = ref(1);
const levelNamesIndex = ref(-1);

const levelName = computed(() => levelNames[levelNamesIndex.value])

const isLevelFinished = ref(false);

watch(
    () => levelState.remainingTargetsCount,
    () => {
      if (levelState.remainingTargetsCount === 0) {
        isLevelFinished.value = true;
      }
    },
);

function reset() {
  levelKeys.value += 1;
}

function getNextLevel() {
  console.log('next level')
  isLevelFinished.value = false;

  console.log('levelNamesIndex', levelNamesIndex.value, levelNames.length - 1)
  if (levelNamesIndex.value < levelNames.length - 1) {
    levelNamesIndex.value++;
    reset();
  } else {
    gameState.isGameOver = true;
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
    if (e.key === "4") {
      levelNamesIndex.value = 2;
      isLevelFinished.value = true;
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
    <StartScreen/>
  </div>
  <div class="game-container" v-else-if="gameState.isGameOver">
    <CreditsLevel v-if="gameState.postGameScreen === 'concept'" :level-name="'concept'"/>
    <CreditsLevel v-else-if="gameState.postGameScreen === 'design'" :level-name="'design'"/>
    <CreditsLevel v-else-if="gameState.postGameScreen === 'development'" :level-name="'development'"/>
    <EndScreen v-else/>
  </div>
  <div class="game-container" v-else-if="!gameState.isGameOver">
    <div class="top-bar">
      <LevelInfo/>
      <MenuItems @reset="reset"/>
    </div>
    <Level :key="levelKeys" :levelName="levelName"/>
    <LevelFinishedDialog
        v-if="isLevelFinished"
        class="dialog"
        :levelName="levelName"
        @continue="getNextLevel()"
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
  translate: -50%;
}
</style>
