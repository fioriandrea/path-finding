class WindowMachine {
  constructor(gridViewGenerator, algorithmAnimationManager, mouseMachine, initialDim) {
    this.algorithmAnimationManager = algorithmAnimationManager;
    this.gridViewGenerator = gridViewGenerator;
    this.dim = initialDim;

    this.mouseMachine = mouseMachine;

    this.state = "idle";
    const self = this;
    this.transitions = {
      "idle": {
        start: () => {
          self.state = "cell_check";
          self.execAction("check");
          self.mouseMachine.block();
        },
        reset: () => {
          self.algorithmAnimationManager.standardResetGrid();
        },
        scroll: (deltaY) => {
          if(deltaY > 0 && this.dim + 1 <= 75) self.dim++;
          else if(deltaY < 0 && this.dim - 1 >= 5) self.dim--;
          self.algorithmAnimationManager.grid = self.gridViewGenerator.setUpGrid(self.dim);
        },
      },
      "cell_check": {
        check: () => {
          self.algorithmAnimationManager.softResetGrid();

          let start;
          for(let i = 0; i < self.algorithmAnimationManager.grid.length; i++) {
            start = self.algorithmAnimationManager.grid[i].find(e => e.start);
            if(start) break;
          }
          let end;
          for(let i = 0; i < self.algorithmAnimationManager.grid.length; i++) {
            end = self.algorithmAnimationManager.grid[i].find(e => e.end);
            if(end) break;
          }

          if(typeof start === "undefined") {
            alert("You should place a starting point (mouse wheel button or mouse left button + alt)");
            self.state = "idle";
          }
          else if(typeof end === "undefined") {
            alert("You should place a destination point (mouse right button)");
            self.state = "idle";
          }
          else {
            self.state = "animation";
            self.execAction("animate", start, end);
          }
        },
      },
      "animation": {
        animate: (start, end) => {
          self.algorithmAnimationManager.executeCurrent(start, end)
          .then(f => self.execAction("animationEnd"));
        },
        reset: () => {
          self.algorithmAnimationManager.going = false;
          self.algorithmAnimationManager.softResetGrid();
          self.state = "idle";
          self.mouseMachine.unlock();
        },
        animationEnd: () => {
          self.state = "idle";
          self.mouseMachine.unlock();
        },
      },
    };
  }

  execAction(action, ...payload) {
    const actions = this.transitions[this.state];
    if(actions[action]) actions[action](...payload);
  }
}
