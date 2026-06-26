import { emit, EVENT } from '../events/eventBus.js';
import { closeGui } from '../ui/renderMenu.js';
function makeContent() {
  return `<div> <h3 class="press-start-2p-regular char-pick-title">
            PICK YOUR CHARACTER
          </h3>
          <div class="char-menu">
            <div class="char-pick">
              <div class="char" id="male">
                <img
                  class="char-img"
                  src="./asset/charFace/f1.png"
                  alt="male char"
                />
                <p class="pixel-font">male</p>
              </div>
              <div class="char" id="female">
                <img
                  class="char-img"
                  src="./asset/charFace/f2.png"
                  alt="female char"
                />
                <p class="pixel-font">female</p>
              </div>
            </div>
          </div>
          <div class="pixel-font char-pick-content">
            <br />
            <br />
            <h4>Explore your way.</h4>
            <p>
              Play the game for an interactive experience, or scroll down or use
              the navigation menu above to browse the portfolio traditionally.
            </p>
            <br />
            <h4>Controls</h4>
            <p>dekstop</p>
            <ul>
              <li>← → Move</li>
              <li>↓ Drop Through Platform</li>
              <li>Z Jump</li>
              <li>X Attack</li>
              <li>C Confirm / Interact</li>
            </ul>
            <p>Mobile</p>
            <ul>
              <code>Use the on-screen gamepad.</code>
              <li>← → Move</li>
              <li>↓ Drop Through Platform</li>
              <li>X Jump</li>
              <li>△ Attack</li>
              <li>○ Confirm / Interact</li>
            </ul>

            <p>Have fun exploring, and thanks for stopping by!</p>
            <br />
            <button id="confirm-gui-btn" class="pixel-font">Confirm</button>
          </div></div>`;
}

export const scene1Intro = {
  title: 'SCROLL DOWN TO CONFIRM',
  content: makeContent(),

  selectedCharacter: null,
  container: null,
  handler: null,

  listen() {
    this.container = document.querySelector('.char-pick');

    this.handler = (e) => {
      const char = e.target.closest('.char');

      if (!char) return;

      this.selectedCharacter = char.id;

      this.container.querySelectorAll('.char').forEach((c) => {
        c.classList.toggle('selected', c === char);
      });
    };

    this.container.addEventListener('pointerdown', this.handler);
  },
  onConfirm() {
    const confirmBtn = document.querySelector('#confirm-gui-btn');

    if (!confirmBtn) return;

    confirmBtn.onclick = () => {
      if (!this.selectedCharacter) return;

      this.container?.removeEventListener('pointerdown', this.handler);
      closeGui();

      emit(EVENT.CHARACTER_SELECTED, { character: this.selectedCharacter });
    };
  },
};
