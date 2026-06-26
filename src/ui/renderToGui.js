import { intro } from '../sceneDialog/room1Dialog.js';

const guiContent = document.querySelector('.text-container');
const guiTitleBox = document.querySelector('.gui-title');
const guiTitle = document.querySelector('#title-text');

export function renderToGui(title = '', content = '') {
  guiTitleBox.classList.remove('hidden');
  guiContent.classList.remove('hidden');

  guiTitle.innerHTML = title;
  guiContent.innerHTML = content;
}

function closeGui() {
  guiTitleBox.classList.add('hidden');
  guiContent.classList.add('hidden');

  guiTitle.innerHTML = '';
  guiContent.innerHTML = '';
}

export function testAja() {
  renderToGui(intro.title, intro.content);
  intro.listen();
  intro.onConfirm(closeGui);
}
