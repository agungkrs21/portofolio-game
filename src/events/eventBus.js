import { EVENT } from './eventName.js';

export function emit(event, detail) {
  window.dispatchEvent(new CustomEvent(event, { detail }));
}

export function on(event, callback) {
  window.addEventListener(event, callback);
}

export function off(event, callback) {
  window.removeEventListener(event, callback);
}

export { EVENT };
