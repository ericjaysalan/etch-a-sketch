const gridContainer = document.getElementById('grid');
const gridSizeText = document.getElementById('grid-size');
const buttonsContainer = document.getElementById('buttons-container');
const clearButton = document.getElementById('clear');
const eraseButton = document.getElementById('erase');
const etchButton = document.getElementById('etch');
const randomButton = document.getElementById('random');
const buttons = Array.from(buttonsContainer.children);

const DEFAULT_GRID_SIZE = 16;
const DEFAULT_BG_COLOR = 'white';
const DEFAULT_COLOR = 'black';
const buttonsCondition = {
  etch: false,
  erase: false,
  random: false,
};
let gridSize = DEFAULT_GRID_SIZE;

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
  if (buttonsCondition.etch) {
    draw(this, 'black');
  } else if (buttonsCondition.erase) {
    draw(this, DEFAULT_BG_COLOR);
  } else if (buttonsCondition.random) {
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
  defaultButtons();

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

function defaultButtons() {
  buttonsCondition.etch = false;
  buttonsCondition.erase = false;
  buttonsCondition.random = false;

  buttons.forEach((button) => {
    button.className = 'default';
  });
}

function toggleButtons(e) {
  const target = e.target;
  const targetId = target.id;
  let background = '';

  defaultButtons();

  if (targetId === 'erase') {
    buttonsCondition.erase = !buttonsCondition.erase;
    background = 'red-bg';
  } else if (targetId === 'etch') {
    buttonsCondition.etch = true;
    background = 'green-bg';
  } else if (targetId === 'random') {
    buttonsCondition.random = true;
    background = 'random';
  }

  target.classList.replace('default', background);
}
createGrid(gridSize);

// Event Listeners
clearButton.addEventListener('click', clearGrid);
eraseButton.addEventListener('click', toggleButtons);
etchButton.addEventListener('click', toggleButtons);
randomButton.addEventListener('click', toggleButtons);
