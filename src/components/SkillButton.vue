<script setup lang="ts">
import { levelState } from "../game/levelState.ts";
</script>

<template>
  <div>
    <button :disabled="!levelState.isBallFlying || levelState.currentFounder !== 'dominik'">{{ `Use ${levelState.currentFounder}'s Skill`}}</button>
  </div>
</template>

<style scoped></style>
