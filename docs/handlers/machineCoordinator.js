class MachineCoordinator {
  constructor(state) {
    this.mouseMachine = new MouseMachine({
      leftClick: (cell) => this.leftClick(cell),
      rightClick: (cell) => this.rightClick(cell),
      ctrlClick: (cell) => this.ctrlClick(cell),
      wheelClick: (cell) => this.wheelClick(cell),
    });

    this.animationMachine = new AnimationMachine({
      start: () => this.start(),
      reset: () => this.reset(),
      scroll: (deltaY) => this.scroll(deltaY),
      check: () => this.check(),
      animate: () => this.animate(),
      animationEnd: () => this.animationEnd(),
    });

    this.state = state;
  }

  leftClick(cell) {
    this.state.algorithmAnimationManager.softResetGrid();
    const i = parseInt(cell.dataset.i);
    const j = parseInt(cell.dataset.j);
    this.state.algorithmAnimationManager.grid[i][j].reset();
    this.state.algorithmAnimationManager.grid[i][j].wall = true;
  }

  rightClick(cell) {
    this.state.algorithmAnimationManager.softResetGrid();
    const i = parseInt(cell.dataset.i);
    const j = parseInt(cell.dataset.j);

    this.state.algorithmAnimationManager.grid
    .forEach(r => {
      r.forEach(e => e.end = false);
    });

    this.state.algorithmAnimationManager.grid[i][j].reset();
    this.state.algorithmAnimationManager.grid[i][j].end = true;
  }

  ctrlClick(cell) {
    this.state.algorithmAnimationManager.softResetGrid();
    const i = parseInt(cell.dataset.i);
    const j = parseInt(cell.dataset.j);
    this.state.algorithmAnimationManager.grid[i][j].reset();
  }

  wheelClick(cell) {
    this.state.algorithmAnimationManager.softResetGrid();
    const i = parseInt(cell.dataset.i);
    const j = parseInt(cell.dataset.j);

    this.state.algorithmAnimationManager.grid
    .forEach(r => {
      r.forEach(e => e.start = false);
    });

    this.state.algorithmAnimationManager.grid[i][j].reset();
    this.state.algorithmAnimationManager.grid[i][j].start = true;
  }

  start() {
    this.mouseMachine.block();
  }

  reset() {
    if(this.animationMachine.state === "idle") {
      this.state.algorithmAnimationManager.standardResetGrid();
    }
    else if(this.animationMachine.state === "animation") {
      this.state.algorithmAnimationManager.going = false;
      this.state.algorithmAnimationManager.softResetGrid();
      this.mouseMachine.unlock();
    }
  }

  scroll(deltaY) {
    if(deltaY > 0 && this.state.dim + 1 <= 75) this.state.dim++;
    else if(deltaY < 0 && this.state.dim - 1 >= 5) this.state.dim--;
    this.state.algorithmAnimationManager.grid = this.state.gridViewGenerator.setUpGrid(this.state.dim);
  }

  check() {
    this.state.algorithmAnimationManager.softResetGrid();

    let start;
    for(let i = 0; i < this.state.algorithmAnimationManager.grid.length; i++) {
      start = this.state.algorithmAnimationManager.grid[i].find(e => e.start);
      if(start) break;
    }
    let end;
    for(let i = 0; i < this.state.algorithmAnimationManager.grid.length; i++) {
      end = this.state.algorithmAnimationManager.grid[i].find(e => e.end);
      if(end) break;
    }

    if(typeof start === "undefined") {
      alert("You should place a starting point (mouse wheel button or mouse left button + alt)");
      return false;
    }
    else if(typeof end === "undefined") {
      alert("You should place a destination point (mouse right button)");
      return false;
    }
    else {
      return true;
    }
  }

  async animate() {
    let start;
    for(let i = 0; i < this.state.algorithmAnimationManager.grid.length; i++) {
      start = this.state.algorithmAnimationManager.grid[i].find(e => e.start);
      if(start) break;
    }
    let end;
    for(let i = 0; i < this.state.algorithmAnimationManager.grid.length; i++) {
      end = this.state.algorithmAnimationManager.grid[i].find(e => e.end);
      if(end) break;
    }
    return this.state.algorithmAnimationManager.executeCurrent(start, end);
  }

  animationEnd() {
    this.mouseMachine.unlock();
  }
}
