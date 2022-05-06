class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Digite seu nome");
    this.playButton = createButton("Jogar");
    this.titleImg = createImg("./assets/TITULO.png", "nome do jogo");
    this.greeting = createElement("h2");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  display() {
   this.setElementsPosition();
   this.setElementsStyle();
   this.handleMousePressed();
  }

  setElementsStyle() {
    this.playButton.class("customButton");
    this.input.class("customInput");
    this.greeting.class("greeting");
    this.titleImg.class("gameTitle");
  }

  setElementsPosition(){
    this.input.position(width/2 -130, height/2 - 80);
    this.titleImg.position(width/2 - 650 ,50);
    this.playButton.position(width/2 - 115, height/2-20);
    this.greeting.position(width/2 -300, height/2 - 100);
  }

  handleMousePressed(){
    this.playButton.mousePressed(() => {
      this.playButton.hide();
      this.input.hide();
      // <br> -> quebra de linha
      var message = `Olá, ${this.input.value()} <br> Espere o outro jogador entrar...`;
      this.greeting.html(message);
      playerCount+=1;
      player.updatePlayerCount(playerCount);
      player.name = this.input.value();
      player.index = playerCount;
      player.addPlayer();
      player.getDistance();
    });
  }
}