class DepthFirst {
  constructor(grid, start, end) {
    this.grid = grid;
    this.start = start;
    this.end = end;
    this.going = false;
  }

  prelude() {
    this.visited = new Set();
    this.stack = [this.start];
    this.start.open = true;
    this.visited.add(this.start);

    this.going = true;
  }

  proceed() {
    if(this.stack.length > 0) {
      let current = this.stack.pop();
      if(current === this.end) {
        getPath(this.end).forEach(n => n.inPath = true);
        this.going = false;
      }
      else {
        current.closed = true;
        computeNeighbors(this.grid, current).forEach(neighbor => {
            if(!this.visited.has(neighbor)) {
              this.stack.push(neighbor);
              this.visited.add(neighbor);
              neighbor.parent = current;
              neighbor.open = true;
            }
        });
      }
    }
    else this.going = false;
  }
}
