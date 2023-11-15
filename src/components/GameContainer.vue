<script setup lang="ts">
import Level from "./Level.vue";
import LevelInfo from "./LevelInfo.vue";
import MenuItems from "./MenuItems.vue";
import { ref, watch, onMounted } from "vue";
import { levelState } from "../game/levelState.ts";
import LevelFinishedDialog from "./dialogs/LevelFinishedDialog.vue";
import { SoundSystem } from "./../SoundSystem.ts";
import {emitter} from "../util/eventBus.ts";

const levelKeys = ref(1);
const levelNamesIndex = ref(0);

const levelNames = [
    "1",
    "2",
    "3",
];

const isLevelFinished = ref(false);

new SoundSystem();

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
  isLevelFinished.value = false;

  if (levelNamesIndex.value < levelNames.length - 1) {
    levelNamesIndex.value++;
  }

  reset();
}

onMounted(function () {
  window.addEventListener("keydown", (e) => {
    if (e.key === "s") {
      emitter.emit("triggerSkill");
    }
  });
});
</script>

<template>
  <div class="game-container">
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
  top: 2%;
  left: 25%;
}
</style>
