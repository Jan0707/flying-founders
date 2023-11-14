<script setup lang="ts">
import Level from "./Level.vue";
import LevelInfo from "./LevelInfo.vue";
import MenuItems from "./MenuItems.vue";
import { ref, watch } from "vue";
import { levelState } from "../game/levelState.ts";
import LevelFinishedDialog from "./dialogs/LevelFinishedDialog.vue";
import SkillButton from "./SkillButton.vue";
import { SoundSystem } from "./../SoundSystem.ts";

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
</script>

<template>
  <div class="game-container">
    <div class="top-bar">
      <LevelInfo />
      <MenuItems @reset="reset" />
    </div>
    <Level :key="levelKeys" :levelName="levelNames[levelNamesIndex]" />
    <LevelFinishedDialog
        v-if="isLevelFinished"
        class="dialog"
        :levelName="levelName"
        @continue="getNextLevel()"
    />
    <div class="bottom-bar">
      <SkillButton />
    </div>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 50px;
}

.bottom-bar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-basis: 50px
}

.dialog {
  position: absolute;
  top: 2%;
  left: 25%;
}
</style>
