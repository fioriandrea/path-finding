class Graphics {
  constructor(grid=[]) {
    this.grid = grid;
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

  resetGrid(dim) {
    this.resetGridContainer(dim);
    this.grid = [];

    for(let i = 0; i < dim; i++) {
      for(let j = 0; j < dim; j++) {
        const cellDiv = this.createNodeDiv(i, j);
        const viewUpdater = viewUpdaterFactory(cellDiv);
        const node = new Node(i, j, viewUpdater);
        this.grid.push(node);
        this.gridContainer.appendChild(cellDiv);
      }
    }
  }
}
