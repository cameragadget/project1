console.log("main_js loaded")

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
}




var ball1 = new Image();
ball1.src='assets/images/moj1.png';
var ball2 = new Image();
ball2.src='assets/images/moj2.png';
var ball3 = new Image();
ball3.src='assets/images/moj3.png';
var ball4 = new Image();
ball4.src='assets/images/moj4.png';
var ball5 = new Image();
ball5.src='assets/images/moj5.png';

var ballArray = [ball1, ball2, ball3, ball4, ball5];

var tileball = ballArray[Math.floor(Math.random()*ballArray.length)];

var randomBall = ballArray[Math.floor(Math.random()*ballArray.length)];

var testArray = [
[ball1, ball2, ball2, ball5, ball5, ball5, ball2, ball3, ball3, ball1],
[ball2, ball2, ball4, ball5, ball5, ball5, ball2, ball3, ball3, ball1],
[ball3, ball3, ball3, ball5, ball5, ball5, ball2, ball3, ball3, ball1],
[ball4, ball4, ball4, ball4, ball5, ball5, ball2, ball3, ball3, ball1],
[ball5, ball5, ball5, ball5, ball5, ball4, ball2, ball3, ball3, ball1]
]



// this creates a game board, but does not enter pieces or coordinates
// into the scoring array. I will need to revisit this when I complete
// the scoring array and functionality to integrate.  this is
// simply proof of concept.
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
          ctx.drawImage(testArray[i][j],(width)*j, yPos, width, height);
        //ctx.drawImage(ballArray[Math.floor(Math.random()*ballArray.length)],(width)*j, yPos, width, height);
      } else {
        ctx.drawImage(testArray[i][j],((width)*j)+(width/2), yPos, width, height);
      }
}
}
}


