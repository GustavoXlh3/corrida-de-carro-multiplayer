class Game {
  constructor() {
    this.resetButton = createButton("");
    this.resetTitle = createElement("h2");
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getPlayerCount();

    car1 = createSprite(width/2-100, height-50);
    car1.addImage(car1Img);
    car1.scale = 0.07;
    
    car2 = createSprite(width/2+100, height-50);
    car2.addImage(car2Img);
    car2.scale = 0.07;
    
    //array
    cars = [car1, car2];
  }
  getState(){
    var gameRef = database.ref("gameState");
    gameRef.on("value", (data) => {
      gameState = data.val();
    })
  }

  updateState(state){
    database.ref("/").update({
      gameState: state
    })
  }

  handleElements() {
    form.hide();
    form.titleImg.class("gameTitleAfterEffect");
    form.titleImg.position(40, 50);
    this.resetButton.position(width/2+400, 100);
    this.resetButton.class("resetButton");
    this.resetTitle.position(width/2+350, 40);
    this.resetTitle.html("reiniciar jogo");
    this.resetTitle.class("resetText");
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        gameState: 0,
        playerCount: 0,
        players:{},
      });
      window.location.reload();
    })
  }

  play() {
    Player.getInfosPlayer();
    this.handleElements();
    this.handleResetButton();

    if(players != undefined) {
      image(trackImg, 0, -height * 5, width, height * 6);
      var index = 0;
      for (var plr in players){
        var y = height - players[plr].positionY;
        var x = players[plr].positionX;
        cars[index].position.y = y;
        cars[index].position.x = x;
        index++;

        if(player.index == index) {
          fill('red');
          ellipse(x, y, 60, 60);
          camera.position.x = width/2;

          if(players[plr].positionY > height) {
            camera.position.y = y;
          }
        }
      }
    }
    this.carControler();
    drawSprites();
  }

  carControler(){
    if(keyDown(UP_ARROW)){
      player.positionY += 10;
      player.update();
    }
    if(keyDown(DOWN_ARROW)){
      player.positionY -= 10;
      player.update();
    }
    if(keyDown(RIGHT_ARROW)){
      player.positionX += 10;
      player.update();
    }
    if(keyDown(LEFT_ARROW)){
      player.positionX -= 10;
      player.update();
    }
  }
}
