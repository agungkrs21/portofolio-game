import {
  makeCryogenic,
  makeDisket,
  makeKey,
  makePc,
} from '../entities/Objects.js';
import { makePlayer } from '../entities/player.js';
import { EVENT, off, on } from '../events/eventBus.js';
import { pcDialog, scene1Intro } from '../scene-dialog/scene1Dialog.js';
import { room1State } from '../state/globalStateManager.js';
import { changePlayerSprite } from '../ui/changeSprite.js';
import { renderToMenu } from '../ui/renderMenu.js';
import {
  setBackgroundColor,
  setCameraControls,
  setMapColliders,
} from './sceneUtils.js';

export function room1(k, roomData) {
  setBackgroundColor(k, '#000000');

  k.setGravity(900);
  k.setCamPos(184, 205);

  // k.debug.inspect = true;

  const map = k.add([k.pos(0, 0), k.sprite('room1')]);
  const sceneLayers = Object.fromEntries(
    roomData.layers.map((l) => [l.name, l]),
  );
  const player = makePlayer(k);
  const cryogenic = makeCryogenic(k, room1State.get('cryrogenic'));

  let playerPosition = null;

  const colliders = sceneLayers.colliders.objects;
  const positions = sceneLayers.positions.objects;

  async function roomEvent() {
    cryogenic.play('open');
    room1State.set('cryrogenic', 'open');

    await k.wait(0.3);
    map.add(player);
    player.setPosition(playerPosition.x, playerPosition.y);
    player.setControls();
    player.setEvents();
    player.enablePassTrouhg();
    player.setMobileControls();
    setCameraControls(k, map, player);
  }

  setMapColliders(k, map, colliders);

  function setPlayerPosition(position) {}

  for (const position of positions) {
    if (position.name === 'player') {
      playerPosition = position;
      continue;
    }
    if (position.name === 'cryogenic') {
      map.add(cryogenic);
      cryogenic.setPosition(position.x, position.y);
      continue;
    }
    // becouse i only planning on adding 1 key and one disket in every room this will do
    if (position.name === 'key' && room1State.get('key') > 0) {
      const key = makeKey(k, k.vec2(position.x, position.y));
      map.add(key);
      key.setEvents();
      continue;
    }
    if (position.name === 'disket' && room1State.get('disket') > 0) {
      const disket = makeDisket(k, k.vec2(position.x, position.y));
      map.add(disket);
      disket.setEvents();
      continue;
    }
    if (position.name === 'pc') {
      const pc = makePc(k, k.vec2(position.x, position.y), position.type);
      map.add(pc);
      pc.setDialog(pcDialog[position.type]);
      pc.setEvents();
      continue;
    }
  }

  // room intro dialog
  if (room1State.get('firstEnter')) {
    room1State.set('firstEnter', false);
    renderToMenu(scene1Intro.title, scene1Intro.content);
    scene1Intro.listen();
    scene1Intro.onConfirm();
  }

  //Global Event
  function handleGlobalEvent(e) {
    if (e.type === EVENT.CHARACTER_SELECTED) {
      changePlayerSprite(k, player, e.detail.character);
      roomEvent();
    }
  }
  on(EVENT.CHARACTER_SELECTED, handleGlobalEvent);

  k.onSceneLeave(() => {
    off(EVENT.CHARACTER_SELECTED, handleGlobalEvent);
  });
}
