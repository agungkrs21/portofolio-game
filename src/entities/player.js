import { state } from '../state/globalStateManager.js';
import { inputState } from '../state/mobileControlStateManager.js';

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
      accel: 300,
      friction: 1000,
      inputX: 0,
      isAttacking: false,
      jumheld: false,
      jumpTime: 0,
      maxJumpHold: 0.22,
      dropping: false,
      currentInteractable: null,
      isInteracting: false,
      //mobile movement condition
      pendingAction: false,

      playIfNeeded(anim) {
        if (this.curAnim() !== anim) this.play(anim);
      },

      toggleInteraction() {
        if (!this.currentInteractable) return;
        this.animSpeed = 1;
        if (this.isInteracting) {
          this.currentInteractable.endInteract();
        } else {
          this.currentInteractable.interact();
        }
        this.isInteracting = !this.isInteracting;
      },

      setPosition(x, y) {
        ((this.pos.x = x), (this.pos.y = y));
      },

      setControls() {
        this.controlHandlers = [];

        this.controlHandlers.push(
          k.onKeyPress((key) => {
            if (key === 'z' && this.isGrounded() && !this.isInteracting) {
              this.playIfNeeded('jump');
              this.vel.y = -300;
              this.jumpHeld = true;
              this.jumpTime = 0;
            }
            if (key === 'c' && this.isGrounded()) {
              this.toggleInteraction();
            }
          }),
        );

        this.controlHandlers.push(
          k.onKeyDown((key) => {
            if (
              (key === 'left' && !this.isInteracting) ||
              (key === 'right' && !this.isInteracting)
            ) {
              const direction =
                key === 'left'
                  ? { dir: -1, flip: true }
                  : { dir: 1, flip: false };
              this.inputX = direction.dir;
              this.flipX = direction.flip;
            }
            if (key === 'down') {
              this.dropping = true;
            }
          }),
        );
        this.controlHandlers.push(
          k.onKeyRelease((key) => {
            if (key === 'left' || key === 'right') {
              this.inputX = 0;
              this.animSpeed = 1;
              if (this.curAnim() === 'walk') this.play('idle');
            }
            if (key === 'down') {
              this.dropping = false;
            }
            if (key === 'z') {
              this.jumheld = false;
            }
          }),
        );
      },

      updateVelocity() {
        // limit y velocity to avoid falling trough collision
        if (this.vel.y > 400) {
          this.vel.y = 400;
        }
        if (!this.isGrounded() && Math.abs(this.vel.y) < 40) {
          this.vel.y *= 0.9;
        }
        if (
          this.jumpHeld &&
          this.vel.y < 0 &&
          this.jumpTime < this.maxJumpHold
        ) {
          this.vel.y -= 14;
          this.jumpTime += k.dt();
        }

        if (this.inputX !== 0 && !this.isInteracting) {
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
      },

      updateMobileInput() {
        if (inputState.get('hasMove')) {
          if (!this.isInteracting) {
            if (inputState.get('left')) {
              this.inputX = 1;
              this.flipX = false;
            }
            if (inputState.get('right')) {
              this.inputX = -1;
              this.flipX = true;
            }
            if (inputState.get('down')) {
              this.dropping = true;
            }
            this.pendingAction = true;
          }
        } else if (!inputState.get('hasMove') && this.pendingAction) {
          this.inputX = 0;
          this.animSpeed = 1;
          this.dropping = false;
          this.play('idle');

          this.pendingAction = false;
        }

        if (inputState.get('hasAction')) {
          if (
            inputState.get('jump') &&
            this.isGrounded() &&
            !this.isInteracting
          ) {
            this.vel.y = -320;
          }
          if (inputState.get('confirm') && this.isGrounded()) {
            this.toggleInteraction();
            inputState.set('hasAction', false);
          }
        }
      },

      runUpdate() {
        // to be honest thers has to be a better way to do this

        this.onUpdate(() => {
          this.updateVelocity();
          this.updateMobileInput();
        });
      },

      setEvents() {
        this.onFall(() => {
          this.play('fall');
        });

        this.onGround(() => {
          this.play('land');
        });

        this.onHeadbutt(() => {
          this.play('fall');
        });

        this.onCollide('interactable', (obj) => {
          this.currentInteractable = obj;
        });

        this.onCollideEnd('interactable', (obj) => {
          if (this.currentInteractable === obj && !this.isInteracting) {
            this.currentInteractable = null;
          }
        });

        this.onAnimEnd((anim) => {
          if (anim === 'land') {
            this.play('idle');
          }
        });
      },

      enablePassTrouhg() {
        this.onBeforePhysicsResolve((collision) => {
          const plat = collision.target;

          if (!plat.is('oneway')) return;

          const playerFeet = this.pos.y + 4;
          const platformTop = plat.pos.y;

          if (playerFeet > platformTop || this.dropping) {
            collision.preventResolution();
          }
        });
      },

      disableControls() {
        this.controlHandlers.forEach((handler) => {
          handler.cancel();
        });
      },
    },
  ]);
}
