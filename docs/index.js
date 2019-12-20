let currentAction = "";
let animationEnded = false;
let mouseDown = false;
let dim = 10;

const mouseActions = {
  ctrl(e) {
    const nodesDivs = document.querySelectorAll(".cell");
    for(let i = 0; i < nodesDivs.length; i++) {
      nodesDivs[i].classList.remove("start");
    }
    e.target.className = "cell start";
  },
  alt(e) {
    const nodesDivs = document.querySelectorAll(".cell");
    for(let i = 0; i < nodesDivs.length; i++) {
      nodesDivs[i].classList.remove("end");
    }
    e.target.className = "cell end";
  },
  left(e) {
    e.target.className = "cell wall";
  },
  right(e) {
    e.target.className = "cell";
  },
};

const mouseDownHandler = e => {
  mouseDown = true;
  if(animationEnded) {
    document.querySelectorAll(".cell")
    .forEach(el => el.className = "cell");
    animationEnded = false;
  }
  if(e.button === 0) { //left button
    if(e.ctrlKey) {
      currentAction = "ctrl";
    }
    else if(e.altKey) {
      currentAction = "alt";
    }
    else {
      currentAction = "left";
    }
  }
  else if(e.button === 2){ //right button
    currentAction = "right";
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
  const cells = createGrid();
  const start = cells.find(e => e.start);
  const end = cells.find(e => e.end);

  if(typeof start === "undefined") {
    alert("You should place a starting point (ctrl + mouse left)");
  }
  else if(typeof end === "undefined") {
    alert("You should place a destination point (alt + mouse left)");
  }
  else {
    animationEnded = true;
    a_star(start, end);
  }
}

const resetButtonClickHandler = e => {
  document.querySelectorAll(".cell")
  .forEach(el => el.className = "cell");
}

const createCell = () => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  return cell;
}

const resizeGrid = dim => {
  const grid = document.querySelector("div.gridContainer");
  grid.style["grid-template-rows"] = `repeat(${dim}, 1fr)`;
  grid.style["grid-template-columns"] = `repeat(${dim}, 1fr)`;
}

const wheelHandler = e => {
  const grid = document.querySelector("div.gridContainer");
  if(e.deltaY > 0 && dim + 1 <= 45) dim++;
  else if(e.deltaY < 0 && dim - 1 >= 5) dim--;
  grid.innerHTML = "";
  resizeGrid(dim);
  for(let i = 0; i < dim*dim; i++) grid.appendChild(createCell());
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
resizeGrid(dim);

for(let i = 0; i < dim*dim; i++) {
  document.querySelector("div.gridContainer").appendChild(createCell());
}
