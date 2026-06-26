import {
  room1State,
  state,
  statePropsEnum,
} from '../state/globalStateManager.js';

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
    {
      setEvents() {
        this.onCollide('player', () => {
          state.updateInventory('add', 'key', 1);
          room1State.set('key', 0);
          k.destroy(this);
        });
      },
    },
  ]);
}

export function makeDisket(k, intialPos) {
  return k.make([
    k.pos(intialPos),
    k.sprite('items', { anim: 'disket' }),
    k.area({
      shape: new k.Rect(k.vec2(0, 0), 16, 16),
      collisionIgnore: ['collider'],
    }),
    'disket',
    {
      setEvents() {
        this.onCollide('player', () => {
          state.updateInventory('add', 'disket', 1);
          room1State.set('disket', 0);
          k.destroy(this);
        });
      },
    },
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

export function makeCryogenic(k, animState) {
  return k.make([
    k.pos(),
    k.sprite('cryogenic', { anim: animState }),
    k.area({
      shape: new k.Rect(k.vec2(0, 0), 50, 50),
      collisionIgnore: ['collider'],
    }),
    'cryogenic',
    {
      setPosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
      },
    },
  ]);
}
