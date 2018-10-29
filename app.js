const randomColor = () => "hsl(" + 360 * Math.random() + ',' +
(60 + 70 * Math.random()) + '%,' +
(75 + 10 * Math.random()) + '%)';

//const gridSize = Math.pow(2, prompt('Число 1-7, будьте так любезны'));
const gridSize = Math.pow(2, 7);
const appContainer = document.querySelector('.app-container');
const wrapper = document.querySelector('.wrapper');

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
appContainer.style.width = Math.min(width, height) + 'px';

const computeGridRowHeight = () => {
  const wrapperStyle = getComputedStyle(wrapper);
  return Math.min(width, height) / gridSize - parseInt(wrapperStyle.gridGap);
}

wrapper.style.gridAutoRows = computeGridRowHeight() + 'px';
wrapper.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";

const createTile = (x, y, w, h) => {
  const tile = document.createElement('div');
  tile.style.background = randomColor()
  tile.dataset.x = x;
  tile.dataset.y = y;
  tile.dataset.width = w;
  tile.dataset.height = h;
  return tile;
}

const appendTile = (tile) => {
  const leftLine = parseInt(tile.dataset.x);
  const topLine = parseInt(tile.dataset.y);
  const rightLine = leftLine + parseInt(tile.dataset.width);
  const bottomLine = topLine + parseInt(tile.dataset.height);
  tile.style.gridColumn = leftLine + '/' + rightLine;
  tile.style.gridRow = topLine + '/' + bottomLine;
  wrapper.appendChild(tile);
}

appendTile(createTile(1,1,gridSize,gridSize));

wrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('wrapper')) return;

  const tile = e.target
  if (parseInt(tile.dataset.width) === 1) return;

  const x = parseInt(tile.dataset.x);
  const y = parseInt(tile.dataset.y);
  const width = parseInt(tile.dataset.width);
  const height = parseInt(tile.dataset.height);

  const x1 = x;
  const y1 = y;
  const w1 = width / 2;
  const h1 = height / 2;
  appendTile(createTile(x1, y1, w1, h1));

  const x2 = x + width / 2;
  const y2 = y;
  const w2 = width / 2;
  const h2 = height / 2;
  appendTile(createTile(x2, y2, w2, h2));

  const x3 = x;
  const y3 = y + height / 2;
  const w3 = width / 2;
  const h3 = height / 2;
  appendTile(createTile(x3, y3, w3, h3));

  const x4 = x + width / 2;
  const y4 = y + height / 2;
  const w4 = width / 2;
  const h4 = height / 2;
  appendTile(createTile(x4, y4, w4, h4));

  tile.parentNode.removeChild(tile);
})
