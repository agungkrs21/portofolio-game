import { scene1Intro } from '../scene-dialog/scene1Dialog.js';

const guiContent = document.querySelector('.text-container');
const guiTitleBox = document.querySelector('.gui-title');
const guiTitle = document.querySelector('#title-text');

function renderToMenu(title = '', content = '') {
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
  renderToMenu(scene1Intro.title, scene1Intro.content);
  scene1Intro.listen();
  scene1Intro.onConfirm(closeGui);
}
