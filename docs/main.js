const gridViewGenerator = new GridViewGenerator();
const algorithmAnimationManager = new AlgorithmAnimationManager(algorithmsBundle);
const initialDim = 10;
const machineCoordinator = new MachineCoordinator({
  gridViewGenerator,
  algorithmAnimationManager,
  dim: initialDim,
});

algorithmAnimationManager.grid = gridViewGenerator.setUpGrid(initialDim);
setUpMouseEvents();
setUpAnimationEvents();

function setUpMouseEvents() {
  const mouseDownHandler = (e) => {
    if(!e.target.classList.contains("cell")) return;
    if(e.button === 0) { //left button
      if(e.ctrlKey) {
        machineCoordinator.mouseMachine.execAction("ctrl");
      }
      else if(e.altKey) { // same action as wheel key
        machineCoordinator.mouseMachine.execAction("wheel");
      }
      else {
        machineCoordinator.mouseMachine.execAction("left");
      }
    }
    else if(e.button === 2){ //right button
      machineCoordinator.mouseMachine.execAction("right");
    }
    else if(e.button === 1){ //wheel button
      machineCoordinator.mouseMachine.execAction("wheel");
    }
    machineCoordinator.mouseMachine.execAction("move", e.target);
  };

  const mouseMoveHandler = (e) => {
    if(!e.target.classList.contains("cell")) return;
    machineCoordinator.mouseMachine.execAction("move", e.target);
  };

  const mouseUpHandler = (e) => {
    machineCoordinator.mouseMachine.release();
  };

  const root = document.querySelector(":root");
  root.addEventListener("mouseup", mouseUpHandler);
  root.addEventListener("mousemove", mouseMoveHandler);
  root.addEventListener("mousedown", mouseDownHandler);
}

function setUpAnimationEvents() {
  const wheelHandler = (e) => {
    machineCoordinator.animationMachine.execAction("scroll", e.deltaY);
  };

  const resetButtonClickHandler = (e) => {
    machineCoordinator.animationMachine.execAction("reset");
  };

  const startButtonClickHandler = (e) => {
    machineCoordinator.animationMachine.execAction("start");
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
