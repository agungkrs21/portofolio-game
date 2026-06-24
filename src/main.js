import { k } from './kplayLoader.js';
import { intro } from './scene/intro.js';

k.scene('intro', () => {
  intro(k);
});

k.go('intro');
