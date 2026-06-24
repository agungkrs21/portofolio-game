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

k.loadSprite('char-robot', '../asset/mainChar/Char_Robot.png', {
  sliceX: 8,
  sliceY: 6,
  anims: {
    idle: { from: 16, to: 18, speed: 7, loop: true },
    shoot: { from: 32, to: 37, loop: true },
    jump: { from: 24, to: 27, speed: 12 },
    land: { frames: [28, 29, 25, 24], speed: 20 },
    fall: { frames: [26, 28] },
    walk: { from: 8, to: 15, speed: 24, loop: true },
    walkShoot: { from: 0, to: 7, loop: true },
    heal: { from: 19, to: 24, loop: true },
    death: { from: 40, to: 45, loop: true },
  },
});
k.loadSprite('intro', '../maps/intro.png');
k.loadSprite('border', '../asset/border/corner-edge.png', {
  sliceX: 2,
  sliceY: 1,
});
k.loadSprite('door', '../asset/objects/Door.png', {
  sliceX: 4,
  sliceY: 1,
  anims: {
    close: { from: 3, to: 0 },
    open: { from: 0, to: 3 },
  },
});
k.loadSprite('boxes', '../asset/objects/Boxes.png', {
  sliceX: 4,
  sliceY: 4,
  anims: {
    boxOpen: {
      frames: [0, 4, 8, 12],
    },
    boxClose: {
      frames: [12, 8, 4, 0],
    },
    chestOpen: {
      frames: [1, 5, 9, 13],
    },
    chestClose: {
      frames: [13, 9, 5, 1],
    },
    boxExplode: {
      frames: [2, 6, 10, 14],
    },
    chestExplode: {
      frames: [3, 7, 11, 15],
    },
  },
});

k.loadSprite('items', '../asset/objects/Items.png', {
  sliceX: 8,
  sliceY: 6,
  anims: {
    key: {
      frames: [7, 15, 23, 31, 39, 47],
    },
  },
});

k.loadSprite('checkPoint', '../asset/objects/checkpoint.png', {
  sliceX: 9,
  sliceY: 1,
  anims: {
    active: { from: 0, to: 8 },
  },
});
