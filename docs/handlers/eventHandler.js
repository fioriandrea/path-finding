class EventHandler {
  constructor(gridViewGenerator, algorithmAnimationManager) {
    this.gridViewGenerator = gridViewGenerator;
    this.algorithmAnimationManager = algorithmAnimationManager;
    this.currentAction = "";
    this.mouseDown = false;
    this.dim = 10;

    const self = this;
    this.mouseActions = {
      ctrl(e) {
        if(self.algorithmAnimationManager.animationGoing) return;

        self.algorithmAnimationManager.softResetGrid();
        const i = parseInt(e.target.dataset.i);
        const j = parseInt(e.target.dataset.j);
        self.algorithmAnimationManager.grid[i][j].reset();
      },
      left(e) {
        if(self.algorithmAnimationManager.animationGoing) return;

        self.algorithmAnimationManager.softResetGrid();
        const i = parseInt(e.target.dataset.i);
        const j = parseInt(e.target.dataset.j);
        self.algorithmAnimationManager.grid[i][j].reset();
        self.algorithmAnimationManager.grid[i][j].wall = true;
      },
      right(e) {
        if(self.algorithmAnimationManager.animationGoing) return;

        self.algorithmAnimationManager.softResetGrid(self.algorithmAnimationManager.grid);
        const i = parseInt(e.target.dataset.i);
        const j = parseInt(e.target.dataset.j);

        let previousEnd;
        for(let i = 0; i < self.dim; i++) {
          previousEnd = self.algorithmAnimationManager.grid[i].find(e => e.end);
          if(previousEnd) break;
        }
        if(previousEnd) previousEnd.reset();
        self.algorithmAnimationManager.grid[i][j].reset();
        self.algorithmAnimationManager.grid[i][j].end = true;
      },
      wheel(e) {
        if(self.algorithmAnimationManager.animationGoing) return;

        self.algorithmAnimationManager.softResetGrid();
        const i = parseInt(e.target.dataset.i);
        const j = parseInt(e.target.dataset.j);

        let previousStart;
        for(let i = 0; i < self.dim; i++) {
          previousStart = self.algorithmAnimationManager.grid[i].find(e => e.start);
          if(previousStart) break;
        }
        //console.log(previousStart);
        if(previousStart) previousStart.reset();
        self.algorithmAnimationManager.grid[i][j].reset();
        self.algorithmAnimationManager.grid[i][j].start = true;
      }
    };
    this.algorithmAnimationManager.grid = this.gridViewGenerator.setUpGrid(this.dim);
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    if(e.button === 0) { //left button
      if(e.ctrlKey) {
        this.currentAction = "ctrl";
      }
      else if(e.altKey) { // same action as wheel key
        this.currentAction = "wheel";
      }
      else {
        this.currentAction = "left";
      }
    }
    else if(e.button === 2){ //right button
      this.currentAction = "right";
    }
    else if(e.button === 1){ //wheel button
      this.currentAction = "wheel";
    }
    else this.mouseDown = false;

    if(!e.target.classList.contains("cell")) return;
    if(!this.mouseDown) return;

    this.mouseActions[this.currentAction](e);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  mouseMoveHandler(e) {
    if(!e.target.classList.contains("cell")) return;
    if(!this.mouseDown) return;

    this.mouseActions[this.currentAction](e);
  }

  wheelHandler(e) {
    if(this.algorithmAnimationManager.animationGoing) return;
    if(e.deltaY > 0 && this.dim + 1 <= 75) this.dim++;
    else if(e.deltaY < 0 && this.dim - 1 >= 5) this.dim--;
    this.algorithmAnimationManager.grid = this.gridViewGenerator.setUpGrid(this.dim);
  }

  resetButtonClickHandler(e) {
    if(this.algorithmAnimationManager.animationGoing) {
      this.algorithmAnimationManager.softResetGrid();
    }
    else {
      this.algorithmAnimationManager.standardResetGrid();
    }
    this.algorithmAnimationManager.animationGoing = false;
  }

  startButtonClickHandler(e) {
    if(this.algorithmAnimationManager.animationGoing) return;

    this.algorithmAnimationManager.softResetGrid();

    let start;
    for(let i = 0; i < this.algorithmAnimationManager.grid.length; i++) {
      start = this.algorithmAnimationManager.grid[i].find(e => e.start);
      if(start) break;
    }
    let end;
    for(let i = 0; i < this.algorithmAnimationManager.grid.length; i++) {
      end = this.algorithmAnimationManager.grid[i].find(e => e.end);
      if(end) break;
    }

    if(typeof start === "undefined") {
      alert("You should place a starting point (mouse wheel button or mouse left button + alt)");
    }
    else if(typeof end === "undefined") {
      alert("You should place a destination point (mouse right button)");
    }
    else {
      this.algorithmAnimationManager.executeCurrent(start, end);
    }
  }

  sliderChangeHandler(e) {
    const period = e.target.value;
    this.algorithmAnimationManager.period = period;
  }
}
