Array.prototype.rand = function () {
    return this[Math.floor(Math.random() * this.length)]
}
var palette = ['#d6a2ad', '#c3b59f', '#a0af84', '#668f80', '#4a6670', '#706677', '#565264'];
var wrapper = document.querySelector(".wrapper");

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
  wrapper.appendChild(tile);

}

for (var i = 0; i < 256; i++) {
  let x = i % 16 + 1;
  let y = Math.floor(i / 16) + 1;
  let tile = createTile(x, y, 1, 1);
  appendTile(tile);
}



// wrapper.addEventListener('click', () => {
//   console.log
// });
