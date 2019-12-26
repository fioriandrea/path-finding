const gridViewGenerator = new GridViewGenerator();
const algorithmAnimationManager = new AlgorithmAnimationManager(algorithmsBundle);
const initialDim = 10;

const makeMouseMachine = () => {
  return new MouseMachine(makeMouseActions({
    algorithmAnimationManager,
  }));
};

const makeAnimationMachine = (mouseMachine) => {
  return new AnimationMachine(makeAnimationActions({
    algorithmAnimationManager,
    gridViewGenerator,
    dim: initialDim,
  }), {
    "mouseMachine": mouseMachine,
  });
};

const mouseMachine = makeMouseMachine();
const animationMachine = makeAnimationMachine(mouseMachine);

const machines = {
  mouseMachine: mouseMachine,
  animationMachine: animationMachine,
};

algorithmAnimationManager.grid = gridViewGenerator.setUpGrid(initialDim);
setUpMouseEvents();
setUpAnimationEvents();

function setUpMouseEvents() {
  const mouseDownHandler = (e) => {
    if(!e.target.classList.contains("cell")) return;
    if(e.button === 0) { //left button
      if(e.ctrlKey) {
        machines.mouseMachine.execAction("ctrl");
      }
      else if(e.altKey) { // same action as wheel key
        machines.mouseMachine.execAction("wheel");
      }
      else {
        machines.mouseMachine.execAction("left");
      }
    }
    else if(e.button === 2){ //right button
      machines.mouseMachine.execAction("right");
    }
    else if(e.button === 1){ //wheel button
      machines.mouseMachine.execAction("wheel");
    }
    machines.mouseMachine.execAction("move", e.target);
  };

  const mouseMoveHandler = (e) => {
    if(!e.target.classList.contains("cell")) return;
    machines.mouseMachine.execAction("move", e.target);
  };

  const mouseUpHandler = (e) => {
    machines.mouseMachine.release();
  };

  const root = document.querySelector(":root");
  root.addEventListener("mouseup", mouseUpHandler);
  root.addEventListener("mousemove", mouseMoveHandler);
  root.addEventListener("mousedown", mouseDownHandler);
}

function setUpAnimationEvents() {
  const wheelHandler = (e) => {
    machines.animationMachine.execAction("scroll", e.deltaY);
  };

  const resetButtonClickHandler = (e) => {
    machines.animationMachine.execAction("reset");
  };

  const startButtonClickHandler = (e) => {
    machines.animationMachine.execAction("start");
  };

  const sliderChangeHandler = (e) => {
    //outside state machines
    const period = e.target.value;
    algorithmAnimationManager.period = period;
  };

  const algoChange = (e) => {
    //outside state machines
    if(e.target.checked) {
      algorithmAnimationManager.current = e.target.value;
    }
  };

  const startButton = document.querySelector(".startButton");
  startButton.addEventListener("click", startButtonClickHandler);

  const resetButton = document.querySelector(".resetButton");
  resetButton.addEventListener("click", resetButtonClickHandler);

  const slider = document.querySelector(".slider");
  slider.addEventListener("input", sliderChangeHandler);

  const root = document.querySelector(":root");
  root.addEventListener("wheel", wheelHandler);

  const radios = document.querySelectorAll(".algorithmsContainer input");
  radios.forEach(r => r.addEventListener("click", algoChange));
}
