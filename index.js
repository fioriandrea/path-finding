const root = document.querySelector(":root");
const grid = document.querySelector("div.gridContainer");
const mouseActions = {
  ctrl(e) {

  },
  alt(e) {

  },
  left(e) {
    e.target.classList.add("wall");
  },
  weel(e) {
    e.target.classList.remove("wall", "start", "end");
  },
};
let currentAction = "";
let animationStarted = false;
let mouseDown = false;

const mouseDownHandler = e => {
  mouseDown = true;

  if(e.button === 0) { //left button
    if(event.ctrlKey) { //place start
      currentAction = "ctrl";
    }
    else if(event.altKey) { //place end
      currentAction = "alt";
    }
    else {//walls
      currentAction = "left";
    }
  }
  else if(e.button === 1){ //right button
    //delete walls/start/end
    currentAction = "weel";
  }
};

const mouseUpHandler = e => mouseDown = false;

const mouseMoveHandler = e => {
  if(!e.target.classList.contains("cell")) return;
  if(animationStarted) return;
  if(!mouseDown) return;

  mouseActions[currentAction](e);
}

const createCell = () => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  return cell;
}

const resizeGrid = dim => {
  grid.style["grid-template-rows"] = `repeat(${dim}, 1fr)`;
  grid.style["grid-template-columns"] = `repeat(${dim}, 1fr)`;
}

const setEvents = () => {
  root.addEventListener("mouseup", mouseUpHandler);
  root.addEventListener("mousemove", mouseMoveHandler);
  root.addEventListener("mousedown", mouseDownHandler);
}

setEvents();
resizeGrid(20);

for(let i = 0; i < 20*20; i++) {
  grid.appendChild(createCell());
}
