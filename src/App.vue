<script setup lang="ts">
import GameContainer from "./components/GameContainer.vue";
import {gameState} from "./game/gameState.ts";
import {onMounted} from "vue";
import {playMusic} from "./SoundSystem.ts";

onMounted(() => playMusic('jingleBellRock'))
</script>

<template>
  <GameContainer :key="gameState.key" />
</template>

<style scoped></style>
