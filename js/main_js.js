console.log("main_js loaded")



  var canvas = document.getElementById('playfield');
    var ctx = canvas.getContext('2d');



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



var x = 0;
var y = 0;
var dx = 0;
var dy = 0;
var WIDTH;
var HEIGHT;

var ctx = document.getElementById("playfield").getContext("2d");
ctx.drawImage(tileball, 64, 64);
ctx.fill();

function init() {
    var ctx = document.getElementById("playfield").getContext("2d");

    return setInterval(draw, 10);
}

function draw() {
    ctx.drawImage(tileball, x, y, 64, 64);
    ctx.fill();
    x += dx;
    y += dy;
}


init();
