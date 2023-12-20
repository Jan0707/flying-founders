<script setup lang="ts">
import { levelState } from "../game/levelState.ts";
</script>

<template>
  <div>
    <span class="shot-counter">Shots fired: {{ levelState.shots }}</span>
  </div>
</template>

<style scoped>
.shot-counter {
  padding: 15pt;
  font-size: 1.2em;
}
</style>
