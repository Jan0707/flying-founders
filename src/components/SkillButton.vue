<script setup lang="ts">
import { levelState } from "../game/levelState.ts";
const emit = defineEmits(["triggerSkill"]);
</script>

<template>
  <div>
    <button
      :disabled="
        !levelState.isBallFlying || levelState.currentFounder !== 'dominik'
      "
      @click="emit('triggerSkill')"
    >
      {{ `Use ${levelState.currentFounder}'s Skill` }}
    </button>
  </div>
</template>

<style scoped></style>
