import { tounchControl } from '/black-white/src/input/touch-controls.js';
import { k } from '/black-white/src/kplayLoader.js';
import { intro } from '/black-white/src/scene/intro.js';
import { room1 } from '/black-white/src/scene/room1.js';

async function main() {
  const introData = await (await fetch('/black-white//maps/intro.json')).json();
  const room1data = await (await fetch('/black-white/maps/room1.json')).json();

  tounchControl();

  k.scene('intro', (prevSceneData) => {
    intro(k, introData);
  });

  k.scene('room1', (prevSceneData) => {
    room1(k, room1data, prevSceneData);
  });
}
main().then(() => k.go('room1', { respawnLocation: null }));
