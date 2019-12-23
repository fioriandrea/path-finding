class AStar {
  constructor(grid, start, end) {
    this.grid = grid;
    this.start = start;
    this.end = end;
    this.going = false;
  }

  prelude() {
    this.closed = new Set();
    this.open = new Set();
    this.open.add(this.start);
    this.start.open = true;

    this.start.g = 0;
    this.start.f = this.start.g + heuristics(this.start, this.end);

    this.going = true;
  }

  proceed() {
    if(this.open.size > 0) {
      let min = findMinCostNode(this.open);
      if(min === this.end) {
        getPath(this.end).forEach(n => n.inPath = true);
        this.going = false;
      }
      this.open.delete(min);
      this.closed.add(min);
      min.closed = true;

      computeNeighbors(this.grid, min).forEach(neighbor => {
        if(!this.closed.has(neighbor)) {
          let tentative = min.g + euclideanDistance(min, neighbor);
          let better = true;
          if(!this.open.has(neighbor)) {
            this.open.add(neighbor);
            neighbor.open = true;
          }
          else if(tentative > neighbor.g) better = false;

          if(better) {
            neighbor.parent = min;
            neighbor.g = tentative;
            neighbor.f = neighbor.g + heuristics(neighbor, this.end);
          }
        }
      });
    }
    else this.going = false;
  }
}
