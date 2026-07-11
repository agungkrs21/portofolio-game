import { k } from '../kplayLoader.js';
import { state, statePropsEnum } from '../state/globalStateManager.js';

const HP_MAPPING = {
  10: 0,
  9: 1,
  8: 2,
  7: 3,
  6: 4,
  5: 5,
  4: 6,
  3: 7,
  2: 8,
  1: 9,
};

const CHAR_MAPPING = {
  'char-female': 0,
  'char-male': 1,
  'char-robot': 2,
};

export function makeHealthBar(k) {
  const healthBarGui = k.make([
    k.sprite('healthBarContainer'),
    k.fixed(),
    k.pos(0, 0),
    k.scale(0.8),
    {
      initGui() {
        if (this.gui) return this.gui;

        const healthBar = this.add([
          k.sprite('healthBar', {
            frame: HP_MAPPING[state.get(statePropsEnum.playerHp)],
          }),
          k.fixed(),
          k.pos(32, 0),
          {
            triggerUpdate() {
              this.frame = HP_MAPPING[state.get(statePropsEnum.playerHp)] || 0;
            },
          },
        ]);

        const charFace = this.add([
          k.sprite('characterFace', { frame: 0 }),
          k.fixed(),
          k.pos(0, 0),
          {
            setCharacter(char) {
              this.frame = CHAR_MAPPING[char];
            },
          },
        ]);
        const energyBar = this.add([
          k.sprite('energyBar', { frame: 0 }),
          k.fixed(),
          k.pos(32, 16),
          {
            // TODO
          },
        ]);
        charFace.setCharacter(state.get(statePropsEnum.playerSkin));

        this.gui = {
          healthBar,
          charFace,
          energyBar,
        };
        return this.gui;
      },
    },
  ]);

  return healthBarGui;
}
