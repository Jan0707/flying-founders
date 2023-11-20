import { reactive } from "vue";

export const gameState = reactive({
  currentLevel: 0,
  hasStarted: false,
  isGameOver: false,
  hasLost: false,
  hasWon: false,
});
