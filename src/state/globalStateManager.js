export const playerSkinEnums = {
  robot: 'char-robot',
  male: 'char-male',
  female: 'char-female',
};

export const statePropsEnum = {
  playerHp: 'playerHp',
  playerSkin: 'playerSkin',
  maxPlayerHp: 'maxPlayerHp',
  isDoubleJumpUnclocked: 'isDoubleJumpUnclocked',
  playerIsInBossFight: 'playerIsInBossFight',
  isBossDefeated: 'isBossDefeated',
  inventory: 'inventory',
};

function initStateManager() {
  const state = {
    playerHp: 10,
    playerSkin: playerSkinEnums.robot,
    maxPlayerHp: 10,
    isDoubleJumpUnclocked: false,
    playerIsInBossFight: false,
    isBossDefeated: false,
    inventory: {
      disket: 0,
      key: 0,
    },
  };

  return {
    current() {
      return { ...state };
    },
    set(property, value) {
      state[property] = value;
    },
    updateInventory(action, property, value) {
      const item = state.inventory[property];
      if (item - value < 0 && action === 'sub') return;

      state.inventory[property] =
        action === 'sub' ? item - value : item + value;
    },
    get(property) {
      return state[property];
    },
  };
}

function initRoom1State() {
  const state = {
    firstEnter: true,
    key: 1,
    disket: 1,
    cryrogenic: 'idle',
  };

  return {
    current() {
      return { ...state };
    },
    set(property, value) {
      state[property] = value;
    },
    get(property) {
      return state[property];
    },
  };
}

export const state = initStateManager();
export const room1State = initRoom1State();
