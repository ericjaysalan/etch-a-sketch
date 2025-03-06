const canvas = document.querySelector("#container");

function createCanvas(canvasWidthAndHeight) {
  for (let row = 0; row < canvasWidthAndHeight; row++) {
    for (let square = 0; square < canvasWidthAndHeight; square++) {
      let div = document.createElement("div");
      div.textContent = "?";
      div.classList.toggle("square");
      canvas.appendChild(div);
    }
  }
}

createCanvas(16);
