<script setup lang="ts">
import Level from "./Level.vue";
import LevelInfo from "./LevelInfo.vue";
import MenuItems from "./MenuItems.vue";
import { ref, watch } from "vue";
import { levelState } from "../game/levelState.ts";
import LevelFinishedDialog from "./dialogs/LevelFinishedDialog.vue";
import SkillButton from "./SkillButton.vue";

const levelKeys = ref(1);
const levelName = ref("1");

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
  isLevelFinished.value = false;
  if (levelName.value === "1") {
    levelName.value = "2";
  } else {
    levelName.value = "1";
  }

  levelKeys.value += 1;
}
</script>

<template>
  <div class="top-bar">
    <LevelInfo />
    <MenuItems @reset="reset" />
  </div>
  <Level :key="levelKeys" :levelName="levelName" />
  <LevelFinishedDialog
    v-if="isLevelFinished"
    class="dialog"
    :levelName="levelName"
    @continue="getNextLevel()"
  />
  <div class="bottom-bar">
    <SkillButton />
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog {
  position: absolute;
  top: 35%;
  left: 25%;
}
</style>
