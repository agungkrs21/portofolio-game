import {
  makeBox,
  makeCheckPoint,
  makeDoor,
  makeKey,
} from '../entities/Objects.js';
import { makePlayer } from '../entities/player.js';
import { drawBorder } from '../ui/drawBorder.js';
import { setCameraControls, setMapColliders } from './sceneUtils.js';

export function intro(k, sceneData) {
  // drawBorder(k.width(), k.height());

  k.setGravity(1000);
  k.setCamPos(192, 160 + 60);
  // k.debug.inspect = true;

  const map = k.add([k.pos(0, 0), k.sprite('intro'), k.z(1)]);
  const player = makePlayer(k);

  const sceneLayers = Object.fromEntries(
    sceneData.layers.map((l) => [l.name, l]),
  );

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
      continue;
    }
    if (position.name === 'door') {
      const door = makeDoor(k, k.vec2(position.x, position.y));
      map.add(door);
      continue;
    }
    if (position.name === 'box') {
      const box = makeBox(k, k.vec2(position.x, position.y));
      map.add(box);
      continue;
    }
    if (position.name === 'roomKey') {
      const key = makeKey(k, k.vec2(position.x, position.y));
      map.add(key);
      continue;
    }
    if (position.name === 'checkPoint') {
      const checkPoint = makeCheckPoint(k, k.vec2(position.x, position.y));
      map.add(checkPoint);
      continue;
    }
  }
  k.debug.log(map.pos, map.width, map.height);
}
