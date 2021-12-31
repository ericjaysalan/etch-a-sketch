const gridContainer = document.getElementById('grid');
const gridSizeText = document.getElementById('grid-size');
const buttonsContainer = document.getElementById('buttons-container');
const clearButton = document.getElementById('clear-button');
const eraseButton = document.getElementById('erase-button');
const etchButton = document.getElementById('etch-button');
const randomButton = document.getElementById('random-button');
const buttons = buttonsContainer.children;

const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = 'white';
let gridSize = DEFAULT_GRID_SIZE;
let etch = false;
let erase = false;
let randomColor = false;

function draw(div, color) {
  let divStyle = div.style;
  divStyle.setProperty('background-color', color);
  divStyle.setProperty('color', color);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomRGB() {
  return `rgb(
  ${getRandomInt(255)},
  ${getRandomInt(255)},
  ${getRandomInt(255)}
  )`;
}

function evaluate(e) {
  if (etch) {
    draw(this, 'black');
  } else if (erase) {
    draw(this, DEFAULT_COLOR);
  } else if (randomColor) {
    draw(this, getRandomRGB());
  }
}

function createGrid(gridSize) {
  gridContainer.style.setProperty(
    'grid-template-columns',
    `repeat(${gridSize}, 1fr)`
  );
  gridContainer.style.setProperty(
    'grid-template-rows',
    `repeat(${gridSize}, 1fr`
  );

  for (let row = 0; row < gridSize; row++) {
    for (let column = 0; column < gridSize; column++) {
      const newDiv = document.createElement('div');
      const newDivStyle = newDiv.style;
      newDiv.innerText = '0';
      newDivStyle.setProperty('background-color', 'white');
      newDivStyle.setProperty('color', 'white');

      newDiv.addEventListener('mouseenter', evaluate);

      gridContainer.appendChild(newDiv);
    }
  }
}

function deleteGrid(divs) {
  while (divs.length != 0) {
    let currentElement = divs[0];
    currentElement.remove();
  }
}

function updateGridSize() {
  gridSizeText.innerText = `${gridSize} x ${gridSize}`;
}

function clearGrid() {
  do {
    gridSize = Number(prompt('Grid Size [1-100]: ', 16));
  } while (isNaN(gridSize || gridSize === 0));

  if (gridSize > 0 && gridSize <= 100) {
    let divs = gridContainer.children;

    updateGridSize(gridSize);
    deleteGrid(divs);
    createGrid(gridSize);
  }
}

createGrid(gridSize);

clearButton.addEventListener('click', clearGrid);
etchButton.addEventListener('click', () => {
  etch = !etch;
  etchButton.classList.toggle('green-bg');

  if (erase) {
    erase = !erase;
    eraseButton.classList.toggle('red-bg');
  }
  if (randomColor) {
    randomColor = !randomColor;
    randomButton.style.setProperty('background-color', DEFAULT_COLOR);
    randomButton.style.setProperty('color', 'black');
  }
});
eraseButton.addEventListener('click', () => {
  erase = !erase;
  eraseButton.classList.toggle('red-bg');

  if (etch) {
    etch = !etch;
    etchButton.classList.toggle('green-bg');
  }
  if (randomColor) {
    randomColor = !randomColor;
    randomButton.style.setProperty('background-color', DEFAULT_COLOR);
    randomButton.style.setProperty('color', 'black');
  }
});
randomButton.addEventListener('click', () => {
  randomColor = !randomColor;

  if (randomColor) {
    randomButton.style.setProperty('background-color', getRandomRGB());
    randomButton.style.setProperty('color', getRandomRGB());
  } else {
    randomButton.style.setProperty('background-color', DEFAULT_COLOR);
    randomButton.style.setProperty('color', 'black');
  }

  if (etch) {
    etch = !etch;
    etchButton.classList.toggle('green-bg');
  }

  if (erase) {
    erase = !erase;
    eraseButton.classList.toggle('red-bg');
  }
});
