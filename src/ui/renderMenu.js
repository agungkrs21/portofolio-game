const guiContent = document.querySelector('.text-container');
const guiTitleBox = document.querySelector('.gui-title');
const guiTitle = document.querySelector('#title-text');
const gameCanvas = document.querySelector('#game');

export function renderToMenu(title = '', content = '') {
  guiTitleBox.classList.remove('hidden');
  guiContent.classList.remove('hidden');

  guiTitle.innerHTML = title;
  guiContent.innerHTML = content;
}

export function closeGui() {
  guiTitleBox.classList.add('hidden');
  guiContent.classList.add('hidden');

  guiTitle.innerHTML = '';
  guiContent.innerHTML = '';

  gameCanvas.focus();
}
