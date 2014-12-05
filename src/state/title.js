var Title = {
  preload: function() {
  },
  create: function() {
    var _this = this;
    this.game.add.sprite(0, 0, "preloadImage");
    var text = game.add.text(this.game.width / 2, 16, "Dave Hilden's Motorcyle Kitten Rescue", { fill: '#ffffff' });
    text.anchor.x = 0.5;
    this.game.input.onDown.add(function(event) {
      _this.game.state.start("Play");
    });
  },
  update: function() {
  },
  render: function() {
  }
};
