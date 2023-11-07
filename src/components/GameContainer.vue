<script setup lang="ts">
import Level from "./Level.vue";
import LevelInfo from "./LevelInfo.vue";
import MenuItems from "./MenuItems.vue";
import { ref, watch } from "vue";
import { levelState } from "../game/levelState.ts";

const levelKeys = ref(1);
const levelName = ref("1");

watch(
  () => levelState.targets,
  () => {
    if (levelState.targets === 0) {
      levelName.value = "2";
      levelKeys.value += 1;
      console.log("levelName: ", levelName.value);
    }
  },
);

function reset() {
  levelKeys.value += 1;
}
</script>

<template>
  <div class="top-bar">
    <LevelInfo />
    <MenuItems @reset="reset" />
  </div>
  <Level :key="levelKeys" :levelName="levelName" />
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
