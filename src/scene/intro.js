import { drawBorder } from '../ui/drawBorder.js';

export function intro(k) {
  drawBorder(k.width(), k.height());
  // const map = k.add([k.pos(0, 0), k.sprite('intro')]);

  const player = k.add([
    k.pos(k.width() / 2, k.height() - 24),
    k.sprite('char_robot', { anim: 'idle' }),
    k.anchor('center'),
  ]);
}
