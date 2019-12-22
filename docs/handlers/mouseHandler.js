class MouseHandler {
  constructor(graphics, algorithmManager) {
    this.graphics = graphics;
    this.algorithmManager = algorithmManager;
    this.currentAction = "";
    this.mouseDown = false;
    this.dim = 10;
    const self = this;
    this.mouseActions = {
      ctrl(e) {
        if(self.algorithmManager.animationGoing) return;

        self.graphics.softResetGrid();
        const i = parseInt(e.target.dataset.i);
        const j = parseInt(e.target.dataset.j);

        self.graphics.grid[i][j].reset();
      },
      left(e) {
        if(self.algorithmManager.animationGoing) return;

        self.graphics.softResetGrid();
        const i = parseInt(e.target.dataset.i);
        const j = parseInt(e.target.dataset.j);
        self.graphics.grid[i][j].reset();
        self.graphics.grid[i][j].wall = true;
      },
      right(e) {
        if(self.algorithmManager.animationGoing) return;

        self.graphics.softResetGrid();
        const i = parseInt(e.target.dataset.i);
        const j = parseInt(e.target.dataset.j);

        let previousEnd;
        for(let i = 0; i < self.dim; i++) {
          previousEnd = self.graphics.grid[i].find(e => e.end);
          if(previousEnd) break;
        }
        if(previousEnd) previousEnd.reset();
        self.graphics.grid[i][j].reset();
        self.graphics.grid[i][j].end = true;
      },
      wheel(e) {
        if(self.algorithmManager.animationGoing) return;

        self.graphics.softResetGrid();
        const i = parseInt(e.target.dataset.i);
        const j = parseInt(e.target.dataset.j);

        let previousStart;
        for(let i = 0; i < self.dim; i++) {
          previousStart = self.graphics.grid[i].find(e => e.start);
          if(previousStart) break;
        }
        //console.log(previousStart);
        if(previousStart) previousStart.reset();
        self.graphics.grid[i][j].reset();
        self.graphics.grid[i][j].start = true;
      }
    };
    this.graphics.hardResetGrid(this.dim);
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
    if(this.algorithmManager.animationGoing) return;
    if(e.deltaY > 0 && this.dim + 1 <= 75) this.dim++;
    else if(e.deltaY < 0 && this.dim - 1 >= 5) this.dim--;
    this.graphics.hardResetGrid(this.dim);
  }
}
