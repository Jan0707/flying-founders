<script setup lang="ts">
import GameContainer from "./components/GameContainer.vue";
import {gameState} from "./game/gameState.ts";
</script>

<template>
  <GameContainer :key="gameState.key" />
</template>

<style scoped></style>
