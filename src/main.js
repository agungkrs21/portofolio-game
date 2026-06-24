import { k } from './kplayLoader.js';
import { intro } from './scene/intro.js';

async function main() {
  const introData = await (await fetch('../maps/intro.json')).json();

  k.scene('intro', () => {
    intro(k, introData);
  });
}

main().then(() => k.go('intro'));
