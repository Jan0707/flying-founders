<script setup lang="ts">
import { ref, onMounted } from "vue";

import { levelProvider } from "../game/levelProvider.ts";
import { createLevel, LevelEvent } from "./../game/matter/matter.ts";
import { levelState } from "./../game/levelState.ts";

const props = defineProps<{ levelName: string }>();

const domElement = ref();

function eventHandler(event: LevelEvent) {
  console.log(event);

  if (event.name === "fired") {
    levelState.incrementShots();
  }
  if (event.name === "hit") {
    levelState.incrementPoints(100);
    levelState.decrementRemainingTargetsCount();
  }
}

onMounted(() => {
  levelState.reset();
  const level = levelProvider.getLevelByName(props.levelName)();
  levelState.setRemainingTargetsCount(level.targets.length);
  createLevel(domElement.value, level, eventHandler);
});
</script>

<template>
  <div ref="domElement"></div>
</template>
// https://stackoverflow.com/a/64053073/1143315

<style scoped></style>
