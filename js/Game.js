class Game {
  constructor() {}

  start() {
    form = new Form();
    form.display();
    player = new Player();
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
}
