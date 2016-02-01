console.log("main_js loaded");

var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

var gameBoard = {
  x: 525,
  y: 700,
  columns: 10,
  rows: 10,
  tilewidth: 50,
  tileheight: 50,
  tiles: [],
  rowHeight: 42,
};

var Tile = function(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.velocity = 0;
  this.alpha = 1;
};


var ball0 = new Image();
ball0.src='assets/images/0.png';
var ball1 = new Image();
ball1.src='assets/images/1.png';
var ball2 = new Image();
ball2.src='assets/images/2.png';
var ball3 = new Image();
ball3.src='assets/images/3.png';
var ball4 = new Image();
ball4.src='assets/images/4.png';

var ballArray = [ball0, ball1, ball2, ball3, ball4];

var randomBall = ballArray[Math.floor(Math.random()*ballArray.length)];


   //** this is almost fixed... but is probably all going to change
   //when i have to integrate this into tile type...
// this creates a game board, but does not enter pieces or coordinates
// into the scoring array. I will need to revisit this when I complete
// the scoring array and functionality to integrate.  this is
// simply proof of concept.

//this function fills the gameBoard.tiles array with player pieces
//and blank tiles.

var makeGameBoard = function() {
  for (var i=0; i < gameBoard.rows; i++) {
    gameBoard.tiles[i] = [];
      if (i < 5) {
        for (var j=0; j < gameBoard.columns; j++) {
          gameBoard.tiles[i][j] = new Tile(i, j, Math.floor(Math.random()*ballArray.length));
        };
      } else {
        for (var j=0; j < gameBoard.columns; j++) {
          gameBoard.tiles[i][j] = new Tile(i, j, -1);
        };
      };
  };
};

//this function then draws those tiles out.

function draw() {
var x = canvas.width;
var y = canvas.height;
var height = 50;
var width = 50;
  for (var i = 0; i < 5; i++) {
    if (i < 1) {
      var yPos = (height*i);
    } else {
      yPos = (gameBoard.rowHeight*i);
    }
      for(var j=0; j < 10; j++){
        if (i%2 === 0) {
          // ctx.drawImage(testArray[i][j],(width)*j, yPos, width, height);
        ctx.drawImage(ballArray[gameBoard.tiles[i][j].type],(width)*j, yPos, width, height);
      } else {
        ctx.drawImage(ballArray[gameBoard.tiles[i][j].type],((width)*j)+(width/2), yPos, width, height);
      }
    }
  }
}






