const viewUpdaterFactory = nodeDiv => node => {
  nodeDiv.className = "cell";
  if(node.wall) nodeDiv.classList.add("wall");
  else if(node.start) nodeDiv.classList.add("start");
  else if(node.end) nodeDiv.classList.add("end");

  if(node.open) nodeDiv.classList.add("open");
  else if(node.closed) nodeDiv.classList.add("closed");

  if(node.inPath) nodeDiv.classList.add("path");
}

class GridViewGenerator {
  constructor() {
    this.gridContainer = document.querySelector("div.gridContainer");
  }

  createNodeDiv(i, j) {
    const node = document.createElement("div");
    node.classList.add("cell");
    node.dataset.i = i;
    node.dataset.j = j;
    return node;
  }

  resetGridContainer(dim) {
    this.gridContainer.innerHTML = "";
    this.gridContainer.style["grid-template-rows"] = `repeat(${dim}, 1fr)`;
    this.gridContainer.style["grid-template-columns"] = `repeat(${dim}, 1fr)`;
  }

  setUpGrid(dim) {
    this.resetGridContainer(dim);
    const grid = [];

    for(let i = 0; i < dim; i++) {
      const row = [];
      for(let j = 0; j < dim; j++) {
        const cellDiv = this.createNodeDiv(i, j);
        const viewUpdater = viewUpdaterFactory(cellDiv);
        const node = new Node(i, j, viewUpdater);
        row.push(node);
        this.gridContainer.appendChild(cellDiv);
      }
      grid.push(row);
    }
    return grid;
  }
}
