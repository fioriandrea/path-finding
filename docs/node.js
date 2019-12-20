class Node {
  constructor(i, j) {
    this.i = i;
    this.j = j;

    const nodesDivs = document.querySelectorAll(".cell");
    this.dim = Math.sqrt(nodesDivs.length);
    this.div = nodesDivs[j + i * this.dim];

    this.wall = this.div.classList.contains("wall");
    this.start = this.div.classList.contains("start");
    this.end = this.div.classList.contains("end");
  }

  computeNeighbors(grid) {
    const n = {i: this.i - 1, j: this.j,};
    const e = {i: this.i, j: this.j + 1,};
    const s = {i: this.i + 1, j: this.j,};
    const w = {i: this.i, j: this.j - 1,};

    const ne = {i: this.i - 1, j: this.j + 1,};
    const nw = {i: this.i - 1, j: this.j - 1,};
    const se = {i: this.i + 1, j: this.j + 1,};
    const sw = {i: this.i + 1, j: this.j - 1,};

    this.neighbors = [n, e, s, w, ne, nw, se, sw]
      .filter(el => el.i >= 0 && el.j >= 0 && el.i < this.dim && el.j < this.dim && !el.wall)
      .map(el => grid[el.j + el.i * this.dim]);
  }

  updateView(type) {
    this.div.className = `cell ${type}`;
  }
}

const createGrid = () => {
  const gridDiv = document.querySelectorAll(".cell");
  const len = Math.sqrt(gridDiv.length);
  const grid = [];

  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len; j++) {
      grid.push(new Node(i, j));
    }
  }

  grid.forEach(e => e.computeNeighbors(grid));

  return grid;
}

const generatePath = node => {
  let tmp = node;
  let path = [];

  while(typeof tmp.parent !== "undefined") {
    path.push(tmp);
    tmp = tmp.parent;
  }

  return path;
}

const heuristics = (n1, n2) => {
  return Math.sqrt((n1.i - n2.i)**2 + (n1.j - n2.j)**2);
}

const findMinCostNode = open => {
  let min = null;
  open.forEach(e => min = min === null || min.f > e.f ? e : min);
  return min;
}

const a_star = (start, end) => {
  const closed = new Set();
  const open = new Set();
  open.add(start);

  start.g = 0;
  start.f = start.g + heuristics(start, end);

  let timer = window.setInterval(() => {
    if(open.size > 0) {
      let min = findMinCostNode(open);
      //console.log(min);
      if(min === end) {
        clearInterval(timer);
      }
      open.delete(min);
      closed.add(min);

      min.neighbors.forEach(neighbor => {
        if(!closed.has(neighbor) && !neighbor.wall) {
          let tentative = min.g + 1;
          let better = true;
          if(!open.has(neighbor)) open.add(neighbor);
          else if(tentative > neighbor.g) better = false;

          if(better) {
            neighbor.parent = min;
            neighbor.g = tentative;
            neighbor.f = neighbor.g + heuristics(neighbor, end);
          }
        }
      });
      open.forEach(el => el.updateView("open"));
      closed.forEach(el => el.updateView("closed"));
      generatePath(min).forEach(e => e.updateView("path"));
    }
    else clearInterval(timer);
  }, 50);
}
