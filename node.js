const viewUpdaterFactory = nodeDiv => node => {
  nodeDiv.className = "cell";
  if(node.wall) nodeDiv.classList.add("wall");
  else if(node.start) nodeDiv.classList.add("start");
  else if(node.end) nodeDiv.classList.add("end");

  if(node.open) nodeDiv.classList.add("open");
  else if(node.closed) nodeDiv.classList.add("closed");

  if(node.inPath) nodeDiv.classList.add("path");
}

class Node {
  constructor(i, j, viewUpdater) {
    this.i = i;
    this.j = j;
    this.g = Infinity;
    this.f = Infinity;
    this.viewUpdater = viewUpdater;
    //duplication
    this.parent = null; //might move view under this stuff
    this._wall = false; //(trying to update cells not placed)
    this._start = false;
    this._end = false;
    this._open = false;
    this._closed = false;
    this._inPath = false;
  }

  reset() {
    this.parent = null;
    this._wall = false;
    this._start = false;
    this._end = false;
    this._open = false;
    this._closed = false;
    this._inPath = false;
    this.callViewUpdater(this);
  }

  callViewUpdater() {
    if(this.viewUpdater) this.viewUpdater(this);
  }

  get wall() {
    return this._wall;
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get open() {
    return this._open;
  }

  get closed() {
    return this._closed;
  }

  get inPath() {
    return this._inPath;
  }

  set wall(newValue) {
    this._wall = newValue;
    this.callViewUpdater();
  }

  set start(newValue) {
    this._start = newValue;
    this.callViewUpdater();
  }

  set end(newValue) {
    this._end = newValue;
    this.callViewUpdater();
  }

  set open(newValue) {
    this._open = newValue;
    this.callViewUpdater();
  }

  set closed(newValue) {
    this._closed = newValue;
    this.callViewUpdater();
  }

  set inPath(newValue) {
    this._inPath = newValue;
    this.callViewUpdater();
  }
}

const computeNeighbors = (grid, node) => {
  const n = {i: node.i - 1, j: node.j,};
  const e = {i: node.i, j: node.j + 1,};
  const s = {i: node.i + 1, j: node.j,};
  const w = {i: node.i, j: node.j - 1,};

  const ne = {i: node.i - 1, j: node.j + 1,};
  const nw = {i: node.i - 1, j: node.j - 1,};
  const se = {i: node.i + 1, j: node.j + 1,};
  const sw = {i: node.i + 1, j: node.j - 1,};

  return [n, e, s, w, ne, nw, se, sw]
        .filter(el => el.i >= 0 && el.j >= 0 && el.i < dim && el.j < dim)
        .map(el => grid[el.i][el.j])
        .filter(el => !el.wall &&
          !grid[node.i][el.j].wall && !grid[el.i][node.j].wall);
}

const heuristics = (n1, n2) => {
  return Math.sqrt((n1.i - n2.i)**2 + (n1.j - n2.j)**2);
}

const getPath = node => {
  let tmp = node;
  let path = [];

  while(tmp.parent !== null) {
    path.push(tmp);
    tmp = tmp.parent;
  }
  //console.log(path);
  return path;
}

const findMinCostNode = open => {
  let min = null;
  open.forEach(e => min = min === null || min.f > e.f ? e : min);
  return min;
}

const a_star = (grid, start, end, speed=40) => {
  const closed = new Set();
  const open = new Set();
  open.add(start);
  start.open = true;

  start.g = 0;
  start.f = start.g + heuristics(start, end);

  let timer = window.setInterval(() => {
    if(open.size > 0) {
      let min = findMinCostNode(open);
      //console.log(min);
      if(min === end) {
        getPath(end).forEach(n => n.inPath = true);
        clearInterval(timer);
      }
      open.delete(min);
      closed.add(min);
      min.open = false;
      min.closed = true;

      computeNeighbors(grid, min).forEach(neighbor => {
        if(!closed.has(neighbor)) {
          let tentative = min.g + 1;
          let better = true;
          if(!open.has(neighbor)) {
            open.add(neighbor);
            neighbor.open = true;
          }
          else if(tentative > neighbor.g) better = false;

          if(better) {
            neighbor.parent = min;
            neighbor.g = tentative;
            neighbor.f = neighbor.g + heuristics(neighbor, end);
          }
        }
      });
    }
    else clearInterval(timer);
  }, speed);
}
