<script setup lang="ts">
import { onMounted, ref } from "vue";

import { CreditsName, getCreditsLevelByName } from "../game/levelProvider.ts";
import {
  createLevel,
  LevelEvent,
  LevelEventHit,
} from "./../game/matter/matter.ts";
import { levelState } from "./../game/levelState.ts";
import { playSound } from "../SoundSystem.ts";

const props = defineProps<{ levelName: CreditsName }>();

const domElement = ref();
const level = ref();

const wrapperStyle = ref({
  background: "none",
});

function eventHandler(event: LevelEvent) {
  if (event instanceof LevelEventHit) {
    console.log("Hit target", event.target);
    levelState.incrementPoints(100);
    levelState.decrementRemainingTargetsCount();
    playSound(event.target.name);
  } else {
    console.error("Encountered unhandled Level Event", event);
  }
}

onMounted(function () {
  levelState.reset();

  const createdLevel = getCreditsLevelByName(props.levelName);
  levelState.setRemainingTargetsCount(createdLevel.targets.length);
  level.value = createLevel(domElement.value, createdLevel, eventHandler);

  if (createdLevel.background) {
    wrapperStyle.value = {
      backgroundImage: `url(${createdLevel.background})`,
      backgroundRepeat: "no-repeat",
    };
  } else {
    wrapperStyle.value = {
      background: "transparent",
    };
  }
});
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
