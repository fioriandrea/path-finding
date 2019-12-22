const graphics = new Graphics();
const algorithmManager = new AlgorithmManager();
const mouseHandler = new MouseHandler(graphics, algorithmManager);
const buttonHandler = new ButtonHandler(graphics, algorithmManager);

const setEvents = () => {
  const root = document.querySelector(":root");
  root.addEventListener("mouseup", e => mouseHandler.mouseUpHandler(e));
  root.addEventListener("mousemove", e => mouseHandler.mouseMoveHandler(e));
  root.addEventListener("mousedown", e => mouseHandler.mouseDownHandler(e));
  root.addEventListener("wheel", e => mouseHandler.wheelHandler(e));

  const startButton = document.querySelector(".startButton");
  startButton.addEventListener("click", e => buttonHandler.startButtonClickHandler(e));

  const resetButton = document.querySelector(".resetButton");
  resetButton.addEventListener("click", e => buttonHandler.resetButtonClickHandler(e));

  const slider = document.querySelector(".slider");
  slider.addEventListener("input", e => buttonHandler.sliderChangeHandler(e))
}

setEvents();
