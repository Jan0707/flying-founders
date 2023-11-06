<script setup lang="ts">
import Level from "./Level.vue";
import {levelState} from "../game/levelState.ts";
</script>

<template>
  <p class="shot-counter">
    Shots fired: {{levelState.shots}}
  </p>
  <Level levelName="1" />
</template>

<style scoped>
.shot-counter {
  display: block;
  border: 3px solid white;
  border-radius: 4px;
  padding: 0.3rem;
  width: 50%;
  margin: 1rem auto;
}
</style>
