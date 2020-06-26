class TouchMachine {
  constructor(actions) {
    this.state = "idle";

    const self = this;
    //conditioned
    this.transitions = {
      "blocked": {},
      "idle": {
        touching: () => self.state = "touching",
      },
      "touching": {
        move: (cell) => {
          actions.touching(cell);
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

const makeTouchActions = (extstate) => {
  return {
    touching: (cell) => {
      extstate.algorithmAnimationManager.softResetGrid();
      const i = parseInt(cell.dataset.i);
      const j = parseInt(cell.dataset.j);
      extstate.algorithmAnimationManager.grid[i][j].reset();
      extstate.algorithmAnimationManager.grid[i][j].wall = true;
    },
  };
};
