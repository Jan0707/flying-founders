import { reactive } from "vue";

export const levelState = reactive({
  shots: 0,
  reset() {
    this.shots = 0;
  },
  incrementShots() {
    this.shots++;
  },
});
