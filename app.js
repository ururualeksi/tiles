Array.prototype.rand = function () {
  return this[Math.floor(Math.random() * this.length)]
}
const randomColor = () => "hsl(" + 360 * Math.random() + ',' +
(50 + 70 * Math.random()) + '%,' +
(85 + 10 * Math.random()) + '%)';

var wrapper = document.querySelector('.wrapper');

const getRowHeight = () => {
  // const viewportHeight = document.documentElement.clientHeight;
  // const viewportWidth = document.documentElement.clientWidth;
  const wrapperStyle = getComputedStyle(wrapper);
  console.log(wrapperStyle)
  return Math.round(parseInt(wrapperStyle.width) / 16 - parseInt(wrapperStyle.gridGap));
}

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

wrapper.style.gridAutoRows = getRowHeight() + 'px';

appendTile(createTile(1,1,16,16));

// appendTile(createTile(2,1,1,1))
// appendTile(createTile(3,1,2,2))

wrapper.addEventListener('click', (e) => {
  const tile = e.target
  console.log(tile.dataset);
  const x1 = parseInt(tile.dataset.x);
  const y1 = parseInt(tile.dataset.y);

  appendTile(createTile(1,1,16,16))
  tile.parentNode.removeChild(tile);
})
