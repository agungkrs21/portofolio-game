import {
  makeCryogenic,
  makeDisket,
  makeDoor,
  makeKey,
  makePc,
  makeTBlades,
} from '../entities/Objects.js';
import { makePlayer } from '../entities/player.js';
import { EVENT, off, on } from '../events/eventBus.js';
import {
  liftDialog,
  pcDialog,
  scene1Intro,
} from '../scene-dialog/scene1Dialog.js';
import {
  playerSkinEnums,
  room1State,
  state,
} from '../state/globalStateManager.js';
import { changePlayerSprite } from '../ui/changeSprite.js';
import { makeHealthBar } from '../ui/healthBar.js';
import { closeGui, renderToMenu } from '../ui/renderMenu.js';
import {
  setBackgroundColor,
  setCameraControls,
  setMapColliders,
  startTransision,
} from './sceneUtils.js';

export function room1(k, roomData, prevSceneData) {
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
  const tblade = makeTBlades(k);

  let firstSpawnLocation = null;
  let { respawnLocation } = prevSceneData;

  const colliders = sceneLayers.colliders.objects;
  const positions = sceneLayers.positions.objects;
  const roomState = {
    firstEnter: room1State.get('firstEnter'),
    key: room1State.get('key'),
    disket: room1State.get('disket'),
    cryogenic: room1State.get('cryrogenic'),
    blade: room1State.get('blade'),
    elevator: room1State.get('elevator'),
  };

  const healthBarGui = makeHealthBar(k);
  const { charFace, healthBar } = healthBarGui.initGui();

  async function roomEvent() {
    cryogenic.play('open');
    room1State.set('cryrogenic', 'open');

    await k.wait(0.3);
    map.add(player);
    player.setPosition(respawnLocation.x, respawnLocation.y);
    player.setControls();
    player.setEvents();
    player.enablePassTrouhg();
    player.runUpdate();
    player.isInteracting = false;
    player.canTakeDamge(healthBar, respawnLocation);
    setCameraControls(k, map, player);
  }

  setMapColliders(k, map, colliders);

  for (const position of positions) {
    if (position.name === 'player') {
      firstSpawnLocation = position;
      // continue;
    }

    if (position.name === 'cryogenic') {
      map.add(cryogenic);
      cryogenic.setPosition(position.x, position.y);
      continue;
    }
    // becouse i only planning on adding 1 key and one disket in every room this will do
    if (position.name === 'key' && roomState.key > 0) {
      const key = makeKey(k, k.vec2(position.x, position.y));
      map.add(key);
      key.setEvents();
      continue;
    }
    if (position.name === 'disket' && roomState.disket > 0) {
      const disket = makeDisket(k, k.vec2(position.x, position.y));
      map.add(disket);
      disket.setEvents();
      continue;
    }
    if (position.type === 'pc') {
      const pc = makePc(k, k.vec2(position.x, position.y), position.name);
      map.add(pc);
      pc.setDialog(pcDialog[position.name]);
      pc.setEvents();

      // in callback method i use "this" so it can reference to itself
      function callback(pc) {
        const inventory = state.get('inventory');
        const item = pc.dialog.dialogrequirement;
        const hasItem = inventory[item] > 0;

        renderToMenu(pc.dialog.title, pc.dialog.content[hasItem ? 1 : 0]);

        if (!hasItem || pc.copletedEvent) return;

        pc.copletedEvent = true;
        state.updateInventory('sub', item, 1);

        // Room1 has a unique puzzle, so I keep this event here instead of creating
        // a generic event system.
        if (item === 'disket') {
          tblade.play('stop');
          tblade.unuse('area');
          room1State.set('blade', false);
        }
        if (item === 'key') {
          room1State.set('elevator', true);
        }
      }
      pc.setCallback(callback, closeGui);
      continue;
    }
    if (position.type === 'door') {
      const door = makeDoor(k, k.vec2(position.x, position.y), position.name);
      map.add(door);
      door.setDialog(liftDialog);
      door.setEvents();

      function callback(door) {
        const requirement = room1State.get(door.dialog.dialogrequirement);

        renderToMenu(
          door.dialog.title,
          door.dialog.content[requirement ? 1 : 0],
        );

        if (requirement) door.dialog.listen();
      }
      function endCallback(door) {
        const requirement = room1State.get(door.dialog.dialogrequirement);
        if (requirement) door.dialog.onConfirm();
        closeGui();
      }
      door.setCallback(callback, endCallback);
    }
    if (position.name === 'blade') {
      map.add(tblade);
      tblade.setPosition(position.x, position.y);
      tblade.play('spin');
      // i know this is only work for 1 blade but that will do for now
      if (!roomState.blade) {
        tblade.play('stop');
        tblade.unuse('area');
      }
      continue;
    }
  }

  // determine where to spawn the player
  if (!respawnLocation) {
    respawnLocation = firstSpawnLocation;
  }

  // room intro dialog
  if (roomState.firstEnter) {
    room1State.set('firstEnter', false);
    renderToMenu(scene1Intro.title, scene1Intro.content);
    scene1Intro.listen();
    scene1Intro.onConfirm();
  } else {
    roomEvent();
    k.add(healthBarGui);
  }

  //Global Event
  function handleGlobalEvent(e) {
    if (e.type === EVENT.CHARACTER_SELECTED) {
      changePlayerSprite(k, player, e.detail.character);
      charFace.setCharacter(playerSkinEnums[e.detail.character]);
      k.add(healthBarGui);
      roomEvent();
    }
    if (e.type === EVENT.SITE_SELECTED) {
      console.log(e.detail.site);
      closeGui();
      startTransision(k, map, e.detail.site);
    }
  }

  on(EVENT.CHARACTER_SELECTED, handleGlobalEvent);
  on(EVENT.SITE_SELECTED, handleGlobalEvent);
  k.onSceneLeave(() => {
    off(EVENT.CHARACTER_SELECTED, handleGlobalEvent);
    off(EVENT.SITE_SELECTED, handleGlobalEvent);
  });
}
