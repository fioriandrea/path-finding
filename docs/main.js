const gridViewGenerator = new GridViewGenerator();
const algorithmAnimationManager = new AlgorithmAnimationManager(algorithmsBundle);
const initialDim = 10;
const mouseMachine = new MouseMachine(gridViewGenerator, algorithmAnimationManager);
const windowMachine = new WindowMachine(gridViewGenerator, algorithmAnimationManager, mouseMachine, initialDim);

algorithmAnimationManager.grid = gridViewGenerator.setUpGrid(initialDim);
setUpEvents();

function setUpMouseEvents() {
  const mouseDownHandler = (e) => {
    if(!e.target.classList.contains("cell")) return;
    if(e.button === 0) { //left button
      if(e.ctrlKey) {
        mouseMachine.execAction("ctrl");
      }
      else if(e.altKey) { // same action as wheel key
        mouseMachine.execAction("wheel");
      }
      else {
        mouseMachine.execAction("left");
      }
    }
    else if(e.button === 2){ //right button
      mouseMachine.execAction("right");
    }
    else if(e.button === 1){ //wheel button
      mouseMachine.execAction("wheel");
    }
    mouseMachine.execAction("move", e.target);
  };

  const mouseMoveHandler = (e) => {
    if(!e.target.classList.contains("cell")) return;
    mouseMachine.execAction("move", e.target);
  };

  const mouseUpHandler = (e) => {
    mouseMachine.release();
  };

  const root = document.querySelector(":root");
  root.addEventListener("mouseup", mouseUpHandler);
  root.addEventListener("mousemove", mouseMoveHandler);
  root.addEventListener("mousedown", mouseDownHandler);
}

function setUpEvents() {
  setUpMouseEvents();

  const wheelHandler = (e) => {
    windowMachine.execAction("scroll", e.deltaY);
  };

  const resetButtonClickHandler = (e) => {
    windowMachine.execAction("reset");
  };

  const startButtonClickHandler = (e) => {
    windowMachine.execAction("start");
  };

  const sliderChangeHandler = (e) => {
    //outside state machines
    const period = e.target.value;
    algorithmAnimationManager.period = period;
  }

  const startButton = document.querySelector(".startButton");
  startButton.addEventListener("click", startButtonClickHandler);

  const resetButton = document.querySelector(".resetButton");
  resetButton.addEventListener("click", resetButtonClickHandler);

  const slider = document.querySelector(".slider");
  slider.addEventListener("input", sliderChangeHandler);

  const root = document.querySelector(":root");
  root.addEventListener("wheel", wheelHandler);
}
