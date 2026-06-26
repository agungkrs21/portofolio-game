import { playerSkinEnums } from '../state/globalStateManager.js';

export function changePlayerSprite(k, player, skin) {
  player.use(k.sprite(playerSkinEnums[skin], { anim: 'idle' }));
}
