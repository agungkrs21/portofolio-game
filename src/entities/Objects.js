export function makeDoor(k, intialPos) {
  return k.make([
    k.pos(intialPos),
    k.sprite('door'),
    k.area({
      shape: new k.Rect(k.vec2(10, 0), 28, 38),
      collisionIgnore: ['collider'],
    }),
    'door',
  ]);
}

export function makeBox(k, intialPos) {
  return k.make([
    k.pos(intialPos),
    k.sprite('boxes'),
    k.area({
      shape: new k.Rect(k.vec2(8, 2), 16, 16),
      collisionIgnore: ['collider'],
    }),
    'box',
  ]);
}

export function makeKey(k, intialPos) {
  return k.make([
    k.pos(intialPos),
    k.sprite('items', { anim: 'key' }),
    k.area({
      shape: new k.Rect(k.vec2(0, 0), 16, 16),
      collisionIgnore: ['collider'],
    }),
    'key',
  ]);
}

export function makeCheckPoint(k, intialPos) {
  return k.make([
    k.pos(intialPos),
    k.sprite('checkPoint'),
    k.area({
      shape: new k.Rect(k.vec2(0, 0), 16, 32),
      collisionIgnore: ['collider'],
    }),
    'check-point',
  ]);
}
