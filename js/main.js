console.log("main_js loaded");

////  LET's GET THIS PARTY STARTED!!!!

document.addEventListener('DOMContentLoaded', function() {
    setUp();
}, false);


/// initializes the canvas  ///

var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

/// main information for the game is held in the gameBoard object ////
///     holds the dimensions of the canvas and the game board     ////
///   as well as tile information and the master array of tiles   ////
///     this area also holds global variables used by functions   ////


var moving;
var gameBoard = {
  x: 525,
  y: 650,
  rows: 13,
  columns: 10,
  tilewidth: 50,
  tileheight: 50,
  tiles: [],
  rowHeight: 42,
  radius: 20
};

/// defines the object TILE for emojis and grid ////

var Tile = function(row, col, type) {
  this.row = row;
  this.col = col;
  this.type = type;
  this.checked = false;
  this.matched = false;
  this.alpha = 1;
  radius = 20;
  x = 0;
  y = 0;
};

/// initializes emoji images on page load ////

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

///  generates random ball from array  ///

var randomBall = ballArray[Math.floor(Math.random()*ballArray.length)];

// this function fills the gameBoard.tiles array ///
//     with player pieces and blank tiles.       ///

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

/// this function then draws those tiles out ///

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

/// two event listeners: one for mouse move, one for mouse click ///
///   mouse calculates position X/Y and converts that to angle   ///
///   click function changes states and begins player movement   ///

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
  moving = true;
  clusterfound = false;
}, false);

/// radians to degrees for mouse angle ///

function radToDeg(angle) {
  return angle * (180 / Math.PI);
}

/// find mouse position based on canvas coordinates ///

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

/// before we render the mouseangle we need to to convert /////
///       degrees to radians      ///

function degToRad(angle) {
  return angle * (Math.PI / 180);
}

///  rendering the mouse angle as a visible line  ///

function renderMouseAngle() {
  var centerx = player.x + gameBoard.tilewidth/2;
  var centery = player.y + gameBoard.tileheight/2;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  ctx.moveTo(centerx, centery);
  ctx.lineTo(centerx + 1.5*gameBoard.tilewidth * Math.cos(degToRad(player.angle)),
             centery - 1.5*gameBoard.tileheight * Math.sin(degToRad(player.angle)));
  ctx.stroke();
}

/// now we have to make a player piece ///

var player = {
  x: 0,
  y: 0,
  angle: 0,
  tiletype: -1,
  emoji: {
    x: 0,
    y: 0,
    row: 0,
    col: 0,
    angle: 0,
    speed: 0,
    radius: 20,
    tiletype: -1,
  }
};

  /// assign player a ball type randomly ///

var makePlayerBall = function() {
  player.tiletype = Math.floor(Math.random()*ballArray.length);
  player.x = (gameBoard.x/2)-gameBoard.tilewidth/2;
  player.y = (580 - (gameBoard.tileheight/2));
}

/// draw that ball ///

var drawPlayerBall = function() {
  ctx.drawImage(ballArray[player.tiletype], (gameBoard.x/2)-gameBoard.tilewidth/2 , 580 - (gameBoard.tileheight/2), gameBoard.tilewidth, gameBoard.tileheight);
}

/// generates the moving player emoji   ////
/// by cloning player into player.emoji ////
/// assigns it motion on mouse click    ////

function movePlayer() {
  var drawPlayerEmoji = function(px, py) {
    ctx.drawImage(ballArray[player.emoji.tiletype], px , py,
    gameBoard.tilewidth, gameBoard.tileheight);
  }
  player.emoji.x = player.x;
  player.emoji.y = player.y;
  player.emoji.angle = player.angle;
  player.emoji.tiletype = player.tiletype;
  player.emoji.speed = 1.2;
  var dx = player.emoji.speed * Math.cos(degToRad(player.emoji.angle));
  var dy = player.emoji.speed * -1*Math.sin(degToRad(player.emoji.angle));
  moveInterval = setInterval(function() {
    if (!moving){
      clearInterval(moveInterval);
    }
    drawPlayerEmoji(player.emoji.x += dx, player.emoji.y += dy);
    detectCollision();
  }, 5);
};

///// COLLISION DETECTION  /////

var distance;
var collisionTile;
var detectCollision = function() {
  for (var i = 0; i < gameBoard.rows; i++){
    for (var j = 0; j < gameBoard.columns; j++){
      if (i % 2 === 0) {
        gameBoard.tiles[i][j].x = j * gameBoard.tilewidth + gameBoard.tilewidth/2;
        gameBoard.tiles[i][j].y = i * gameBoard.rowHeight + gameBoard.rowHeight/2;
      } else {
        gameBoard.tiles[i][j].x = j * gameBoard.tilewidth + gameBoard.tilewidth;
        gameBoard.tiles[i][j].y = i * gameBoard.rowHeight + gameBoard.rowHeight/2;
      }
      var dx = gameBoard.tiles[i][j].x - player.emoji.x;
      var dy = gameBoard.tiles[i][j].y - player.emoji.y;
      distance = Math.sqrt(dx * dx + dy * dy);
      if (gameBoard.tiles[i][j].type >= 0) {
        if (distance < gameBoard.radius + player.emoji.radius) {
          clearInterval(moveInterval);
          console.log("collision detected!");
          console.log(player.emoji.x, player.emoji.y);
          console.log(gameBoard.tiles[i][j]);
          moving = false;
          closestTileCoordinate(player.emoji.x, player.emoji.y);
          return;
        }
      }
    }
  }
};

//// find closest tile coordinate from X/Y ///

