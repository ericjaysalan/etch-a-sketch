const canvas = document.querySelector("#container");
const changeGridButton = document.querySelector("#grid-size");
const COLOR_WHEN_HOVERED = "red";

function clearCanvas() {
  const canvasLength = canvas.children.length;

  for (let i = 0; i < canvasLength; i++) {
    canvas.firstChild.remove();
  }
}

function isValidGridSize(gridSizeFromPrompt) {
  return !isNaN(gridSizeFromPrompt);
}

function canvasSizePrompt() {
  let isNotValid = true;
  let newGridSize = 0;

  while (isNotValid) {
    newGridSize = Number(window.prompt("New Grid Size?"));

    if (isValidGridSize(newGridSize)) {
      isNotValid = false;
    }
  }

  return newGridSize;
}

function changeGridSize(event) {
  clearCanvas();

  let newCanvasSize = canvasSizePrompt();
  createCanvas(Number(newCanvasSize));
}

function colorTheSquare(div, color) {
  div.style.backgroundColor = color;
  div.style.color = color;
}

function etch(event) {
  const square = event.target;

  colorTheSquare(square, COLOR_WHEN_HOVERED);
}

function createCanvas(canvasWidthAndHeight) {
  for (let row = 0; row < canvasWidthAndHeight; row++) {
    for (let square = 0; square < canvasWidthAndHeight; square++) {
      let div = document.createElement("div");
      div.textContent = "?";
      div.classList.toggle("square");
      div.addEventListener("mouseover", etch);

      canvas.appendChild(div);
    }
  }
}

createCanvas(16);
changeGridButton.addEventListener("click", changeGridSize);
