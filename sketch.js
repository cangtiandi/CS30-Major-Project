let grid;

let drawButton, playButton;
let tetris = false;
let score = 0;

let piece, playfield;

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
  piece = new Piece;
  playfield = new Playfield;
  grid = playfield.createEmpty2DArray(10,22);

  // Start menu
  drawButton = createButton("start");
  drawButton.position(width/2,height/2);
  drawButton.size(100,100);
  drawButton.mouseClicked(enterTetris);

  // How to play Button 
  // playButton  = createButton("instructions");
  // playButton.position(width/2,height/2+150);
  // playButton.size(100,50);
  // playButton.mouseClicked();
}

function draw() {
  background(220);
  if (tetris){
    background("white");
    drawButton.remove();
    playfield.displayGrid();
  }
}

function enterTetris(){
  tetris = !tetris;
}

class Piece {
  constructor(type, x, y, playfield){
    this.type = type;
    this.cells = types[type];
    this.size = this.cells.length;
    this.x = x === floor((playfield.cellHeight - this.size) / 2);
    this.y =  y || 0;
    this.cellSize = playfield;
    this.offset = playfield;
  }

  displayPiece() {
    for (let rows=0; rows<this.size; rows++){
      for (let cols=0; cols<this.size; cols++){
        if (this.cells[rows][cols]){
          let x = this.x + cols;
          let y = this.y + rows;

          let cellSize = this.cellSize;
          let off = this.offset;

          fill("red");
          rect();
        }
      }
    }
  } 

  rotate() {

  }
}

class Playfield {
  constructor(w,h) {
    this.width = w;
    this.height = h;
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
    let cellWidth = width/2/this.width;
    let cellHeight = height/this.height;
  
    for (let y=0; y<this.height; y++){
      for (let x=0; x<this.width; x++){
        if (grid[y][x] === 0){
          fill(220);
        }
        strokeWeight(0.1);
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