var Preload = {
  preload: function() {
    this.game.load.image("Background", "assets/bg.png");
    this.game.load.image("Dave", "assets/Motorcycle_Rider.png");
    this.game.load.image("DaveBikeBack", "assets/MotorcycleBody.png");
    this.game.load.image("DaveBikeFront", "assets/Motorcycle_dash.png");
    this.game.load.image("Kitty", "assets/cat.png");
    this.game.load.image("Heart", "assets/Heart.png");
    this.game.load.image("Building", "assets/buildingTile.png");
    this.game.load.image("TitleText", "assets/title.png");
    this.game.load.image("FireWindow", "assets/fireWindow.png");
    this.game.load.image("FireTop", "assets/firerooftop.png");
    this.game.load.image("FireAir", "assets/fireAirborne.png");

    game.load.audio("Music", ["assets/MegaBlaster.mp3", "assets/MegaBlaster.ogg"]);
  },
  create: function() {
    this.game.state.start("Title");
    var music = game.add.audio("Music", 0.7, true);
    music.play();
  },
  update: function() {
  },
  render: function() {
  }
};
