import {
  room1State,
  state,
  statePropsEnum,
} from '../state/globalStateManager.js';
import { renderToMenu } from '../ui/renderMenu.js';

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
export function makePc(k, initialPos, tag) {
  return k.make([
    k.pos(initialPos),
    k.area({
      shape: new k.Rect(k.vec2(-16, 0), 48, 32),
      collisionIgnore: ['collider'],
    }),
    'interactable',
    tag,
    {
      dialog: null,
      condition: false,
      callback: null,
      endCallback: null,

      setDialog(value) {
        this.dialog = value;
      },
      setEvents() {
        const box = this.add([
          k.pos(8, -8),
          k.anchor('center'),
          k.scale(0.8),
          k.sprite('interact-box'),
          k.opacity(0),
        ]);

        const text = this.add([
          k.pos(8, -8),
          k.anchor('center'),
          k.text('pc', { size: 6, font: 'pixel-font' }),
          k.color(k.Color.fromHex('#000000')),
          k.opacity(0),
        ]);
        this.onCollide('player', () => {
          k.tween(
            box.opacity,
            1,
            0.2,
            (v) => (box.opacity = v),
            k.easings.easeInCirc,
          );
          k.tween(
            text.opacity,
            1,
            0.5,
            (v) => (text.opacity = v),
            k.easings.easeInCirc,
          );

          box.play('open');
        });
        this.onCollideEnd('player', () => {
          box.play('close');
          k.tween(1, 0, 0.5, (v) => (box.opacity = v), k.easings.easeInCirc);
          k.tween(1, 0, 0.5, (v) => (text.opacity = v), k.easings.easeInCirc);
        });
      },
      interact() {
        // you know
        this.callback?.(this);
      },
      endInteract() {
        this.endCallback?.(this);
      },
      setCallback(callback, endCallback) {
        this.callback = callback;
        this.endCallback = endCallback;
      },
    },
  ]);
}
