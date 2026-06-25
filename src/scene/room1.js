import { makePlayer } from '../entities/player.js';
import {
  setBackgroundColor,
  setCameraControls,
  setMapColliders,
} from './sceneUtils.js';

export function room1(k, roomData) {
  setBackgroundColor(k, '#000000');

  k.setGravity(1000);
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
  }
}
