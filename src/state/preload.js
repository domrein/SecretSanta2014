var Preload = {
  preload: function() {
    this.game.load.image("Background", "assets/bg.png");
    this.game.load.image("Dave", "assets/Motorcycle_Rider.png");
    this.game.load.image("DaveBikeBack", "assets/MotorCycleBody.png");
    this.game.load.image("DaveBikeFront", "assets/Motorcycle_dash.png");
    this.game.load.image("Kitty", "assets/cat.png");
    this.game.load.image("Heart", "assets/heart.png");
    this.game.load.image("Building", "assets/buildingTile.png");
    this.game.load.image("TitleText", "assets/title.png");
    this.game.load.image("FireWindow", "assets/fireWindow.png");
    this.game.load.image("FireTop", "assets/firerooftop.png");
    this.game.load.image("FireAir", "assets/fireAirborne.png");
  },
  create: function() {
    this.game.state.start("Title");
  },
  update: function() {
  },
  render: function() {
  }
};
