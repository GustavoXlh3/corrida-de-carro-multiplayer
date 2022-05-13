class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.score = 0;
    this.life = 185;
    this.fuel = 185;
  }
  /** players {
     *  player1 {
     * 
     * }
     *  player2 {}
   * } */
  addPlayer() {
    var playerRef = "players/player"+ player.index;
    if(player.index == 1) {
      this.positionX = width/2 - 100;
    } else {
      this.positionX = width/2 + 100;
    }

    database.ref(playerRef).set({
      name: this.name,
      positionX: this.positionX,
      positionY:  this.positionY,
      rank: this.rank,
      score: this.score,
      life: this.life,
      fuel: this.fuel,
    });
  }

  getPlayerCount() {
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on('value', function (data) {
      playerCount = data.val();
    })
  }

  updatePlayerCount(number) {
    database.ref("/").update({
      playerCount: number
    });
  }

  static getInfosPlayer() {
    var playersRef = database.ref("players");
    playersRef.on("value", function (data) {
      players = data.val();
    });
  }

  update(){
    var updateRef = "/players/player"+ this.index;
    database.ref(updateRef).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      life: this.life,
      fuel: this.fuel,
    });
  }

  getDistance(){
    var distanceRef = database.ref("/players/player" + this.index);

    distanceRef.on("value",(data)=> {
      var position = data.val();
      this.positionX = position.positionX;
      this.positionY = position.positionY;
    });
  }

 // Math.round() 
 // Player.getInfosPlayer();
}