<script setup lang="ts">
import { levelState } from "../../game/levelState.ts";
import { onMounted } from "vue";
import { playSound } from "../../SoundSystem.ts";

defineProps<{ levelName: string }>();

const emit = defineEmits(["continue"]);

onMounted(function () {
  playSound("levelSuccess");
});
</script>

<template>
  <div class="content">
    <h1>Level {{ levelName }} finished!</h1>
    <p>Shots fired: {{ levelState.shots }}</p>
    <p>Time needed: {{ levelState.getTimeNeededInSeconds() }} seconds</p>
    <button class="continue-button" @click="emit('continue')">Continue</button>
  </div>
</template>

<style scoped>
.content {
  width: 50%;
  font-family: "Skranji", cursive;
  background: radial-gradient(#fffbf3, #ffe19e);
  box-sizing: border-box;
  border-radius: 20px 18px 20px 18px;
  box-shadow:
    0px 0px 0px 6px #5e1e21,
    0px 0px 8px 6px #84222b,
    inset 0px 0px 15px 0px #614506,
    6px 6px 1px 1px #e66565,
    -6px 6px 1px 1px #e66565;
  text-align: center;

  > p {
    font-size: 25px;
    box-sizing: border-box;
    color: #461417;
  }

  .continue-button {
    font-family: "Skranji", cursive;
    margin-bottom: 20px;
    background: linear-gradient(#ced869, #536d1b);
    box-shadow:
      0px 0px 0px 4px #7e1522,
      0px 2px 0px 3px #e66565;
    &:hover {
      box-shadow:
        0px 0px 0px 4px #7e1522,
        0px 2px 0px 3px #e66565,
        inset 2px 2px 10px 3px #4e6217;
    }
  }
}

h1 {
  transform-origin: 50% 50%;
  font-size: 50px;
  text-align: center;
  color: #461417;
}
</style>
