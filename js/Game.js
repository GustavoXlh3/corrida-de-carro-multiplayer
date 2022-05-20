class Game {
  constructor() {
    this.resetButton = createButton("");
    this.resetTitle = createElement("h2");
    this.leaderTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.isMoving = false;
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
    fuelGroup = new Group();
    coinGroup = new Group();
    obstaclesGroup = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Img },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Img },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Img },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Img },
      { x: width / 2, y: height - 2800, image: obstacle2Img },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Img },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Img },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Img },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Img },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Img },
      { x: width / 2, y: height - 5300, image: obstacle1Img },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Img },
    ];
    this.addSprites(obstaclesGroup, obstaclesPositions.length, obstacle1Img, 0.04, obstaclesPositions);
    this.addSprites(fuelGroup, 12, fuelImg, 0.02);
    this.addSprites(coinGroup, 20, goldCoinImg, 0.05);
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
    form.titleImg.position(width/2-170, 50);
    this.resetButton.position(width/2+400, 100);
    this.resetButton.class("resetButton");
    this.resetTitle.position(width/2+350, 40);
    this.resetTitle.html("reiniciar jogo");
    this.resetTitle.class("resetText");

    this.leaderTitle.position(width / 18, 40);
    this.leaderTitle.html("placar");
    this.leaderTitle.class("resetText");

    this.leader1.position(width / 18, 80);
    this.leader1.html("leader1");
    this.leader1.class("leadersText");
    this.leader2.position(width / 18, 130);
    this.leader2.html("leader2");
    this.leader2.class("leadersText");
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

  handleCoin(index){
    // .collide .isTouching
    // callback
    cars[index - 1].overlap(coinGroup, (car, coin) => {
      player.score += 10;
      player.update();
      coin.remove();
    });
  }
  
  handleFuel(index){
    cars[index - 1].overlap(fuelGroup, (car,fuel) => {
      player.fuel = 185;
      player.update();
      fuel.remove();
    });
    if (this.isMoving){
      player.fuel--;
      this.isMoving = false;
    }
    if (player.fuel <= 0){
      gameState = 2;
      this.gameOver();
    }
  }

  play() {
    Player.getInfosPlayer();
    this.handleElements();
    this.handleResetButton();
    
    if (player.positionY > height * 6 - 100) {
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
      player.update();
      gameState = 2;
      this.showRank();
    }

    if(players != undefined) {
      image(trackImg, 0, -height * 5, width, height * 6);
      var index = 0;
      this.showLeaderboard();
      this.showLifeBar();
      this.showFuelBar();
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
          this.handleCoin(index);
          this.handleFuel(index);
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
      this.isMoving = true;
    }
    if(keyDown(DOWN_ARROW)){
      player.positionY -= 10;
      player.update();
      this.isMoving = true;
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

  addSprites(group, numSprites, image, scale, positions = []) {
    // limite == for
    // sem limite == while
    // var resposta = "não";
    // while (resposta === "não") {
    //   text("Poderia me dar um óculos VR?");
    //   resposta = input();
    // }
    for (var i = 0; i<numSprites; i++) {
      var x; 
      var y;
      if (positions.length>0) {
        x = positions[i].x;
        y = positions[i].y;
        image = positions[i].image;
      } else {
        x = random(width/2+150, width/2 - 150);
        y = random(-height*4.5, height-400);
      }

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", image);
      sprite.scale = scale;
      group.add(sprite);
    }
  }

  showLeaderboard() {
    var leader1, leader2;
    /* 
      {
        player1: {
          name: "Gustavo",
          score: 12
        } 
      }
    */
    var player = Object.values(players);
    if (
      (player[0].rank === 0 && player[1].rank === 0) ||
      player[0].rank === 1
    ) {
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
        player[0].rank + "&emsp;" + player[0].name + "&emsp;" + player[0].score;

      leader2 =
        player[1].rank + "&emsp;" + player[1].name + "&emsp;" + player[1].score;
    }

    if (player[1].rank === 1) {
      leader1 =
        player[1].rank + "&emsp;" + player[1].name + "&emsp;" + player[1].score;

      leader2 =
        player[0].rank + "&emsp;" + player[0].name + "&emsp;" + player[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  showFuelBar() {
    push();
    fill("white");
    rect(player.positionX - 100, height - player.positionY - 100, 185, 20);
    fill("#ffc400");
    rect(
      player.positionX - 100,
      height - player.positionY - 100,
      player.fuel,
      20
    );
    pop();
    image(
      fuelImg,
      player.positionX - 120,
      height - player.positionY - 100,
      20,
      20
    );
  }

  showLifeBar() {
    push();
    fill("white");
    rect(player.positionX - 100, height - player.positionY - 130, 185, 20);
    fill("#d4002a");
    rect(
      player.positionX - 100,
      height - player.positionY - 130,
      player.life,
      20
    );
    pop();
    image(
      lifeImg,
      player.positionX - 120,
      height - player.positionY - 130,
      20,
      20
    );
    
  }

  gameOver() {
    swal({
      title: `fim de jogo!`,
      text: "Oops! Você perdeu a corrida!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "obrigado por jogar!",
    });
  }

  showRank() {
    swal({
      title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
      text: "Você alcançou a linha de chegada com sucesso!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok",
    });
  }
}
