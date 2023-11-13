<script setup lang="ts">
import { ref, onMounted } from "vue";

import { levelProvider } from "../game/levelProvider.ts";
import { createLevel, LevelEvent } from "./../game/matter/matter.ts";
import { levelState } from "./../game/levelState.ts";
import { emitter } from "../util/eventBus.ts";

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
      emitter.emit("playSound", { name: "hit" });
      break;
    default:
      console.warn("Encountered unhandled Level Event", event);
  }
}

function onTriggerSkill() {
  console.warn("Triggering skill for: ", levelState.currentFounder);

  switch (levelState.currentFounder) {
    case "jens":
      level.value.skills.strategySlinger();
      break;
    case "dominik":
      level.value.skills.powerPatron();
      break;
    default:
      console.warn("No skill available for founder: ", levelState.currentFounder);
  }
}

onMounted(function () {
  levelState.reset();
  const levelCreator = levelProvider.getLevelByName(props.levelName);

  if (levelCreator) {
    const createdLevel = levelCreator();
    levelState.setRemainingTargetsCount(createdLevel.targets.length);
    level.value = createLevel(domElement.value, createdLevel, eventHandler);
  }
});

emitter.on("triggerSkill", onTriggerSkill);
</script>

<template>
  <div ref="domElement"></div>
</template>
// https://stackoverflow.com/a/64053073/1143315

<style scoped></style>