var closestTileCoordinate = function(x, y) {
  var xToCol;
  var yToRow = Math.round(((y+25)/42)-1);
  if (yToRow % 2 === 0) {
    xToCol = Math.round(((x+25)/50)-1);
  }   else {
    xToCol = Math.round(((x+50)/50)-1);
  }
  console.log(yToRow, xToCol);
  snapTile(yToRow, xToCol);
  // gameBoard.tiles[yToRow][xToCol].checked = true;
  // toCheck.push(gameBoard.tiles[yToRow][xToCol]);
  // findMatch();
  findMatch(yToRow, xToCol);
  eliminateCluster();
};

      //  MAKE THE MOVING EMOJI SNAP TO THE NEAREST OPEN POSITION  //

var snapTile = function(row, col) {
  gameBoard.tiles[row][col].type = player.emoji.tiletype;
  // player.emoji.tiletype = -1;
};

////  ANY GIVEN BALL CAN BE TOUCHING UP TO SIX OTHER BALLS... ////

var evenRowTouching = [[-1,-1], [-1,0], [0,-1], [0,1], [1,-1], [1,0]];
var oddRowTouching = [[-1,0], [-1,1], [0,-1], [0,1], [1,0], [1,1]];

/// runs all neighbors of player emoji to see if they match type ///

var cluster = [];

function findMatch(trow, tcol) {
  var touching = trow % 2 === 0 ? evenRowTouching : oddRowTouching;
  for (k = 0; k < touching.length; k++) {
    var calcrow = trow + touching[k][0];
    var calccol = tcol + touching[k][1];
    var funtile = gameBoard.tiles[calcrow][calccol];
      if ((calcrow < 13) && (calcrow > -1) && (calccol < 10) && (calccol > -1)){
        if ((funtile.type === player.emoji.tiletype) && (funtile.checked === false)) {
          funtile.matched = true;
          cluster.push(funtile);
        }
      }
  }
  recluster(cluster);
};

///    now we need to run findMatch on the contents of cluster   ////
/// runs find match again on new matches placed in cluster array ///

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

/// alters state of clustersFound if clusters found ///

var clusterFound = false;

function foundMatch() {
  if (cluster.length >= 3) {
    console.log("cluster found");
    clusterFound = true;
  }
};

/// eliminates clusters found  ///

function eliminateCluster() {
  foundMatch();
  if (clusterFound === true) {
    for (var i = 0; i < cluster.length; i++){
      gameBoard.tiles[cluster[i].row][cluster[i].col].type = -1;
      gameBoard.tiles[cluster[i].row][cluster[i].col].aplha = 0;
    }
  }
  clear();
  reUp();
  cluster = [];
  clusterFound = false;
  cleanTile();
}

/// resets tiles so they can be run though findMatch again ///

var cleanTile = function() {
  for (var i = 0; i < gameBoard.rows; i++){
    for (var j = 0; j < gameBoard.columns; j++){
      gameBoard.tiles[i][j].checked = false;
      gameBoard.tiles[i][j].matched = false;
    }
  }
}

                    /// find win state //

var winner = false;
var findWin = function() {
  for (var i = 0; i < gameBoard.columns; i++){
    for (var j = 0; j < gameBoard.rows; j++){
      if (gameBoard.tiles[i][j] !== -1) {
        winner = false;
      } else {
        winner = true;
        console.log("winner!");
      }
    }
  }
}

                  // find lose state //

var lose = false
var gameOver = function() {
  for (var i = 0; i < gameBoard.columns; i++){
    if (gameBoard.tiles[gameBoard.rows-1][i].type !== -1){
      lose = true;
      console.log("game over")
    }
  }
}

/// draws the blue rectangle at the bottom of the playfield ///

var drawGame = function() {
  ctx.fillStyle="#003399";
  ctx.fillRect(0,550,525,100);
}

///// MAIN INTERVAL LOOP THAT RUNS THE GAME //////

setInterval(function() {
  clear();
  drawGame();
  drawTiles();
  renderMouseAngle();
  drawPlayerBall();
  gameOver();
  findWin();
}, 40);

///  MAIN SET UP FUNCTION  ///
///    BUILDS PLAYFIELD    ///

function setUp() {
  clear()
  drawGame();
  makeGameBoard();
  drawTiles();
  makePlayerBall();
};

/// REFRESHES GAME TILES AND PIECES WITHOUT FULL RESET ///

function reUp() {
  drawGame();
  drawTiles();
  makePlayerBall();
}

/// CLEARS THE CANVAS OF OLD TILES FOR REFRESH ///

function clear() {
  ctx.clearRect(0, 0, 525, 700);
}


                  ////////////////////
                  ////SCRATCH PAD/////
                  ////////////////////


// somehow we need to be able to identify the array coodinates
// of the playerBall even
// even though we have incorporated it already

// var toCheck= [];
// var cluster = [];
// var numberChecked = 0;

// var findMatch = function() {
//   while(toCheck.length > 0) {
//     for (var i = 0; i < toCheck.length; i++) {
//       var touching = toCheck[i].row % 2 === 0 ? evenRowTouching : oddRowTouching;
//         for (k = 0; k < touching.length; k++) {
//           var calcrow = toCheck[i].row + touching[k][0];
//           var calccol = toCheck[i].col + touching[k][1];
//           var functile = gameBoard.tiles[calcrow][calccol];
//             if (functile.checked !== true) {
//             if ((calcrow < 13) && (calcrow > -1) && (calccol < 10) && (calccol > -1)){
//               if ((functile.type === player.emoji.tiletype) && (functile.checked === false)) {
//                 functile.matched = true;
//                 functile.checked = true;
//                 toCheck.push(functile);
//                 numberChecked++;
//                 cluster.push(toCheck[i]);
//               } else {
//                 functile.checked = true;
//               }
//             }
//             }
//         }
//     }
//   }
// };


