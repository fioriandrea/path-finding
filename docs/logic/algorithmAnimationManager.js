const algorithmsBundle = {
  "a_star": (grid, start, end) => new AStar(grid, start, end),
  "dijkstra": (grid, start, end) => new Dijkstra(grid, start, end),
  "depthFirst": (grid, start, end) => new DepthFirst(grid, start, end),
};

class AlgorithmAnimationManager {
  constructor(algorithmsBundle, grid=[]) {
    this.animationGoing = false;
    this.period = 10;
    this.grid = grid;
    this.current = "a_star";

    const self = this;
    this.algorithmsBundle = algorithmsBundle;
  }

  softResetGrid() {
    this.grid.forEach(r => r.forEach(cell => cell.graphDataReset()));
    this.animationGoing = false;
  }

  standardResetGrid() {
    this.grid.forEach(r => r.forEach(cell => cell.reset()));
    this.animationGoing = false;
  }

  resize(gridViewGenerator, dim) {
    this.grid = gridViewGenerator.setUpGrid(dim);
    this.grid[0][0].start = true; 
    this.grid[this.grid.length - 1][this.grid[0].length - 1].end = true; 
  }

  async executeCurrent(start, end) {
    this.animationGoing = true;
    const algo = this.algorithmsBundle[this.current](this.grid, start, end);
    algo.prelude();
    while(algo.going && this.animationGoing) {
      algo.proceed();
      await sleep(this.period);
    }
    this.animationGoing = false;
  }
}
