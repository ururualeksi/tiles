const randomColor = () => "hsl(" + 360 * Math.random() + ',' + (60 + 70 * Math.random()) + '%,' + (75 + 10 * Math.random()) + '%)';

//const gridSize = Math.pow(2, prompt('Число 1-7, будьте так любезны'));
const gridSize = Math.pow(2, 7);
const appContainer = document.querySelector('.app-container');
const wrapper = document.querySelector('.wrapper');

const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;
appContainer.style.width = Math.min(clientWidth, clientHeight) + 'px';

const computeGridRowHeight = () => {
  const wrapperStyle = getComputedStyle(wrapper);
  return Math.min(clientWidth, clientHeight) / gridSize - parseInt(wrapperStyle.gridGap);
}

wrapper.style.gridAutoRows = computeGridRowHeight() + 'px';
wrapper.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";

const createTile = (x, y, size) => {
  const tile = document.createElement('div');
  tile.style.background = randomColor();
  tile.dataset.x = x;
  tile.dataset.y = y;
  tile.dataset.size = size;
  return tile;
}

const appendTile = (tile) => {
  const leftLine = parseInt(tile.dataset.x);
  const topLine = parseInt(tile.dataset.y);
  const rightLine = leftLine + parseInt(tile.dataset.size);
  const bottomLine = topLine + parseInt(tile.dataset.size);

  tile.style.gridColumn = leftLine + '/' + rightLine;
  tile.style.gridRow = topLine + '/' + bottomLine;

  wrapper.appendChild(tile);
}

const isSmallest = (tile) => {
  return parseInt(tile.dataset.size) === 1;
}

const breakDownTile = (tile) => {
  const x = parseInt(tile.dataset.x);
  const y = parseInt(tile.dataset.y);
  const oldSize = parseInt(tile.dataset.size);
  const size = oldSize / 2;

  return {
    t1: createTile(x, y, size),
    t2: createTile(x + size, y, size),
    t3: createTile(x, y + size, size),
    t4: createTile(x + size, y + size, size)
  }
}

appendTile(createTile(1, 1, gridSize));

wrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('wrapper')) return;

  const tile = e.target
  if (isSmallest(tile)) return;

  const newTiles = breakDownTile(tile);

  Object.keys(newTiles).forEach((key) => {
    appendTile(newTiles[key]);
  });

  tile.parentNode.removeChild(tile);
})
