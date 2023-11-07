<script setup lang="ts">
import GameContainer from "./components/GameContainer.vue";
import { watch } from "vue";
import { levelState } from "./game/levelState.ts";

watch(
  () => levelState.targets,
  () => {
    if (levelState.targets === 0) {
      console.log("Level complete!");
    }
  },
);
</script>

<template>
  <GameContainer />
</template>

<style scoped></style>
