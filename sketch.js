let grid;

let drawButton, playButton;
let tetris = false;
let score = 0;

let piece, playfield;

function setup() {
  createCanvas(windowWidth, windowHeight);
  piece = new Piece;
  playfield = new Playfield;
  grid = playfield.createTetris2DArray();

  // Start menu
  drawButton = createButton("start");
  drawButton.position(width/2,height/2);
  drawButton.size(100,100);
  drawButton.mouseClicked(enterTetris);


  piece.spawnPiece();
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
    piece.drawPiece();
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
    this.currentPiece = [];
    this.currentPiecePos = {
      x: 3, 
      y: 0,
    };

    this.width = 10;
    this.height = 22;
    this.cellWidth = width/2/this.width;
    this.cellHeight = height/this.height;

    this.squareBlock = [ 
      [1, 1],
      [1, 1]
    ];

    this.lineBlock = [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];

    this.tBlock = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
    
    this.lblock = [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];

    this.reverseLblock = [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ];

    this.zblock = [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ];
    
    this.reverseZblock = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ];
  } 

  spawnPiece() {
    let choice = floor(random(1, 7));
    switch (choice){
    case 0:
      this.currentPiece = this.squareBlock;
      break;

    case 1:
      this.currentPiece = this.lineBlock;
      break;

    case 2:
      this.currentPiece = this.tBlock;
      break;

    case 3:
      this.currentPiece = this.lblock;
      break;
    
    case 4:
      this.currentPiece = this.reverseLblock;
      break;

    case 5:
      this.currentPiece = this.zblock;
      break;

    case 6:
      this.currentPiece = this.reverseZblock;
      break;
    }
  }

  drawPiece() {
    for (let y=0; y<this.currentPiece.length; y++){
      for (let x=0; x<this.currentPiece[0].length; x++){
        if (this.currentPiece[y][x] === 1){
          fill("red");
          strokeWeight(0);
          rect((this.currentPiecePos.x + x)*this.cellWidth, y*this.cellHeight, this.cellWidth, this.cellHeight);
        }
      }
    }
  }

  fallPiece() {
  
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
    line(0, 0, width/2, 0); // top line
    line(0, 0, 0, height); // left line
    line(width/2, 0, width/2, height); // right line 
  }
}