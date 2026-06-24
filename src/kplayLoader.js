import kaplay from '../lib/kaplay.mjs';

const scale = 4;

export const k = kaplay({
  // width: 1280,
  // heigth: 720,
  letterBox: true,
  background: '#000000',
  scale,
  canvas: document.getElementById('game'),
  global: false,
});

k.loadSprite('char_robot', '../asset/mainChar/Char_Robot.png', {
  sliceX: 8,
  sliceY: 6,
  anims: {
    idle: { from: 16, to: 18, speed: 7, loop: true },
    shoot: { from: 32, to: 37, loop: true },
    jump: { from: 24, to: 29, loop: true },
    walk: { from: 8, to: 15, loop: true },
    walkShoot: { from: 0, to: 7, loop: true },
    heal: { from: 19, to: 24, loop: true },
    death: { from: 40, to: 45, loop: true },
  },
});
k.loadSprite('intro', '../maps/intro.png');
k.loadSprite('border', '../asset/border/corder-edge.png', {
  sliceX: 2,
  sliceY: 1,
});
