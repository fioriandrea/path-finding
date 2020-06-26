const setDefaultStartings = (grid) => {
      grid[0][0].start = true;
      grid[grid.length - 1][grid[0].length - 1].end = true;
};

class AnimationMachine {
  constructor(actions, children) {
    this.children = children;
    this.state = "idle";
    const self = this;
    this.transitions = {
      "idle": {
        start: () => {
          actions.start();
          self.blockChild("mouseMachine");
          self.state = "cell_check";
          self.execAction("check");
        },
        reset: () => {
          actions.hardReset();
        },
        scroll: (deltaY) => {
          actions.scroll(deltaY);
        },
      },
      "cell_check": {
        check: () => {
          const ok = actions.check();
          if(ok) {
            self.state = "animation";
            self.execAction("animate");
          }
          else {
             self.state = "idle";
             self.unlockChild("mouseMachine");
          }
        },
      },
      "animation": {
        animate: () => {
          actions.animate()
          .then(f => self.execAction("animationEnd"));
        },
        reset: () => {
          actions.softReset();
          self.unlockChild("mouseMachine");
          self.state = "idle";
        },
        animationEnd: () => {
          actions.animationEnd();
          self.unlockChild("mouseMachine");
          self.state = "idle";
        },
      },
    };
  }

  execAction(action, ...payload) {
    const actions = this.transitions[this.state];
    if(actions[action]) actions[action](...payload);
  }

  blockChild(name) {
    this.children[name].block();
  }

  unlockChild(name) {
    this.children[name].unlock();
  }
}

const makeAnimationActions = (extstate) => {
  return {
    start: () => {},

    hardReset: () => {
      extstate.algorithmAnimationManager.standardResetGrid();
    },

    softReset: () => {
      extstate.algorithmAnimationManager.going = false;
      extstate.algorithmAnimationManager.softResetGrid();
      document.querySelector(".resetButton").textContent = "Reset";
    },

    scroll: (deltaY) => {
      if(deltaY > 0 && extstate.dim + 1 <= 75) extstate.dim++;
      else if(deltaY < 0 && extstate.dim - 1 >= 5) extstate.dim--;
      extstate.algorithmAnimationManager.resize(extstate.gridViewGenerator, extstate.dim);
    },

    check: () => {
      extstate.algorithmAnimationManager.softResetGrid();

      let start;
      for(let i = 0; i < extstate.algorithmAnimationManager.grid.length; i++) {
        start = extstate.algorithmAnimationManager.grid[i].find(e => e.start);
        if(start) break;
      }
      let end;
      for(let i = 0; i < extstate.algorithmAnimationManager.grid.length; i++) {
        end = extstate.algorithmAnimationManager.grid[i].find(e => e.end);
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
        document.querySelector(".resetButton").textContent = "Stop";
        return true;
      }
    },

    animate: async () => {
      let start;
      for(let i = 0; i < extstate.algorithmAnimationManager.grid.length; i++) {
        start = extstate.algorithmAnimationManager.grid[i].find(e => e.start);
        if(start) break;
      }
      let end;
      for(let i = 0; i < extstate.algorithmAnimationManager.grid.length; i++) {
        end = extstate.algorithmAnimationManager.grid[i].find(e => e.end);
        if(end) break;
      }
      return extstate.algorithmAnimationManager.executeCurrent(start, end);
    },
    animationEnd: () => {
        document.querySelector(".resetButton").textContent = "Reset";
    },
  };
};
