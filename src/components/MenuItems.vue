<script setup lang="ts">
const emit = defineEmits(["reset"]);
</script>

<template>
  <img
    src="../assets/replay-icon-white.png"
    class="replay-button"
    alt="Replay button"
    @click="emit('reset')"
  />
</template>

<style scoped>
.replay-button {
  width: 40pt;
  cursor: pointer;
  padding: 10pt;
}
</style>
