<script setup lang="ts">
import { levelState } from "../game/levelState.ts";

const emit = defineEmits(["reset"]);
</script>

<template>
  <img
    src="../assets/replay-icon.png"
    class="replay-button"
    alt="Replay button"
    @click="emit('reset')"
  />
</template>

<style scoped>
.replay-button {
  width: 50px;
  cursor: pointer;
}
</style>
