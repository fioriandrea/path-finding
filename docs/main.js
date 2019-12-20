let graphics = new Graphics();
let currentAction = "";
let animationEnded = false;
let mouseDown = false;
let dim = 10;

const mouseActions = {
  ctrl(e) {
    const i = parseInt(e.target.dataset.i);
    const j = parseInt(e.target.dataset.j);

    graphics.grid[j + i*dim].reset();
  },
  left(e) {
    const i = parseInt(e.target.dataset.i);
    const j = parseInt(e.target.dataset.j);

    graphics.grid[j + i*dim].reset();
    graphics.grid[j + i*dim].wall = true;
  },
  right(e) {
    const i = parseInt(e.target.dataset.i);
    const j = parseInt(e.target.dataset.j);

    const previousEnd = graphics.grid.find(e => e.end);
    if(previousEnd) previousEnd.reset();
    graphics.grid[j + i*dim].reset();
    graphics.grid[j + i*dim].end = true;
  },
  wheel(e) {
    const i = parseInt(e.target.dataset.i);
    const j = parseInt(e.target.dataset.j);

    const previousStart = graphics.grid.find(e => e.start);
    if(previousStart) previousStart.reset();
    graphics.grid[j + i*dim].reset();
    graphics.grid[j + i*dim].start = true;
  }
};

const mouseDownHandler = e => {
  mouseDown = true;
  if(animationEnded) {
    graphics.resetGrid(dim);
    animationEnded = false;
  }
  if(e.button === 0) { //left button
    if(e.ctrlKey) {
      currentAction = "ctrl";
    }
    else if(e.altKey) { // same action as wheel key
      currentAction = "wheel";
    }
    else {
      currentAction = "left";
    }
  }
  else if(e.button === 2){ //right button
    currentAction = "right";
  }
  else if(e.button === 1){ //wheel button
    currentAction = "wheel";
  }
  else mouseDown = false;

  if(!e.target.classList.contains("cell")) return;
  if(!mouseDown) return;

  mouseActions[currentAction](e);
};

const mouseUpHandler = e => {
  mouseDown = false;
}

const mouseMoveHandler = e => {
  if(!e.target.classList.contains("cell")) return;
  if(!mouseDown) return;

  mouseActions[currentAction](e);
}

const startButtonClickHandler = e => {
  const start = graphics.grid.find(e => e.start);
  const end = graphics.grid.find(e => e.end);

  if(typeof start === "undefined") {
    alert("You should place a starting point (mouse wheel button or mouse left button + alt)");
  }
  else if(typeof end === "undefined") {
    alert("You should place a destination point (mouse right button)");
  }
  else {
    animationEnded = true;
    a_star(start, end);
  }
}

const resetButtonClickHandler = e => {
  graphics.resetGrid(dim);
}

const wheelHandler = e => {
  if(e.deltaY > 0 && dim + 1 <= 45) dim++;
  else if(e.deltaY < 0 && dim - 1 >= 5) dim--;
  graphics.resetGrid(dim);
}

const setEvents = () => {
  const root = document.querySelector(":root");
  root.addEventListener("mouseup", mouseUpHandler);
  root.addEventListener("mousemove", mouseMoveHandler);
  root.addEventListener("mousedown", mouseDownHandler);
  root.addEventListener("wheel", wheelHandler);

  const startButton = document.querySelector(".startButton");
  startButton.addEventListener("click", startButtonClickHandler);

  const resetButton = document.querySelector(".resetButton");
  resetButton.addEventListener("click", resetButtonClickHandler);
}

setEvents();
graphics.resetGrid(dim);
