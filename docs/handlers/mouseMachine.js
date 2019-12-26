class MouseMachine {
  constructor(actions) {
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
          actions.rightClick(cell);
        },
      },
      "left": {
        move: (cell) => {
          actions.leftClick(cell);
        },
      },
      "ctrl": {
        move: (cell) => {
          actions.ctrlClick(cell);
        },
      },
      "wheel": {
        move: (cell) => {
          actions.wheelClick(cell);
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

const makeMouseActions = (extstate) => {
  return {
    leftClick: (cell) => {
      extstate.algorithmAnimationManager.softResetGrid();
      const i = parseInt(cell.dataset.i);
      const j = parseInt(cell.dataset.j);
      extstate.algorithmAnimationManager.grid[i][j].reset();
      extstate.algorithmAnimationManager.grid[i][j].wall = true;
    },

    rightClick: (cell) => {
      extstate.algorithmAnimationManager.softResetGrid();
      const i = parseInt(cell.dataset.i);
      const j = parseInt(cell.dataset.j);

      extstate.algorithmAnimationManager.grid
      .forEach(r => {
        r.forEach(e => e.end = false);
      });

      extstate.algorithmAnimationManager.grid[i][j].reset();
      extstate.algorithmAnimationManager.grid[i][j].end = true;
    },

    ctrlClick: (cell) => {
      extstate.algorithmAnimationManager.softResetGrid();
      const i = parseInt(cell.dataset.i);
      const j = parseInt(cell.dataset.j);
      extstate.algorithmAnimationManager.grid[i][j].reset();
    },

    wheelClick: (cell) => {
      extstate.algorithmAnimationManager.softResetGrid();
      const i = parseInt(cell.dataset.i);
      const j = parseInt(cell.dataset.j);

      extstate.algorithmAnimationManager.grid
      .forEach(r => {
        r.forEach(e => e.start = false);
      });

      extstate.algorithmAnimationManager.grid[i][j].reset();
      extstate.algorithmAnimationManager.grid[i][j].start = true;
    },
  };
};
