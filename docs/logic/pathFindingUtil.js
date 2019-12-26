const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const computeNeighbors = (grid, node) => {
  const dim = grid.length;
  const n = {i: node.i - 1, j: node.j,};
  const e = {i: node.i, j: node.j + 1,};
  const s = {i: node.i + 1, j: node.j,};
  const w = {i: node.i, j: node.j - 1,};

  const ne = {i: node.i - 1, j: node.j + 1,};
  const nw = {i: node.i - 1, j: node.j - 1,};
  const se = {i: node.i + 1, j: node.j + 1,};
  const sw = {i: node.i + 1, j: node.j - 1,};

  return [ne, nw, se, sw, n, e, s, w]
        .filter(el => el.i >= 0 && el.j >= 0 && el.i < dim && el.j < dim)
        .map(el => grid[el.i][el.j])
        .filter(el => !el.wall &&
          !(grid[node.i][el.j].wall && grid[el.i][node.j].wall));
}

const octileDistance = (n1, n2) => {
  let di = Math.abs(n1.i - n2.i);
  let dj = Math.abs(n1.j - n2.j);
  return Math.abs(di - dj) + Math.sqrt(2)*Math.min(di, dj);
}

const heuristics = (n1, n2) => {
  return octileDistance(n1, n2);
}

const getPath = node => {
  let tmp = node;
  let path = [];

  while(tmp.parent !== null) {
    path.push(tmp);
    tmp = tmp.parent;
  }
  return path;
}

const findMinCostNode = open => {
  let min = null;
  open.forEach(e => {
    if(min === null || min.f > e.f) {
      min = e;
    }
    else if(min.f === e.f) {
      min = min.g < e.g ? e : min;
    }
  });
  return min;
}
