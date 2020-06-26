const gridViewGenerator = new GridViewGenerator();
const algorithmAnimationManager = new AlgorithmAnimationManager(algorithmsBundle);
const initialDim = 15;

const makeMouseMachine = () => {
  return new MouseMachine(makeMouseActions({
    algorithmAnimationManager,
  }));
};

const makeTouchMachine = () => {
    return new TouchMachine(makeTouchActions({
        algorithmAnimationManager,
    }));
};

const makeAnimationMachine = (mouseMachine, touchMachine) => {
  return new AnimationMachine(makeAnimationActions({
    algorithmAnimationManager,
    gridViewGenerator,
    dim: initialDim,
  }), {
    "mouseMachine": mouseMachine,
    "touchMachine": touchMachine,
  });
};

const mouseMachine = makeMouseMachine();
const touchMachine = makeTouchMachine();
const animationMachine = makeAnimationMachine(mouseMachine, touchMachine);

const machines = {
  mouseMachine: mouseMachine,
  touchMachine: touchMachine,
  animationMachine: animationMachine,
};

algorithmAnimationManager.resize(gridViewGenerator, initialDim);
setUpMouseEvents();
setUpTouchEvents();
setUpAnimationEvents();

function setUpMouseEvents() {
  const mouseDownHandler = (e) => {
    if(!e.target.classList.contains("cell")) return;
    if(e.button === 0) { //left button
      if(e.ctrlKey) {
        machines.mouseMachine.execAction("ctrl");
      }
      else if(e.shiftKey) { // same action as wheel key
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

function setUpTouchEvents() {
  const touchStartHandler = (e) => {
    if(!e.target.classList.contains("cell")) return;
        machines.touchMachine.execAction("touching");
    machines.touchMachine.execAction("move", e.target);
  };

  const touchMoveHandler = (e) => {
    if(!e.target.classList.contains("cell")) return;
    machines.touchMachine.execAction("move", e.target);
  };

  const touchEndHandler = (e) => {
    machines.touchMachine.release();
  };

  const root = document.querySelector(":root");
  root.addEventListener("touchStart", touchStartHandler);
  root.addEventListener("touchmove", touchMoveHandler);
  root.addEventListener("touchend", touchEndHandler);
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

function gridDimension() {
  let grd = document.querySelector("div.gridContainer");
  if (window.innerWidth > 900) {
    let dim = Math.max(parseInt(getComputedStyle(grd).height, 10),
                       parseInt(getComputedStyle(grd).width, 10)) + "px";
    grd.style.height = dim;
    grd.style.width = dim
  } else {
    grd.style.width = "80%";
    grd.style.height = "100%";
  }
}

gridDimension();

window.addEventListener("resize", gridDimension);
