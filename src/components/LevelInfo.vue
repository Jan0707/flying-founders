<script setup lang="ts">
import { levelState } from "../game/levelState.ts";
</script>

<template>
  <div>
    <p class="shot-counter">Shots fired: {{ levelState.shots }}</p>
    <p class="points-counter">Points: {{ levelState.points }}</p>
  </div>
</template>

<style scoped></style>
