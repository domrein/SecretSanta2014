var Preload = {
  preload: function() {
    this.game.load.image("preloadImage", "../../assets/preloadImage.png");
    this.game.load.image("Dave", "../../assets/Dave.png");
    this.game.load.image("Kitty", "../../assets/Kitty.png");
    this.game.load.image("Heart", "../../assets/Heart.png");
  },
  create: function() {
    this.game.state.start("Title");
  },
  update: function() {
  },
  render: function() {
  }
};
