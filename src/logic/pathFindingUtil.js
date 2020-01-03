const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const computeNeighbors = (grid, node) => {
  const dim = grid.length;
  const neighbors = [];

  for(let i = -1; i <= 1; i++) {
    for(let j = -1; j <= 1; j++) {
      if(i === 0 && j === 0) continue;
      let ni = i + node.i;
      let nj = j + node.j;
      if(!(ni >= 0 && nj >= 0 && ni < dim && nj < dim)) continue;
      let el = grid[ni][nj];
      if(el.wall || grid[node.i][el.j].wall && grid[el.i][node.j].wall) continue;
      neighbors.push(grid[ni][nj]);
    }
  }

  return neighbors;
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
