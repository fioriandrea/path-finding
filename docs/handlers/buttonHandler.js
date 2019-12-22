class ButtonHandler {
  constructor(graphics) {
    this.graphics = graphics;
  }

  resetButtonClickHandler(e) {
    this.graphics.standardResetGrid(this.graphics.grid.length);
  }

  startButtonClickHandler(e) {
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
      a_star(this.graphics.grid, start, end);
    }
  }
}
