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
