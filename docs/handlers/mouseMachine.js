class MouseMachine {
  constructor(gridViewGenerator, algorithmAnimationManager) {
    this.algorithmAnimationManager = algorithmAnimationManager;
    this.gridViewGenerator = gridViewGenerator;

    this.state = "idle";
    const self = this;
    //conditioned
    this.transitions = {
      "blocked": {},
      "idle": {
        right: () => self.state = "right",
        left: () => self.state = "left",
        ctrl: () => self.state = "ctrl",
        wheel: () => self.state = "wheel",
      },
      "right": {
        move: (cell) => {
          self.algorithmAnimationManager.softResetGrid();
          const i = parseInt(cell.dataset.i);
          const j = parseInt(cell.dataset.j);

          self.algorithmAnimationManager.grid
          .forEach(r => {
            r.forEach(e => e.end = false);
          });

          self.algorithmAnimationManager.grid[i][j].reset();
          self.algorithmAnimationManager.grid[i][j].end = true;
        },
      },
      "left": {
        move: (cell) => {
          self.algorithmAnimationManager.softResetGrid();
          const i = parseInt(cell.dataset.i);
          const j = parseInt(cell.dataset.j);
          self.algorithmAnimationManager.grid[i][j].reset();
          self.algorithmAnimationManager.grid[i][j].wall = true;
        },
      },
      "ctrl": {
        move: (cell) => {
          self.algorithmAnimationManager.softResetGrid();
          const i = parseInt(cell.dataset.i);
          const j = parseInt(cell.dataset.j);
          self.algorithmAnimationManager.grid[i][j].reset();
        },
      },
      "wheel": {
        move: (cell) => {
          self.algorithmAnimationManager.softResetGrid();
          const i = parseInt(cell.dataset.i);
          const j = parseInt(cell.dataset.j);

          self.algorithmAnimationManager.grid
          .forEach(r => {
            r.forEach(e => e.start = false);
          });

          self.algorithmAnimationManager.grid[i][j].reset();
          self.algorithmAnimationManager.grid[i][j].start = true;
        },
      },
    };
  }

  execAction(action, ...payload) {
    const actions = this.transitions[this.state];
    if(actions[action]) actions[action](...payload);
  }
  //not conditioned
  block() {
    this.state = "blocked";
  }

  unlock() {
    this.state = "idle";
  }

  release() {
    if(this.state !== "blocked") {
      this.state = "idle";
    }
  }
}
