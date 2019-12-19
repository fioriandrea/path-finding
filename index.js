const root = document.querySelector(":root");
const grid = document.querySelector("div.gridContainer");

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

let currentAction = "";
let animationStarted = false;
let mouseDown = false;

const mouseDownHandler = e => {
  mouseDown = true;
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
  if(animationStarted) return;
  if(!mouseDown) return;

  mouseActions[currentAction](e);
};

const mouseUpHandler = e => {
  mouseDown = false;
}

const mouseMoveHandler = e => {
  if(!e.target.classList.contains("cell")) return;
  if(animationStarted) return;
  if(!mouseDown) return;

  mouseActions[currentAction](e);
}

const setEvents = () => {
  root.addEventListener("mouseup", mouseUpHandler);
  root.addEventListener("mousemove", mouseMoveHandler);
  root.addEventListener("mousedown", mouseDownHandler);
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

setEvents();
resizeGrid(20);

for(let i = 0; i < 20*20; i++) {
  grid.appendChild(createCell());
}
// const cells = createNodes(20);
//
// let k = 0;
//
// let timer = window.setInterval(function(){
//     if(k >= 20*20) {
//       clearInterval(timer);
//     }
//     else {
//       cells[k].wall = true;
//       if(k%2 === 0) cells[k].end = true;
//       updateView(cells);
//       k++;
//     }
// }, 20);
