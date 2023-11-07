<script setup lang="ts">
import Level from "./Level.vue";
import LevelInfo from "./LevelInfo.vue";
import MenuItems from "./MenuItems.vue";
import { ref } from "vue";

const levelKeys = ref(1);

function reset() {
  levelKeys.value += 1;
}
</script>

<template>
  <div class="top-bar">
    <LevelInfo />
    <MenuItems @reset="reset" />
  </div>
  <Level :key="levelKeys" levelName="1" />
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
