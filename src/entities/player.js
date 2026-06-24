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
      speed: 120,
      accel: 400,
      friction: 800,
      inputX: 0,
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
              this.vel = k.vec2(this.vel.x, -350);
              this.jumheld = true;
            }
          }),
          k.onKeyDown((key) => {
            if (this.jumheld && key === 'x' && this.vel.y < 0) {
              this.vel.y -= 14;
            }
          }),
          k.onKeyRelease((key) => {
            if (key === 'x') {
              this.jumheld = false;
              this.vel.y *= 0.5;
            }
          }),
        );

        // movement
        this.controlHandlers.push(
          k.onKeyDown((key) => {
            if (key === 'left' || key === 'right') {
              const direction =
                key === 'left'
                  ? { dir: -1, flip: true }
                  : { dir: 1, flip: false };
              this.inputX = direction.dir;
              this.flipX = direction.flip;
            }
          }),
        );
        this.controlHandlers.push(
          k.onKeyRelease((key) => {
            if (key === 'left' || key === 'right') {
              this.inputX = 0;
              this.animSpeed = 1;
            }
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

        // this.onFallOff(() => {
        //   this.play('fall');
        // });

        this.onHeadbutt(() => {
          this.play('fall');
        });

        this.onAnimEnd((anim) => {
          if (anim === 'land') {
            this.play('idle');
          }
        });

        this.onUpdate(() => {
          // limit y velocity to avoid falling trough collision
          if (this.vel.y > 400) {
            this.vel.y = 400;
          }
          if (!this.isGrounded() && Math.abs(this.vel.y) < 40) {
            this.vel.y *= 0.9;
          }

          if (this.inputX !== 0) {
            this.vel.x += this.inputX * this.accel * k.dt();

            if (Math.abs(this.vel.x) > 5) {
              if (
                this.curAnim() !== 'walk' &&
                this.curAnim() !== 'jump' &&
                this.curAnim() !== 'land' &&
                this.isGrounded()
              ) {
                this.play('walk');
              }

              const ratio = Math.abs(this.vel.x) / this.speed;
              this.animSpeed = 0.7 + Math.pow(ratio, 3) * 1.3;
            }
          } else if (this.isGrounded()) {
            if (this.vel.x > 0) {
              this.vel.x -= this.friction * k.dt();
              this.vel.x = Math.max(0, this.vel.x);
            }

            if (this.vel.x < 0) {
              this.vel.x += this.friction * k.dt();
              this.vel.x = Math.min(0, this.vel.x);
            }
          }

          this.vel.x = k.clamp(this.vel.x, -this.speed, this.speed);
        });
      },
    },
  ]);
}
