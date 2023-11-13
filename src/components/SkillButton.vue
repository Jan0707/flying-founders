<script setup lang="ts">
import { onMounted } from "vue";
import { levelState } from "../game/levelState.ts";
import { emitter } from "../util/eventBus.ts";

onMounted(function () {
  window.addEventListener("keydown", (e) => {
    if (
      e.key == "s" &&
      levelState.isBallFlying
    ) {
      emitter.emit("triggerSkill");
    }
  });
});
</script>

<template>
  <div>
    <button
      :disabled="
        !levelState.isBallFlying
      "
      @click="emitter.emit('triggerSkill')"
    >
      {{ `Use ${levelState.currentFounder}'s Skill` }}
    </button>
  </div>
</template>

<style scoped></style>
