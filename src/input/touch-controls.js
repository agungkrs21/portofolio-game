import { inputState } from '../state/mobileControlStateManager.js';
import {
  updateTouchActions,
  updateTouchControls,
} from '../ui/updateTouchControls.js';

export function tounchControl() {
  const keys = document.querySelectorAll('.key');
  const actionButtons = document.querySelectorAll('.k-button');

  keys.forEach((key) => {
    if (!key.classList.contains('mid')) {
      const direction = key.classList[0];
      key.addEventListener('touchstart', (e) => {
        handleTouchControls(e, direction, true);
      });

      key.addEventListener('touchend', (e) => {
        handleTouchControls(e, direction, false);
      });
    }
  });

  actionButtons.forEach((btn) => {
    const command = btn.classList[0];
    const button = btn.classList[1];
    btn.addEventListener('touchstart', (e) => {
      handleAction(e, command, button, true);
    });

    btn.addEventListener('touchend', (e) => {
      handleAction(e, command, button, false);
    });
  });
}

function handleTouchControls(e, direction, value) {
  e.preventDefault();
  updateTouchControls(direction, value);
  inputState.reset();
  inputState.set('hasMove', value);
  inputState.set(direction, value);
}
function handleAction(e, command, button, value) {
  e.preventDefault();
  updateTouchActions(button, value);
  inputState.reset();
  inputState.set('hasAction', value);
  inputState.set(command, value);
}
