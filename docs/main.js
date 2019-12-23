const graphics = new Graphics();
const algorithmAnimationManager = new AlgorithmAnimationManager(algorithmsBundle);
const eventHandler = new EventHandler(graphics, algorithmAnimationManager);

const setEvents = () => {
  const root = document.querySelector(":root");
  root.addEventListener("mouseup", e => eventHandler.mouseUpHandler(e));
  root.addEventListener("mousemove", e => eventHandler.mouseMoveHandler(e));
  root.addEventListener("mousedown", e => eventHandler.mouseDownHandler(e));
  root.addEventListener("wheel", e => eventHandler.wheelHandler(e));

  const startButton = document.querySelector(".startButton");
  startButton.addEventListener("click", e => eventHandler.startButtonClickHandler(e));

  const resetButton = document.querySelector(".resetButton");
  resetButton.addEventListener("click", e => eventHandler.resetButtonClickHandler(e));

  const slider = document.querySelector(".slider");
  slider.addEventListener("input", e => eventHandler.sliderChangeHandler(e))
}

setEvents();
