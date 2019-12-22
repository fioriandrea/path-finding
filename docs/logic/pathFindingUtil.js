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

  return [n, e, s, w, ne, nw, se, sw]
        .filter(el => el.i >= 0 && el.j >= 0 && el.i < dim && el.j < dim)
        .map(el => grid[el.i][el.j])
        .filter(el => !el.wall &&
          !(grid[node.i][el.j].wall && grid[el.i][node.j].wall));
}

const euclideanDistance = (n1, n2) => {
  return Math.sqrt((n1.i - n2.i)**2 + (n1.j - n2.j)**2);
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
  open.forEach(e => min = min === null || min.f > e.f ? e : min);
  return min;
}
