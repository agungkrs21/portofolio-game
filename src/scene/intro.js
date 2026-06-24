import { drawBorder } from '../ui/drawBorder.js';

export function intro(k) {
  const map = k.add([
    k.pos(k.width() / 2, k.height() - 10),
    k.sprite('intro'),
    k.z(1),
    k.anchor('bot'),
  ]);
  // drawBorder(k.width(), k.height());

  const player = k.make([
    k.pos(0, -72),
    k.sprite('char_robot', { anim: 'idle' }),
    k.anchor('center'),
  ]);

  map.add(player);

  player.onKeyDown('right', () => {
    player.move(80, 0);
    if (player.curAnim() !== 'walk') {
      player.play('walk');
    }
    player.flipX = false;
  });
  player.onKeyDown('left', () => {
    player.move(-80, 0);
    if (player.curAnim() !== 'walk') {
      player.play('walk');
    }
    player.flipX = true;
  });

  player.onKeyDown('right', () => {
    player.move(80, 0);
    if (player.curAnim() !== 'walk') {
      player.play('walk');
    }
    player.flipX = false;
  });

  k.onUpdate(() => {
    k.camPos(player.worldPos());
  });
}
