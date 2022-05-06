class Game {
  constructor() {}

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
  }

  play() {
    Player.getInfosPlayer();
    this.handleElements();

    if(players != undefined) {
      image(trackImg, 0, -height * 5, width, height * 6);
    }
    drawSprites();
  }
}
