import kaplay from '/black-white/lib/kaplay.mjs';

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

k.loadFont(
  'pixel-font',
  '/black-white/asset/font/PixelifySans-VariableFont_wght.ttf',
);

k.loadSprite('char-robot', '/black-white/asset/mainChar/Char_Robot.png', {
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
    death: { from: 40, to: 45 },
  },
});

k.loadSprite('char-male', '/black-white/asset/mainChar/Char_Boy.png', {
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
    death: { from: 40, to: 45 },
  },
});
k.loadSprite('char-female', '/black-white/asset/mainChar/Char_Girl.png', {
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
    death: { from: 40, to: 45 },
  },
});

k.loadSprite('intro', '/black-white/maps/intro.png');
k.loadSprite('room1', '/black-white/maps/room1.png');
k.loadSprite('border', '/black-white/asset/border/corner-edge.png', {
  sliceX: 2,
  sliceY: 1,
});
k.loadSprite('door', '/black-white/asset/objects/Door.png', {
  sliceX: 4,
  sliceY: 1,
  anims: {
    close: { from: 3, to: 0 },
    open: { from: 0, to: 3 },
  },
});
k.loadSprite('boxes', '/black-white/asset/objects/Boxes.png', {
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

k.loadSprite('items', '/black-white/asset/objects/Items.png', {
  sliceX: 8,
  sliceY: 6,
  anims: {
    key: {
      frames: [7, 15, 23, 31, 39, 47],
      loop: true,
    },
    disket: {
      frames: [5, 13, 21, 29, 37, 45],
      loop: true,
    },
  },
});

k.loadSprite('checkPoint', '/black-white/asset/objects/checkpoint.png', {
  sliceX: 9,
  sliceY: 1,
  anims: {
    active: { from: 0, to: 8 },
  },
});
k.loadSprite('cryogenic', '/black-white/asset/objects/cryogenic.png', {
  sliceX: 4,
  sliceY: 2,
  anims: {
    idle: { from: 0, to: 3, loop: true, speed: 6 },
    open: { from: 4, to: 7 },
  },
});
k.loadSprite('interact-box', '/black-white/asset/border/interact-box.png', {
  sliceX: 6,
  sliceY: 1,
  anims: {
    open: { from: 0, to: 5 },
    close: { from: 5, to: 0 },
  },
});

k.loadSprite('t-blade', '/black-white/asset/traps/Trap5.png', {
  sliceX: 4,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 3, loop: true },
    stop: { from: 0, to: 3 },
  },
});

k.loadSpriteAtlas('/black-white/asset/gui/GUI_Elements.png', {
  healthBar: {
    x: 0,
    y: 0,
    width: 32,
    height: 160,
    sliceY: 10,
  },
  healthBarContainer: {
    x: 32,
    y: 0,
    width: 64,
    height: 32,
  },
  characterFace: {
    x: 32,
    y: 48,
    width: 32,
    height: 96,
    sliceY: 3,
  },
  energyBar: {
    x: 64,
    y: 48,
    width: 32,
    height: 96,
    sliceY: 6,
  },
});
