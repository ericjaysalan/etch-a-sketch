const canvas = document.querySelector("#container");
const changeGridButton = document.querySelector("#grid-size");
const COLOR_WHEN_HOVERED = "red";

function clearCanvas() {
  const canvasLength = canvas.children.length;

  for (let i = 0; i < canvasLength; i++) {
    canvas.firstChild.remove();
  }
}

function canvasSizePrompt() {
  let isNotValid = true;
  let newGridSize = 0;

  while (isNotValid) {
    newGridSize = Number(window.prompt("New Grid Size? Cannot exceed 100."));

    if (Number.isInteger(newGridSize)) {
      /*
    This conditional check is for when the user clicks Cancel.
    The prompt returns null which is converted to 0 by Number().
    I set the grid size back to 16 when this is the case.
    */
      if (newGridSize === 0) {
        newGridSize = 16;
      }

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

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// prettier-ignore
function randomColor(square) {
  return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, ${getOpacity(square)})`;
}

function getOpacity(square) {
  return getComputedStyle(square).getPropertyValue("opacity");
}

function reduceOpacity(square) {
  let previousOpacity = getOpacity(square);
  square.style.opacity = previousOpacity - 0.1;
}

function addColorToSquare(square) {
  square.style.background = randomColor(square);
}

function etch(event) {
  const square = event.target;

  addColorToSquare(square);
  reduceOpacity(square);
}

function createCanvas(canvasWidthAndHeight) {
  for (let row = 0; row < canvasWidthAndHeight; row++) {
    const rowDiv = document.createElement("div");

    for (let square = 0; square < canvasWidthAndHeight; square++) {
      let div = document.createElement("div");
      div.classList.toggle("square");
      div.addEventListener("mouseover", etch);

      rowDiv.appendChild(div);
    }

    canvas.appendChild(rowDiv);
  }
}

createCanvas(16);
changeGridButton.addEventListener("click", changeGridSize);
