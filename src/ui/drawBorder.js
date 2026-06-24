import { k } from '../kplayLoader.js';

export function drawBorder(w, h, tilesize = 16) {
  const border = k.add([k.pos(0, 0), k.fixed()]);

  // corners
  border.add([
    k.sprite('border', { frame: 0 }),
    k.pos(0, 0),
    k.anchor('center'),
  ]);
  border.add([
    k.sprite('border', { frame: 0 }),
    k.pos(0, h - 4),
    k.rotate(270),
    k.anchor('center'),
  ]);
  border.add([
    k.sprite('border', { frame: 0 }),
    k.pos(w, 0),
    k.rotate(90),
    k.anchor('center'),
  ]);
  border.add([
    k.sprite('border', { frame: 0 }),
    k.pos(w, h - 4),
    k.rotate(180),
    k.anchor('center'),
  ]);

  // edge fix
  border.add([
    k.sprite('border', { frame: 1 }),
    k.pos(w - tilesize, 0),
    k.rotate(90),
    k.anchor('center'),
  ]);
  border.add([
    k.sprite('border', { frame: 1 }),
    k.pos(w - tilesize, h - 14),
    k.rotate(90),
    k.anchor('center'),
  ]);

  // left & right
  for (let x = tilesize; x <= h - tilesize; x += tilesize) {
    border.add([
      k.sprite('border', { frame: 1 }),
      k.pos(0, x),
      k.anchor('center'),
    ]);
    border.add([
      k.sprite('border', { frame: 1 }),
      k.pos(w - 10, x),
      k.anchor('center'),
    ]);
  }
  // top & bottom
  for (let y = tilesize; y <= w - tilesize; y += tilesize) {
    border.add([
      k.sprite('border', { frame: 1 }),
      k.pos(y, 0),
      k.anchor('center'),
      k.rotate(90),
    ]);
    border.add([
      k.sprite('border', { frame: 1 }),
      k.pos(y, h - 14),
      k.anchor('center'),
      k.rotate(90),
    ]);
  }
}
