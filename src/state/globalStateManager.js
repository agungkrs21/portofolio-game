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
};

function initStateManager() {
  const state = {
    playerHp: 10,
    playerSkin: playerSkinEnums.robot,
    maxPlayerHp: 10,
    isDoubleJumpUnclocked: false,
    playerIsInBossFight: false,
    isBossDefeated: false,
  };

  return {
    current() {
      return { ...state };
    },
    set(property, value) {
      state[property] = value;
    },
  };
}

export const state = initStateManager();
