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
  if (parseInt(tile.dataset.width) === 1) return;

  const x1 = parseInt(tile.dataset.x);
  const y1 = parseInt(tile.dataset.y);
  const w1 = parseInt(tile.dataset.width) / 2;
  console.log(w1);
  const h1 = parseInt(tile.dataset.height) / 2;
  appendTile(createTile(x1,y1,w1,h1))

  const x2 = parseInt(tile.dataset.x) + parseInt(tile.dataset.width) / 2;
  const y2 = parseInt(tile.dataset.y);
  const w2 = parseInt(tile.dataset.width) / 2;
  console.log(w1);
  const h2 = parseInt(tile.dataset.height) / 2;
  appendTile(createTile(x2,y2,w2,h2))

  const x3 = parseInt(tile.dataset.x);
  const y3 = parseInt(tile.dataset.y) + parseInt(tile.dataset.height) / 2;
  const w3 = parseInt(tile.dataset.width) / 2;
  console.log(w1);
  const h3 = parseInt(tile.dataset.height) / 2;
  appendTile(createTile(x3,y3,w3,h3))

  const x4 = parseInt(tile.dataset.x) + parseInt(tile.dataset.width) / 2;
  const y4 = parseInt(tile.dataset.y) + parseInt(tile.dataset.height) / 2;
  const w4 = parseInt(tile.dataset.width) / 2;
  console.log(w1);
  const h4 = parseInt(tile.dataset.height) / 2;
  appendTile(createTile(x4,y4,w4,h4))
  tile.parentNode.removeChild(tile);
})
