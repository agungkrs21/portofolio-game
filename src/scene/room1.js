import { makeCryogenic } from '../entities/Objects.js';
import { makePlayer } from '../entities/player.js';
import { EVENT, off, on } from '../events/eventBus.js';
import { changePlayerSprite } from '../ui/changeSprite.js';
import {
  setBackgroundColor,
  setCameraControls,
  setMapColliders,
} from './sceneUtils.js';

export function room1(k, roomData) {
  setBackgroundColor(k, '#000000');

  k.setGravity(900);
  // k.debug.inspect = true;

  const map = k.add([k.pos(0, 0), k.sprite('room1')]);
  const sceneLayers = Object.fromEntries(
    roomData.layers.map((l) => [l.name, l]),
  );
  const player = makePlayer(k);
  const colliders = sceneLayers.colliders.objects;
  const positions = sceneLayers.positions.objects;

  setMapColliders(k, map, colliders);
  setCameraControls(k, map, player);

  //global event
  function handleEvent(e) {
    if (e.type === EVENT.CHARACTER_SELECTED) {
      changePlayerSprite(k, player, e.detail.character);
    }
  }

  on(EVENT.CHARACTER_SELECTED, handleEvent);

  k.onSceneLeave(() => {
    off(EVENT.CHARACTER_SELECTED, handleEvent);
  });

  for (const position of positions) {
    if (position.name === 'player') {
      map.add(player);
      player.setPosition(position.x, position.y);
      player.setControls();
      player.setEvents();
      player.enablePassTrouhg();
      player.setMobileControsl();
      continue;
    }
    if (position.name === 'cryogenic') {
      const cryogenic = makeCryogenic(k, k.vec2(position.x, position.y));
      map.add(cryogenic);
      continue;
    }
  }
}
