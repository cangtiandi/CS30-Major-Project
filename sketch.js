let grid;
let gridWidth = 10;
let gridHeight = 22;

let drawButton;
let tetris = false;
let score = 0;
let blockGame;

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
  blockGame = new Tetris;
  grid = blockGame.createEmpty2DArray(gridHeight,gridWidth);

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
    blockGame.displayGrid();
  }
}

function enterTetris(){
  tetris = !tetris;
}


class Tetris {
  constructor(){
    
  }

  createEmpty2DArray(rows,cols){
    let grid = [];
    for (let y=0; y<rows; y++){
      grid.push([]);
      for (let x=0; x<cols; x++){
        grid[y].push(0);
      }
    }
    return grid;
  }

  displayGrid(){
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

    // border for the grid(too lazy to figure anything else)
    strokeWeight(4);
    line(0, 0, width/2, 0);
    line(0, 0, 0, height);
    line(width/2, 0, width/2, height);
  }
}

