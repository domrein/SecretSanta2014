var Preload = {
  preload: function() {
    this.game.load.image("preloadImage", "../../assets/preloadImage.png");
  },
  create: function() {
    this.game.state.start("Title");
  },
  update: function() {
  },
  render: function() {
  }
};
