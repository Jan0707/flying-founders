<script setup lang="ts">
import {onMounted, ref} from "vue";

import {getLevelByName, LevelName} from "../game/levelProvider.ts";
import {
  createLevel,
  LevelEvent,
  LevelEventFired, LevelEventHit,
  LevelEventStopped,
  LevelEventUpdateFounder
} from "./../game/matter/matter.ts";
import {levelState} from "./../game/levelState.ts";
import {emitter} from "../util/eventBus.ts";
import {when} from "../util/when.ts";
import {playSound} from "../SoundSystem.ts";

const props = defineProps<{ levelName: LevelName }>();

const domElement = ref();
const level = ref();

const wrapperStyle = ref({
  background: "none"
});

function eventHandler(event: LevelEvent) {

  if (event instanceof LevelEventUpdateFounder) {
    levelState.currentFounder = event.founder
  } else if (event instanceof LevelEventFired) {
    levelState.incrementShots()
    levelState.isBallFlying = true;
    playSound('fired')
  } else if (event instanceof LevelEventStopped) {
    levelState.isBallFlying = false;
  } else if (event instanceof LevelEventHit) {
    console.log("Hit target", event.target)
    levelState.incrementPoints(100);
    levelState.decrementRemainingTargetsCount();
    playSound(event.target.name)
  } else {
    console.error("Encountered unhandled Level Event", event);
  }
}

function onTriggerSkill() {
  if (!levelState.isBallFlying) {
    console.log("Ball not flying");
    return;
  }

  console.log("Triggering skill for: ", levelState.currentFounder);

  if (!levelState.currentFounder) {
    console.error("Current Founder is undefined!!");
    return
  }

  when(levelState.currentFounder?.name)({
    dominik: () => level.value.skills.powerPatron(),
    jens: () => level.value.skills.strategySlinger(),
    sebastian: () => level.value.skills.explodingLaugh(),
  })
}

onMounted(function () {
  levelState.reset();

  const createdLevel = getLevelByName(props.levelName)
  levelState.setRemainingTargetsCount(createdLevel.targets.length);
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
