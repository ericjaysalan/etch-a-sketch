const canvas = document.querySelector("#container");
const COLOR_WHEN_HOVERED = "red";

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
