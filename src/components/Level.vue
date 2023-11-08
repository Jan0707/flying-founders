<script setup lang="ts">
import { ref, onMounted } from "vue";

import { levelProvider } from "../game/levelProvider.ts";
import { createLevel, LevelEvent } from "./../game/matter/matter.ts";
import { levelState } from "./../game/levelState.ts";

const props = defineProps<{ levelName: string }>();

const domElement = ref();
const level = ref();

function eventHandler(event: LevelEvent) {
  switch (event.name) {
    case LevelEvent.EVENT_UPDATE_FOUNDER:
      levelState.currentFounder = event.payload.name;
      break;
    case LevelEvent.EVENT_FIRED:
      levelState.incrementShots();
      levelState.isBallFlying = true;
      break;
    case LevelEvent.EVENT_STOPPED:
      levelState.isBallFlying = false;
      break;
    case LevelEvent.EVENT_HIT:
      levelState.incrementPoints(100);
      levelState.decrementRemainingTargetsCount();
      break;
    default:
      console.warn("Encountered unhandled Level Event", event);
  }
}

function onTriggerSkill() {
  console.log("Jan will take care of this, as soon as the triggering works!");
}

onMounted(() => {
  levelState.reset();
  const levelCreator = levelProvider.getLevelByName(props.levelName);

  if (levelCreator) {
    level.value = levelCreator();
    levelState.setRemainingTargetsCount(level.value.targets.length);
    createLevel(domElement.value, level.value, eventHandler);
  }
});
</script>

<template>
  <div ref="domElement"></div>
</template>
// https://stackoverflow.com/a/64053073/1143315

<style scoped></style>
