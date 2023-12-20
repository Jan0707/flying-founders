<script setup lang="ts">
import { onMounted } from "vue";
import { gameState } from "../game/gameState.ts";
import RiveAnimation from "./rive-animation.vue";
import animationAsset from "../assets/animations/flying_founders_lobby.riv?url";
import type { Event } from "@rive-app/canvas";
import {playSound} from "../SoundSystem.ts";

onMounted(function () {});

const startGame = function () {
  gameState.hasStarted = true;
};

const handleAnimationStateChange = function (event: Event) {
  if (Array.isArray(event.data) && event.data?.[0] === "exit") {
    startGame();
  }
};
</script>

<template>
  <div class="start-screen">
    <rive-animation
      class="rive-animation"
      :src="animationAsset"
      :state-machines="['state_machine']"
      @click="playSound('tap')"
      @state-change="(event) => handleAnimationStateChange(event)"
    />
  </div>
</template>

<style scoped>
.start-screen {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-flow: column;
}

.rive-animation {
  position: absolute;
  inset: 0;
}
</style>
