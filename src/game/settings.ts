const settings = {
  sling: {
    stiffness: 0.05,
    length: 0.5,
    minimalDistanceToRelease: 5,
  },
  ball: {
    speedAtRest: 0.2,
  },
  objects: {
    instantBreakingSpeed: 5,
    eventuallyBreakingSpeedStart: 2,
    eventuallyBreakingSpeedStop: 1,
  },
  engine: {
    defaults: {
      gravity: 0.001
    }
  }
};

export { settings };
