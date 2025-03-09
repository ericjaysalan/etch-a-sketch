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

function reduceOpacity(square) {
  const previousOpacity = getComputedStyle(square).getPropertyValue("opacity");
  square.style.opacity = previousOpacity - 0.1;
}

function etch(event) {
  const square = event.target;

  square.classList.add("red");
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
