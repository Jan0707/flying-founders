import { reactive } from "vue";

export const levelState = reactive({
  shots: 0,
  points: 0,
  targets: 0,
  timeNeeded: Date.now(),
  reset() {
    this.shots = 0;
    this.points = 0;
    this.timeNeeded = Date.now();
  },
  incrementShots() {
    this.shots++;
  },
  incrementPoints(points: number) {
    this.points += points;
  },
  setTargets(targets: number) {
    this.targets = targets;
  },
  decrementTargets() {
    this.targets--;
  },
  getTimeNeededInSeconds() {
    return Math.floor((Date.now() - this.timeNeeded) / 1000);
  },
});
