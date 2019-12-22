class AlgorithmManager {
  constructor() {
    this.animationGoing = false;
    this.period = 10;
    this.timer = null;
  }

  heuristics(n1, n2) {
    return euclideanDistance(n1, n2);
  }

  async a_star(grid, start, end) {
    this.animationGoing = true;
    const closed = new Set();
    const open = new Set();
    open.add(start);
    start.open = true;

    start.g = 0;
    start.f = start.g + this.heuristics(start, end);

    while(open.size > 0 && this.animationGoing) {
      let min = findMinCostNode(open);
      if(min === end) {
        getPath(end).forEach(n => n.inPath = true);
        this.animationGoing = false;
        return;
      }
      open.delete(min);
      closed.add(min);
      min.closed = true;

      computeNeighbors(grid, min).forEach(neighbor => {
        if(!closed.has(neighbor)) {
          let tentative = min.g + euclideanDistance(min, neighbor);
          let better = true;
          if(!open.has(neighbor)) {
            open.add(neighbor);
            neighbor.open = true;
          }
          else if(tentative > neighbor.g) better = false;

          if(better) {
            neighbor.parent = min;
            neighbor.g = tentative;
            neighbor.f = neighbor.g + this.heuristics(neighbor, end);
          }
        }
      });
      await sleep(this.period);
    }
    this.animationGoing = false;
  }
}
