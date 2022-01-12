let grid;


let drawButton, playButton;
let piece, playfield;

let tetris = false;
let score = 0;
let time = 0;

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

  // How to play Button todo  
  // playButton  = createButton("instructions");
  // playButton.position(width/2,height/2+150);
  // playButton.size(100,50);
  // playButton.mouseClicked(enterInstructions);
}

function draw() {
  background(220);

  // enters the games
  if (tetris){
    background("white");
    drawButton.remove();
    playfield.displayBoard();
    piece.drawPiece();

    // falling piece
    if (millis() > time + 750) {
      if (ifHitting(piece.currentPiece, piece.currentPiecePos.x, piece.currentPiecePos.y, 0, 1)){
        piece.commitPieceToBoard();
      }
      else{
        piece.pieceMovement(0, 1);
      }
      time = millis();
    }
  }
}

function enterTetris(){
  tetris = !tetris;
}

function keyPressed() {
  if (key === "d"){
    piece.pieceMovement(1, 0);
  }
  if (key === "a"){
    piece.pieceMovement(-1, 0);
  }
  if (key === " "){
    piece.currentPiecePos.y = 20;
  }
  if (key === "r"){
    piece.rotate();
  }
}

function ifHitting(piece, posX, posY, directionX, directionY) {
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 1) {

        let targetRow = posY + i + directionY;
        let targetCol = posX + j + directionX;

        // bottom 
        if (targetRow >= playfield.height) {
          return true;
        } 
        // hitting placed mino
        else if (grid[targetRow][targetCol] === 1) {
          return true;
        } 
        // left and right border
        else if (targetCol >= playfield.width || targetCol < 0) {
          return true;
        }
      }
    }
  }
  return false;
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

    this.squareBlock = [ 
      [1, 1],
      [1, 1]
    ];

    this.lineBlock = [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ];

    this.tBlock = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
    
    this.lBlock = [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];

    this.reverseLBlock = [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ];

    this.zBlock = [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ];
    
    this.reverseZBlock = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ];
  } 

  spawnPiece() {
    let choice = floor(random(0, 6));
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
      this.currentPiece = this.lBlock;
      break;
    
    case 4:
      this.currentPiece = this.reverseLBlock;
      break;

    case 5:
      this.currentPiece = this.zBlock;
      break;

    case 6:
      this.currentPiece = this.reverseZBlock;
      break;
    }
    this.currentPiecePos = {
      x: 3, 
      y: 0,
    };
  }

  drawPiece() {
    for (let y=0; y<this.currentPiece.length; y++){
      for (let x=0; x<this.currentPiece[y].length; x++){
        if (this.currentPiece[y][x] === 1){
          fill("blue");
          strokeWeight(0);
          rect((this.currentPiecePos.x + x)*playfield.cellWidth, (this.currentPiecePos.y + y)*playfield.cellHeight, playfield.cellWidth, playfield.cellHeight);
        }
      }
    }
  }

  pieceMovement(x, y) {
    if (!ifHitting(this.currentPiece, this.currentPiecePos.x, this.currentPiecePos.y, x, y)){
      this.currentPiecePos.x += x;
      this.currentPiecePos.y += y;
    }
  }

  rotate() {
    let tempPiece = [];
    // copies the current piece 
    for (let i = 0; i < this.currentPiece.length; i++) {
      tempPiece[i] = [];
      for (let j = 0; j < this.currentPiece[i].length; j++) {
        tempPiece[i][j] = this.currentPiece[i][j];
      }
    }
    // rotates clockwise
    let tempRotatedPiece = [];
    for (let i = 0; i < this.currentPiece.length; i++) {
      tempRotatedPiece[i] = [];
      for (let j = 0; j < this.currentPiece[i].length; j++) {
        tempRotatedPiece[i][j] = tempPiece[this.currentPiece[i].length - j - 1][i];
      }
    }
    if (!ifHitting(tempRotatedPiece, this.currentPiecePos.x, this.currentPiecePos.y, 0,0)){
      this.currentPiece = tempRotatedPiece;
    }
  }

  commitPieceToBoard() {
    let x = this.currentPiecePos.x;
    let y = this.currentPiecePos.y;
  
    for (let i = 0; i < this.currentPiece.length; i++) {
      for (let j = 0; j < this.currentPiece[i].length; j++) {
        if (this.currentPiece[i][j] === 1) {
          grid[y + i][x + j] = 1;
        }
      }
    }
    this.spawnPiece();
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