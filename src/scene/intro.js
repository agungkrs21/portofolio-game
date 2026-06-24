import { drawBorder } from '../ui/drawBorder.js';

export function intro(k) {
  drawBorder(k.width(), k.height());
  const map = k.add([k.pos(0, 0), k.sprite('intro')]);

  const obj = map.add([
    k.rect(32, 32), // Draw this object as a rectangle
    k.pos(k.width() / 2, k.height() - (16 + 14)), // Position this object in X: 10 and Y: 20
    'shape', // Classify this object as "shape"
    k.anchor('center'),
  ]);
}
