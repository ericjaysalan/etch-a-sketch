const gridContainer = document.getElementById('grid');
const gridSizeText = document.getElementById('grid-size');
const buttonsContainer = document.getElementById('buttons-container');
const buttons = Array.from(buttonsContainer.children);
const clearButton = document.getElementById('clear');
const eraseButton = document.getElementById('erase');
const etchButton = document.getElementById('etch');
const randomButton = document.getElementById('random');
const shadeButton = document.getElementById('shade');

const DEFAULT_GRID_SIZE = 16;
const DEFAULT_BG_COLOR = 'rgb(255, 255, 255)';
const DEFAULT_COLOR = 'black';
const buttonsCondition = {
  etch: false,
  erase: false,
  random: false,
  shade: false,
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

function shade(currentShade) {
  let newShade = '';
  switch (currentShade) {
    case 'rgb(255, 255, 255)':
      newShade = 'rgb(230, 230, 230)';
      break;
    case 'rgb(230, 230, 230)':
      newShade = 'rgb(205, 205, 205)';
      break;
    case 'rgb(205, 205, 205)':
      newShade = 'rgb(180, 180, 180)';
      break;
    case 'rgb(180, 180, 180)':
      newShade = 'rgb(155, 155, 155)';
      break;
    case 'rgb(155, 155, 155)':
      newShade = 'rgb(130, 130, 130)';
      break;
    case 'rgb(130, 130, 130)':
      newShade = 'rgb(105, 105, 105)';
      break;
    case 'rgb(105, 105, 105)':
      newShade = 'rgb(80, 80, 80)';
      break;
    case 'rgb(80, 80, 80)':
      newShade = 'rgb(55, 55, 55)';
      break;
    case 'rgb(55, 55, 55)':
      newShade = 'rgb(30, 30, 30)';
      break;
    case 'rgb(30, 30, 30)':
      newShade = 'rgb(0, 0, 0)';
      break;
    default:
      newShade = currentShade;
  }

  return newShade;
}

function evaluate(e) {
  if (buttonsCondition.etch) {
    draw(this, 'black');
  } else if (buttonsCondition.erase) {
    draw(this, DEFAULT_BG_COLOR);
  } else if (buttonsCondition.random) {
    draw(this, getRandomRGB());
  } else if (buttonsCondition.shade) {
    // TODO it takes 10 strokes to make a div go black
    const currentShade = this.style.color;
    const newShade = shade(currentShade);
    this.style.setProperty('background-color', newShade);
    this.style.setProperty('color', newShade);
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
      newDivStyle.setProperty('background-color', DEFAULT_BG_COLOR);
      newDivStyle.setProperty('color', 'rgb(255, 255, 255)');

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
    buttonsCondition.erase = true;
    background = 'red-bg';
  } else if (targetId === 'etch') {
    buttonsCondition.etch = true;
    background = 'green-bg';
  } else if (targetId === 'random') {
    buttonsCondition.random = true;
    background = 'random';
  } else if (targetId === 'shade') {
    buttonsCondition.shade = true;
    background = 'shade';
  }

  target.classList.replace('default', background);
}
createGrid(gridSize);

// Event Listeners
clearButton.addEventListener('click', clearGrid);
eraseButton.addEventListener('click', toggleButtons);
etchButton.addEventListener('click', toggleButtons);
randomButton.addEventListener('click', toggleButtons);
shadeButton.addEventListener('click', toggleButtons);
