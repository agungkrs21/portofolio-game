import { state } from '../state/globalStateManager.js';

export function makePlayer(k) {
  return k.make([
    k.pos(),
    k.sprite(state.current().playerSkin, { anim: 'idle' }),
    k.area({
      shape: new k.Rect(k.vec2(0, 0), 8, 18),
    }),
    k.anchor('center'),
    k.body({ mass: 100, jumpForce: 350, gravityScale: 2 }),
    k.z(2),
    'player',
    {
      speed: 80,
      isAttacking: false,
      jumheld: false,
      setPosition(x, y) {
        ((this.pos.x = x), (this.pos.y = y));
      },
      setControls() {
        this.controlHandlers = [];

        //special
        this.controlHandlers.push(
          k.onKeyPress((key) => {
            if (key === 'x') {
              if (this.curAnim() !== 'jump') this.play('jump');
              this.jump();
              this.jumheld = true;
            }
          }),
          k.onKeyDown((key) => {
            if (this.jumheld && key === 'x') {
              this.addForce(k.vec2(0, -90000));
            }
          }),
          k.onKeyRelease((key) => {
            if (key === 'x') {
              this.jumheld = false;
            }
          }),
        );

        // movement
        this.controlHandlers.push(
          k.onKeyDown((key) => {
            if (key === 'left' || key === 'right') {
              if (
                this.curAnim() !== 'walk' &&
                this.isGrounded() &&
                this.curAnim() !== 'land'
              ) {
                this.play('walk');
              }
              const moveBack =
                key === 'left'
                  ? { flipX: true, direction: -this.speed }
                  : { flipX: false, direction: this.speed };
              this.flipX = moveBack.flipX;
              this.move(moveBack.direction, 0);
            }
          }),
        );
        this.controlHandlers.push(
          k.onKeyRelease(() => {
            if (
              this.curAnim() !== 'idle' &&
              this.curAnim() !== 'jump' &&
              this.curAnim() !== 'fall' &&
              this.curAnim() !== 'attack'
            ) {
              this.play('idle');
            }
          }),
        );
      },

      setEvents() {
        this.onFall(() => {
          this.play('fall');
        });

        this.onGround(() => {
          this.play('land');
        });

        this.onFallOff(() => {
          this.play('fall');
        });

        this.onHeadbutt(() => {
          this.play('fall');
        });

        this.onAnimEnd((anim) => {
          if (anim === 'land') {
            this.play('idle');
          }
        });

        this.onUpdate(() => {
          if (this.vel.y > 400) {
            this.vel.y = 400;
          }
        });
      },
    },
  ]);
}
