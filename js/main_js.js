console.log("main_js loaded");

var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

var gameBoard = {
  x: 525,
  y: 700,
  columns: 10,
  rows: 13,
  tilewidth: 50,
  tileheight: 50,
  tiles: [],
  rowHeight: 42,
};

var Tile = function(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.checked = false;
  this.matched = false;
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
  for (var i = 0; i < 10; i++) {
    if (i < 1) {
      var yPos = (height*i);
    } else {
      yPos = (gameBoard.rowHeight*i);
    }
      for(var j=0; j < 10; j++){
        if (gameBoard.tiles[i][j].type !== -1) {
          if (i%2 === 0) {
          ctx.drawImage(ballArray[gameBoard.tiles[i][j].type],(width)*j, yPos, width, height);
          } else {
          ctx.drawImage(ballArray[gameBoard.tiles[i][j].type],((width)*j)+(width/2), yPos, width, height);
          }
        }
    }
  }
  //bottom rectangle is size of gameboard not taken up by
  //rows and columns

ctx.fillStyle="#FF0000";
ctx.fillRect(0,550,525,146);


}

// now we have to make a player piece

var player = {
  x: 0,
  y: 0,
  tiletype: -1,
}

var makePlayerBall = function() {
  // assign player a ball type randomly
  player.tiletype = Math.floor(Math.random()*ballArray.length);
  ctx.drawImage(ballArray[player.tiletype], (gameBoard.x/2)-gameBoard.tilewidth/2 , 554 - (gameBoard.tileheight/2), gameBoard.tilewidth, gameBoard.tileheight);

}

//this is going to be all of the functionality of shooting,

//stop the ball when it intersects with another ball

// make the moving ball bounce off the walls and continue moving

//snapping the ball to the grid,

//incorporating the ball into the grid coordinates to make it a tile

//now that the ball is a tile, we can start running the match
//functionality to find clusters:

//the ball can be touching up to six different tiles:

var evenRowTouching = [[-1,-1], [-1,0], [0,-1], [0,1], [1,-1], [1,0]];
var oddRowTouching = [[-1,0], [-1,1], [0,-1], [0,1], [1,0], [1,1]];


  //somehow we need to be able to identify the array coodinates
  //of the playerBall even though we have incorporated it already

var cluster = [];
var findMatch = function((x, y, type) {
  if x % 2 === 0 {
    for (k = 0, k < evenRowTouching.length; k++) {
      if gameBoard.tiles[x + evenRowsTouching[k][0]]
                     [y + evenRowsTouching[k][1]].type
                      = player.tiletype {
          gameBoard.tiles[x][y].checked = true;
          gameBoard.tiles[x][y].matched = true;
          cluster.push(gameBoard.tiles[x][y]);


                      }


    }
  }


  //is tile in an even or odd row?

  // now that we know even or odd we run the RowTouching array against
  //it's neighbors to see if tile.type matches playerball

  // if tiletype doesn't match playerball we mark as
// checked: true
// matched: false

// if tiletype matches playerball we have to mark it as matched
//(and put it into a new array of matches?)

// now that it's in a new array we have to run the same neighbor
// function on this new tile.
// do any of it's neighbors match playerball tiletype?
// if they do they go into the array as well.

// once all tiles in this array have been checked and no more matches
// have been found we check the array length.

// if length >= 3, the tile type is changed to -1 and they vanish
// (eventualy animations and score will be added (ice box))

// eventually need to then figure out how to recognize tiles that
// are now hanging free and make those vanish as well...







