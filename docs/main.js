const graphics = new Graphics();
const mouseHandlers = new MouseHandler(graphics);
const buttonHandlers = new ButtonHandler(graphics);

const setEvents = () => {
  const root = document.querySelector(":root");
  root.addEventListener("mouseup", e => mouseHandlers.mouseUpHandler(e));
  root.addEventListener("mousemove", e => mouseHandlers.mouseMoveHandler(e));
  root.addEventListener("mousedown", e => mouseHandlers.mouseDownHandler(e));
  root.addEventListener("wheel", e => mouseHandlers.wheelHandler(e));

  const startButton = document.querySelector(".startButton");
  startButton.addEventListener("click", e => buttonHandlers.startButtonClickHandler(e));

  const resetButton = document.querySelector(".resetButton");
  resetButton.addEventListener("click", e => buttonHandlers.resetButtonClickHandler(e));
}

setEvents();
