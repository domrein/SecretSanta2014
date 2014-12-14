var Preload = {
  preload: function() {
    this.game.load.image("preloadImage", "../../assets/preloadImage.png");
    this.game.load.image("Dave", "../../assets/Dave.png");
    this.game.load.image("Kitty", "../../assets/Kitty.png");
    this.game.load.image("Heart", "../../assets/Heart.png");
    this.game.load.image("BuildingLeft", "../../assets/BuildingLeft.png");
    this.game.load.image("BuildingMiddle", "../../assets/BuildingMiddle.png");
    this.game.load.image("BuildingRight", "../../assets/BuildingRight.png");
  },
  create: function() {
    this.game.state.start("Title");
  },
  update: function() {
  },
  render: function() {
  }
};
