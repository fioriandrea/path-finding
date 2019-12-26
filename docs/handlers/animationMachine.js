class AnimationMachine {
  constructor(actions) {
    this.state = "idle";
    const self = this;
    this.transitions = {
      "idle": {
        start: () => {
          actions.start();
          self.state = "cell_check";
          self.execAction("check");
        },
        reset: () => {
          actions.reset();
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
          }
        },
      },
      "animation": {
        animate: () => {
          actions.animate()
          .then(f => self.execAction("animationEnd"));
        },
        reset: () => {
          actions.reset();
          self.state = "idle";
        },
        animationEnd: () => {
          actions.animationEnd();
          self.state = "idle";
        },
      },
    };
  }

  execAction(action, ...payload) {
    const actions = this.transitions[this.state];
    if(actions[action]) actions[action](...payload);
  }
}
