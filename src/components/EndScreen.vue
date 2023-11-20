<script setup lang="ts">
import {onMounted } from "vue";
import {gameState} from "../game/gameState.ts";

onMounted(function () {
});
</script>

<template>
  <div class="end-screen">
    <h1>Flying Founders</h1>
    <h2>Congratulations, you won!</h2>
    <!--<button v-on:click="gameState.hasStarted = true">Start</button>-->
  </div>
</template>

<style scoped>
.end-screen {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-flow: column;
}
</style>
