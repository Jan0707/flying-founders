<script setup lang="ts">
import { onMounted } from "vue";
import RiveAnimation from "./rive-animation.vue";
import animationAsset from "../assets/animations/winning_screen.riv?url";
import type { Event } from "@rive-app/canvas";
import { gameState } from "../game/gameState.ts";
import { levelState } from "../game/levelState.ts";
import {playSound} from "../SoundSystem.ts";

onMounted(function () {});

const returnToLobby = function () {
  playSound("tap")
  gameState.isGameOver = false;
  gameState.hasStarted = false;
  gameState.postGameScreen = "endScreen";
  gameState.key++;
  levelState.reset();
};

const showCredits = function () {
  playSound("tap")
  gameState.postGameScreen = "concept";
};

const handleAnimationStateChange = function (event: Event) {
  if (!Array.isArray(event.data) || !event.data[0]) {
    return;
  }
  const eventString = event.data[0];

  if (eventString === "Lobby") {
    returnToLobby();
    return;
  }

  if (eventString === "Credit") {
    showCredits();
    return;
  }
};
</script>

<template>
  <div class="end-screen">
    <rive-animation
      class="rive-animation"
      :src="animationAsset"
      :state-machines="['state_machine']"
      @state-change="(event) => handleAnimationStateChange(event)"
    />
  </div>
</template>

<style scoped>
.end-screen {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: black;
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
