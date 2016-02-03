
console.log("main_js loaded");


document.addEventListener('DOMContentLoaded', function() {
    setUp();
}, false);





var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

// canvas.addEventListener("mousemove", onMouseMove);
// canvas.addEventListener("click", onClick);

var gameBoard = {
  x: 525,
  y: 700,
  rows: 13,
  columns: 10,
  tilewidth: 50,
  tileheight: 50,
  tiles: [],
  rowHeight: 42,
  radius: 25,
};

var Tile = function(row, col, type) {
  this.row = row;
  this.col = col;
  this.type = type;
  this.checked = false;
  this.matched = false;
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

function drawTiles() {
var x = canvas.width;
var y = canvas.height;
var height = 50;
var width = 50;
  for (var i = 0; i < gameBoard.rows; i++) {
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
}

var drawGame = function() {
    //bottom rectangle is size of gameboard not taken up by
  //rows and columns
ctx.fillStyle="#FF0000";
ctx.fillRect(0,550,525,146);
}

// now we have to make a player piece

var player = {
  x: 0,
  y: 0,
  angle: 0,
  tiletype: -1,
  emoji: {x: 0,
          y: 0,
          row: 0,
          col: 0,
          angle: 0,
          speed: 0,
          tiletype: -1,
        },
};

var makePlayerBall = function() {
  // assign player a ball type randomly
  player.tiletype = Math.floor(Math.random()*ballArray.length);
  player.x = (gameBoard.x/2)-gameBoard.tilewidth/2;
  player.y = (580 - (gameBoard.tileheight/2));
}

var drawPlayerBall = function() {
  ctx.drawImage(ballArray[player.tiletype], (gameBoard.x/2)-gameBoard.tilewidth/2 , 580 - (gameBoard.tileheight/2), gameBoard.tilewidth, gameBoard.tileheight);
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
function findMatch(trow, tcol) {

  var touching = trow % 2 === 0 ? evenRowTouching : oddRowTouching;
    for (k = 0; k < touching.length; k++) {
      var calcrow = trow + touching[k][0];
      var calccol = tcol + touching[k][1];
      var funtile = gameBoard.tiles[calcrow][calccol];
        if ((calcrow < 10) && (calcrow > -1) && (calccol < 10) && (calccol > -1)){
          if ((funtile.type === player.tiletype) && (funtile.checked === false)) {
            funtile.matched = true;
            cluster.push(funtile);
          }
        }
    }
  recluster(cluster);
};

// now we need to run findMatch on the contents of cluster

var clusterSize = 0
function recluster(cluster) {
  console.log(cluster);
  for (var i = 0; i < cluster.length; i++) {
    if (cluster[i].checked === false) {
      cluster[i].checked = true;
      findMatch(cluster[i].row, cluster[i].col);
    } else {
      return;
    }
  }
};

var clusterFound = false;

function foundMatch() {
  if (cluster.length >= 2) {
    console.log("cluster found");
    clusterFound = true;
  }
};

function eliminateCluster() {
  foundMatch();
  if (clusterFound = true) {
    for (var i = 0; i < cluster.length; i++){
    gameBoard.tiles[cluster[i].row][cluster[i].col].type = -1;
    gameBoard.tiles[cluster[i].row][cluster[i].col].aplha = 0;
    }
  }
  clear();
  reUp();
  cluster = [];
}

function clear() {
var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, 525, 700);
}

function reUp() {
  drawGame();
  drawTiles();
  makePlayerBall();
}

function setUp() {
  clear()
  drawGame();
  makeGameBoard();
  drawTiles();
  makePlayerBall();
};

function radToDeg(angle) {
    return angle * (180 / Math.PI);
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
  var mouseangle = radToDeg(Math.atan2((player.y+gameBoard.tileheight/2) - mousePos.y, mousePos.x - (player.x+gameBoard.tilewidth/2)));
  if (mouseangle < 0) {
      mouseangle = 180 + (180 + mouseangle);
    }
    player.angle = mouseangle;
    renderMouseAngle();
}, false);

canvas.addEventListener('click', function() {
  console.log("clicked");
  movePlayer();
}, false);



moving = false
function movePlayer() {
    var drawPlayerEmoji = function(px, py) {
      ctx.drawImage(ballArray[player.emoji.tiletype], px , py, gameBoard.tilewidth, gameBoard.tileheight);
    }
        player.emoji.x = player.x;
        player.emoji.y = player.y;
        player.emoji.angle = player.angle;
        player.emoji.tiletype = player.tiletype;
        player.emoji.speed = .05;
        var dx = player.emoji.speed * Math.cos(degToRad(player.emoji.angle));
        var dy = player.emoji.speed * -1*Math.sin(degToRad(player.emoji.angle));
        setInterval(function() {
    for (var i = 0; i < 20; i++) {
      moving = true
      drawPlayerEmoji(player.emoji.x += dx, player.emoji.y += dy);
    }
}, 5);
};









function degToRad(angle) {
    return angle * (Math.PI / 180);
}

function renderMouseAngle() {
    var centerx = player.x + gameBoard.tilewidth/2;
    var centery = player.y + gameBoard.tileheight/2;

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#0000ff";
    ctx.beginPath();
    ctx.moveTo(centerx, centery);
    ctx.lineTo(centerx + 1.5*gameBoard.tilewidth * Math.cos(degToRad(player.angle)),
               centery - 1.5*gameBoard.tileheight * Math.sin(degToRad(player.angle)));
    ctx.stroke();
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


setInterval(function() {
    clear();
    drawGame();
    drawTiles();
    renderMouseAngle();
    drawPlayerBall();
  }, 40);



