let grid;

let drawButton, playButton;
let tetris = false;
let score = 0;

let piece, playfield;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // piece = new Piece;
  playfield = new Playfield;
  grid = playfield.createTetris2DArray();

  // Start menu
  drawButton = createButton("start");
  drawButton.position(width/2,height/2);
  drawButton.size(100,100);
  drawButton.mouseClicked(enterTetris);

  // How to play Button 
  // playButton  = createButton("instructions");
  // playButton.position(width/2,height/2+150);
  // playButton.size(100,50);
  // playButton.mouseClicked(enterInstructions);
}

function draw() {
  background(220);
  if (tetris){
    background("white");
    drawButton.remove();
    playfield.displayBoard();
  }
}

function enterTetris(){
  tetris = !tetris;
}

// code when the game is done
// function enterInstructions() {
//   text("Press space to harddrop");
// }

class Piece {
  constructor() {
    this.types = {
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
  }

  displayPiece() {
    
  } 

  pieceMovement() {

  }

  rotate() {

  }
}

class Playfield {
  constructor() {
    this.width = 10;
    this.height = 22;
    this.cellWidth = width/2/this.width;
    this.cellHeight = height/this.height;
  }

  createTetris2DArray(){
    let grid = [];
    for (let y=0; y<this.height; y++){
      grid.push([]);
      for (let x=0; x<this.height; x++){
        grid[y].push(0);
      }
    }
    return grid;
  }

  displayBoard(){
    for (let y=0; y<this.height; y++){
      for (let x=0; x<this.width; x++){
        if (grid[y][x] === 0){
          fill(220);
        }
        strokeWeight(0.1);
        rect(x*this.cellWidth, y*this.cellHeight, this.cellWidth, this.cellHeight);
      }
    }

    // border for the grid(too lazy to figure anything else)
    strokeWeight(4);
    line(0, 0, width/2, 0);
    line(0, 0, 0, height);
    line(width/2, 0, width/2, height);
  }
}