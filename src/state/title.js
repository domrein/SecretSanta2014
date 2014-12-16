var Title = {
  preload: function() {
  },
  create: function() {
    var _this = this;
    this.game.add.sprite(0, 0, "Background");
    
    var roof = this.game.add.tileSprite(0, 380, game.width, game.height - 380, "Building");
    roof.autoScroll(-200, 0);

    var dave = this.game.add.sprite(300, 300);
    var motoBody = this.game.add.sprite(0, 0, "DaveBikeBack");
    var motoRider = this.game.add.sprite(0, 0, "Dave");
    var motoFront = this.game.add.sprite(0, 0, "DaveBikeFront");
    dave.addChild(motoBody);
    dave.addChild(motoRider);
    dave.addChild(motoFront);

    var titleText = this.game.add.sprite(0, 0, "TitleText");
    titleText.anchor.setTo(0.5, 0.5);
    titleText.position.x = game.width / 2;
    titleText.position.y = game.height / 2 - 70;

    this.game.input.onDown.add(function(event) {
      game.scale.startFullScreen();
      // game.state.start("Play");
    });
  },
  update: function() {
  },
  render: function() {
  }
};
