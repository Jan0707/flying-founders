<script setup lang="ts">
import { levelState } from "../game/levelState.ts";
</script>

<template>
  <div>
    <span class="shot-counter">Shots fired: {{ levelState.shots }}</span>
    <span class="points-counter">Points: {{ levelState.points }}</span>
    <span class="remaining-shot-counter">Remaining shots: {{ levelState.remainingBallsCount }}</span>
  </div>
</template>

<style scoped></style>
