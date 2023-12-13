<script setup lang="ts">
import { ref, onMounted } from "vue";

import { levelProvider } from "../game/levelProvider.ts";
import { createLevel, LevelEvent } from "./../game/matter/matter.ts";
import { levelState } from "./../game/levelState.ts";
import { emitter } from "../util/eventBus.ts";

const props = defineProps<{ levelName: string }>();

const domElement = ref();
const level = ref();

const wrapperStyle = ref({
  background: "none"
});

function eventHandler(event: LevelEvent) {
  switch (event.name) {
    case LevelEvent.EVENT_UPDATE_FOUNDER:
      levelState.currentFounder = event.payload.name;
      break;
    case LevelEvent.EVENT_FIRED:
      levelState.incrementShots();
      levelState.decrementRemainingShots();
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
  if (!levelState.isBallFlying) {
    console.log("Ball not flying");
    return;
  }

  console.warn("Triggering skill for: ", levelState.currentFounder);

  switch (levelState.currentFounder) {
    case "jens":
      level.value.skills.strategySlinger();
      break;
    case "dominik":
      level.value.skills.powerPatron();
      break;
    case "sebastian":
      level.value.skills.explodingLaugh();
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
    levelState.remainingBallsCount = createdLevel.ballFactory.getRemainingShots();
    level.value = createLevel(domElement.value, createdLevel, eventHandler);

    if (createdLevel.background) {
      wrapperStyle.value = {
        backgroundImage: `url(${createdLevel.background})`,
        backgroundRepeat: "no-repeat",
      };
    } else {
      wrapperStyle.value = {
        background: "transparent"
      };
    }
  }
});

emitter.on("triggerSkill", onTriggerSkill);
emitter.on("canvasClicked", onTriggerSkill);
</script>

<template>
  <div class="canvas-wrapper" :style="wrapperStyle" ref="domElement"></div>
</template>

<style scoped>
.canvas-wrapper {
  flex-grow: 1;
  background-color: yellow;
}

.canvas-wrapper canvas {
  width: 100%;
  object-fit: contain;
}
</style>
