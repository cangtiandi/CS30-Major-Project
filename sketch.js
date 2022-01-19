let grid;

let drawButton, playButton, retry;
let piece, playfield;

let tetris = false;
let isGameOver = false;
let speed = 0;
let score = 0;
let time = 0;

let theGameOver, logo;
let tetrisTheme;

function preload() {
  theGameOver = loadImage("assets/Game Over.png");
  logo = loadImage("assets/Tetris logo.png");
  tetrisTheme = loadSound("assets/Tetris Theme.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  piece = new Piece;
  playfield = new Playfield;

  grid = playfield.createTetris2DArray();
  imageMode(CENTER);

  // Start menu
  drawButton = createButton("start");
  drawButton.position(width/2,height/2);
  drawButton.size(100,100);
  drawButton.mouseClicked(enterTetris);

  //How to play Button  
  playButton  = createButton("instructions");
  playButton.position(width/2,height/2+150);
  playButton.size(100,50);
  playButton.mouseClicked(enterInstructions);

  piece.spawnPiece();
}

function draw() {
  background(220);

  piece.gameOver();
  tetrisTheme.play(0, 1, 1, 0);
  // enters the games
  if(isGameOver === false){
    image(logo, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    if (tetris){
      background("white");

      drawButton.remove();
      playButton.remove();

      playfield.displayBoard();
      piece.drawPiece();

      textSize(100);
      text("Score = " + score, 500, height - 500, 500, 500);
  
      // falling piece
      if (millis() > time + (750 - speed)) {
        if (ifHitting(piece.currentPiece, piece.currentPiecePos.x, piece.currentPiecePos.y, 0, 1)){
          piece.commitPieceToBoard();
        }
        else{
          piece.pieceMovement(0, 1);
        }
        time = millis();
      }

      if (keyIsDown(83)){
        piece.pieceMovement(0, 1);
      }
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
    piece.hardDrop();
  }
  if (key === "r"){
    piece.rotate();
  }

  // debugger 
  if (key === "f"){
    score += 100;
  }
}

// collision checker 
function ifHitting(piece, posX, posY, directionX, directionY) {
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 1) {

        let targetRow = posY + i + directionY;
        let targetCol = posX + j + directionX;

        // bottom 
        if (targetRow >= playfield.height || targetRow < 0) {
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


function enterInstructions() {
  text("Press space to harddrop", 100, 100, 100 , 100);
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
        if (grid[y][x] === 1){
          fill("gray");
        }
        else if (grid[y][x] === 2){
          fill("black");
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


class Piece { 
  constructor() {
    this.gamePlayfield = new Playfield;
    this.currentPiece = [];
    this.gameGrid = this.gamePlayfield.createTetris2DArray();
    this.colors = ["lightblue", "blue", "orange", "yellow", "lightgreen", "purple", "red"];
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
          fill("black");
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

  hardDrop() {
    while (this.currentPiecePos.y + this.currentPiece.length <= 23 && 
      !ifHitting(this.currentPiece, this.currentPiecePos.x, this.currentPiecePos.y, 0,1)){
      this.currentPiecePos.y++;
    }
  }

  clearLines() {
  // checks if the line is full
    let i = playfield.height-1;
    while (i >= 0) {
      let isLineClear = true;
      for (let j = 0; j < playfield.width; j++) {
        if (grid[i][j] === 0) {
          isLineClear = false;
          break;
        }
      }
      // clears line and adds score
      if (isLineClear) {
        for (let j = 0; j < playfield.width; j++) {
          grid[i][j] = 0;
        }
        score += 100;

        if (score % 1000 === 0 ) {
          speed -= -50;
        }
        // moves the everything down
        for (let row = i; row > 0; row--) {
          for (let col = 0; col < playfield.width; col++) {
            grid[row][col] = grid[row-1][col];
          }
        }
        i++;
      }
      i--;
    }
  }

  commitPieceToBoard() {
    let x = this.currentPiecePos.x;
    let y = this.currentPiecePos.y;
  
    for (let i = 0; i < this.currentPiece.length; i++) {
      for (let j = 0; j < this.currentPiece[i].length; j++) {
        if (this.currentPiece[i][j] === 1) {
          this.gameGrid[i + y][j + x] = 1;
        }
      }
    }
    grid = this.gameGrid;
    this.spawnPiece(); 
    this.clearLines();
  }

  gameOver() {
    // checks if game is over 
    if (this.currentPiecePos.y === 0 && ifHitting(this.currentPiece, this.currentPiecePos.x, this.currentPiecePos.y, 0, 0)){
      isGameOver = true;
    }
    if (isGameOver){
      background("black");
      for (let y=0; y<playfield.height; y++){
        for (let x=0; x<playfield.width; x++){
          if (grid[y][x] !== 2){
            grid[y][x] = 2;
          }
        }
      }
      
      // displays game over screen
      image(theGameOver, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    }
  }
}