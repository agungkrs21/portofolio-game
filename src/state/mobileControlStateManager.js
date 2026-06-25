function initiateStateManager() {
  const states = {
    left: false,
    down: false,
    up: false,
    right: false,
    jump: false,
    attack: false,
    confirm: false,
    hasMove: false,
    hasAction: false,
  };

  return {
    current() {
      return { ...states };
    },
    set(property, value) {
      states[property] = value;
    },
    reset() {
      for (const state in states) {
        if (state !== 'hasMove' && state !== 'hasAction') states[state] = false;
      }
    },
    get(property) {
      return states[property];
    },
  };
}

export const inputState = initiateStateManager();
