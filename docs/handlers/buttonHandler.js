class ButtonHandler {
  constructor(graphics, algorithmManager) {
    this.graphics = graphics;
    this.algorithmManager = algorithmManager;
  }

  resetButtonClickHandler(e) {
    if(this.algorithmManager.animationGoing) {
      this.graphics.softResetGrid(this.graphics.grid.length);
    }
    else {
      this.graphics.standardResetGrid(this.graphics.grid.length);
    }
    this.algorithmManager.animationGoing = false;
  }

  startButtonClickHandler(e) {
    if(this.algorithmManager.animationGoing) return;

    this.graphics.softResetGrid();
    
    let start;
    for(let i = 0; i < this.graphics.grid.length; i++) {
      start = this.graphics.grid[i].find(e => e.start);
      if(start) break;
    }
    let end;
    for(let i = 0; i < this.graphics.grid.length; i++) {
      end = this.graphics.grid[i].find(e => e.end);
      if(end) break;
    }

    if(typeof start === "undefined") {
      alert("You should place a starting point (mouse wheel button or mouse left button + alt)");
    }
    else if(typeof end === "undefined") {
      alert("You should place a destination point (mouse right button)");
    }
    else {
      this.algorithmManager.a_star(this.graphics.grid, start, end);
    }
  }

  sliderChangeHandler(e) { // change class name or move this out
    const period = e.target.value;
    this.algorithmManager.period = period;
  }
}
