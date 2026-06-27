import { tounchControl } from './input/touch-controls.js';
import { k } from './kplayLoader.js';
import { intro } from './scene/intro.js';
import { room1 } from './scene/room1.js';

async function main() {
  const introData = await (await fetch('../maps/intro.json')).json();
  const room1data = await (await fetch('../maps/room1.json')).json();

  tounchControl();

  k.scene('intro', (prevSceneData) => {
    intro(k, introData);
  });

  k.scene('room1', (prevSceneData) => {
    room1(k, room1data, prevSceneData);
  });
}
main().then(() => k.go('room1', { respawnLocation: null }));
