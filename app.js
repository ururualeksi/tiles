Array.prototype.rand = function () {
  return this[Math.floor(Math.random() * this.length)]
}
var palette = ['#d6a2ad', '#c3b59f', '#a0af84', '#668f80', '#4a6670', '#706677', '#565264'];

var wrapper = document.querySelector('.wrapper');

const getRowHeight = () => {
  const viewportHeight = document.documentElement.clientHeight;
  const viewportWidth = document.documentElement.clientWidth;
  const wrapperStyle = getComputedStyle(wrapper);
  console.log(Math.round(viewportWidth / 16 - parseInt(wrapperStyle.gridGap) * 2));
  return Math.round(viewportWidth / 16 - parseInt(wrapperStyle.gridGap) * 2);
}

const createTile = (x, y, w, h) => {
  const tile = document.createElement('div');
  tile.style.background = palette.rand();
  tile.dataset.x = x;
  tile.dataset.y = y;
  tile.dataset.width = w;
  tile.dataset.height = h;
  return tile;
}

const appendTile = (tile) => {
  const leftLine = tile.dataset.x;
  const rightLine = parseInt(tile.dataset.x) + parseInt(tile.dataset.width);
  const topLine = tile.dataset.y;
  const bottomLine = parseInt(tile.dataset.y) + parseInt(tile.dataset.height);
  tile.style.gridColumn = leftLine + '/' + rightLine;
  tile.style.gridRow = topLine + '/' + bottomLine;
  wrapper.appendChild(tile);
}

wrapper.style.gridAutoRows = getRowHeight() + 'px';

let tile = createTile(1, 1, 1, 1);
appendTile(tile);
