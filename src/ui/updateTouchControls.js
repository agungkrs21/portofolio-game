export function updateTouchControls(direction, state) {
  const keys = document.querySelectorAll('.key-img');
  for (const key of keys) {
    if (key.id === direction) {
      key.src = state
        ? `./asset/mobile-keys/${direction}-down.png`
        : `./asset/mobile-keys/${direction}.png`;
      break;
    }
  }
}
export function updateTouchActions(action, state) {
  const actionButtons = document.querySelectorAll('.k-button-img');
  for (const button of actionButtons) {
    if (button.id === action) {
      button.src = state
        ? `./asset/mobile-keys/${action}-down.png`
        : `./asset/mobile-keys/${action}.png`;
    }
  }
}
