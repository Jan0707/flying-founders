import { reactive } from "vue";
import { CreditsName } from "./levelProvider.ts";

export const gameState = reactive({
  hasStarted: false,
  isGameOver: false,
  postGameScreen: <"endScreen" | CreditsName>"endScreen",
  key: 1000,
});
