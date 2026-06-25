import { k } from './kplayLoader.js';
import { intro } from './scene/intro.js';
import { room1 } from './scene/room1.js';

async function main() {
  const introData = await (await fetch('../maps/intro.json')).json();

  const room1data = await (await fetch('../maps/room1.json')).json();

  k.scene('intro', () => {
    intro(k, introData);
  });

  k.scene('room1', () => {
    room1(k, room1data);
  });
}

main().then(() => k.go('room1'));
