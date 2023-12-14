import { reactive } from "vue";

export const levelState = reactive({
  shots: 0,
  points: 0,
  remainingTargetsCount: 0,
  isBallFlying: false,
  startTime: Date.now(),
  currentFounder: null,

  reset() {
    this.shots = 0;
    this.points = 0;
    this.isBallFlying = false;
    this.currentFounder = null;
    this.startTime = Date.now();
  },
  incrementShots() {
    this.shots++;
  },
  incrementPoints(points: number) {
    this.points += points;
  },
  setRemainingTargetsCount(remainingTargetsCount: number) {
    this.remainingTargetsCount = remainingTargetsCount;
  },
  decrementRemainingTargetsCount() {
    this.remainingTargetsCount--;
  },
  getTimeNeededInSeconds() {
    return Math.floor((Date.now() - this.startTime) / 1000);
  },
});
