import kaplay from '../lib/kaplay.mjs';

const scale = 4;

export const k = kaplay({
  letterBox: true,
  // background: '#d46eb3',
  scale,
  canvas: document.getElementById('game'),
  global: false,
});

k.loadSprite('intro', '../maps/intro.png');
k.loadSprite('border', '../asset/border/corder-edge.png', {
  sliceX: 2,
  sliceY: 1,
});
