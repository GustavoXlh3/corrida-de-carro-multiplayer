var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount = 0;
var gameState;
var players;
var trackImg;
var cars, car1, car2, car1Img, car2Img;
var fuelImg, goldCoinImg, lifeImg, obstacle1Img, obstacle2Img, blastImg;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  trackImg = loadImage('./assets/track.jpg');
  car1Img = loadImage('./assets/car1.png');
  car2Img = loadImage('./assets/car2.png');
  fuelImg = loadImage("./assets/fuel.png");
  goldCoinImg = loadImage("./assets/goldCoin.png");
  lifeImg = loadImage("./assets/life.png");
  obstacle1Img = loadImage("./assets/obstacle1.png");
  obstacle2Img = loadImage("./assets/obstacle2.png");
  blastImg = loadImage("./assets/blast.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount == 2){
    game.updateState(1);
  }
  if (gameState == 1){
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
