var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount = 0;
var gameState;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  player.getPlayerCount();
}

function draw() {
  background(backgroundImage);
  if (playerCount == 2){
    game.updateState(1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
