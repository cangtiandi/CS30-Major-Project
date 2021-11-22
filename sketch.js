let grid;
let gridWidth = 10;
let gridHeight = 22;

let drawButton;
let tetris = false;
let score = 0;

let types = {
  block: [
    ["red", "red", null],
    ["red", "red", null],
    [null, null, null],
  ],
  lineBlock: [
    [null, null, null, null],
    ["red", "red", "red", "red"],
    [null, null, null, null]
  ],
  tBlock: [
    [null, "red", null],
    ["red", "red", "red"],
    [null, null, null]
  ],
  lblock: [
    ["red", null, null],
    ["red","red","red"],
    [null, null, null]
  ],
  reverseLBlock: [
    [null, null, "red"],
    ["red","red","red"],
    [null, null, null]
  ],
  zBlock: [
    ["red", "red", null],
    [null, "red", "red"],
    [null, null, null]
  ],
  reverseZBlock: [
    [null, "red", "red"],
    ["red", "red", null],
    [null, null, null]
  ]
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2DArray(gridHeight,gridWidth);

  // Start menu
  drawButton = createButton("start");
  drawButton.position(width/2,height/2);
  drawButton.mouseClicked(enterTetris);
  drawButton.size(100,100);
}

function draw() {
  background(220);
  if (tetris){
    drawButton.remove();
    displayGrid();
    drawBorderLines();
  }
}

function enterTetris(){
  tetris = !tetris;
}

function createEmpty2DArray(rows,cols){
  let grid = [];
  for (let y=0; y<rows; y++){
    grid.push([]);
    for (let x=0; x<cols; x++){
      grid[y].push(0);
    }
  }
  return grid;
}

function displayGrid(){
  let cellWidth = width/2/gridWidth;
  let cellHeight = height/gridHeight;

  for (let y=0; y<gridHeight; y++){
    for (let x=0; x<gridWidth; x++){
      if (grid[y][x] === 0){
        fill("white");
      }
      strokeWeight(1);
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function drawBorderLines() {
  strokeWeight(4);
  for (let x=0; x<gridWidth; x+= gridWidth){
    line(0+x,0+x,gridWidth*x,gridWidth*x);
  }
  // for (let y=0; y<gridHeight; y+= gridHeight){
  //   line(0,0,);
  // }
}

class Tetris {
  constructor(type){
    this.gridHeight = gridHeight;
    this.gridWidth = gridWidth;
    this.type = type;
  }
}