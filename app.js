const randomColor = () => "hsl(" + 360 * Math.random() + ',' + (60 + 70 * Math.random()) + '%,' + (75 + 10 * Math.random()) + '%)';

const gridSize = Math.pow(2, 7);

const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;

const wrapper = document.querySelector('.wrapper');
wrapper.style.width = '100vmin';
wrapper.style.height = '100vmin';
wrapper.style.gridTemplateRows = "repeat(" + gridSize + ", 1fr)";
wrapper.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";

const createTile = (x, y, size) => {
  const tile = document.createElement('div');
  tile.style.background = randomColor();
  tile.dataset.x = x;
  tile.dataset.y = y;
  tile.dataset.size = size;
  return tile;
};

const appendTile = tile => {
  const leftLine = parseInt(tile.dataset.x);
  const topLine = parseInt(tile.dataset.y);
  const rightLine = leftLine + parseInt(tile.dataset.size);
  const bottomLine = topLine + parseInt(ti.dataset.size);

  tile.style.gridColumn = leftLine + '/' + rightLine;
  tile.style.gridRow = topLine + '/' + bottomLine;

  wrapper.appendChild(tile);
};

const breakDownTile = tile => {
  const x = parseInt(tile.dataset.x);
  const y = parseInt(tile.dataset.y);
  const oldSize = parseInt(tile.dataset.size);
  const size = oldSize / 2;

  return {
    t1: createTile(x, y, size),
    t2: createTile(x + size, y, size),
    t3: createTile(x, y + size, size),
    t4: createTile(x + size, y + size, size)
  };
};

const isSmallest = tile => {
  return parseInt(tile.dataset.size) === 1;
};

appendTile(createTile(1, 1, gridSize));

wrapper.addEventListener('click', e => {
  if (e.target.classList.contains('wrapper')) return;

  const tile = e.target;
  if (isSmallest(tile)) return;

  const newTiles = breakDownTile(tile);

  Object.keys(newTiles).forEach((key) => {
    appendTile(newTiles[key]);
  });

  tile.parentNode.removeChild(tile);
});
