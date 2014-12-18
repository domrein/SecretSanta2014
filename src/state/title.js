var Title = {
  preload: function() {
  },
  create: function() {
    var _this = this;
    this.game.add.sprite(0, 0, "Sprites", "Background_1.png");
    
    var roof = this.game.add.tileSprite(0, 380, game.width, game.height - 380, "Sprites", "BuildingTile_1.png");
    roof.autoScroll(-600, 0);

    var dave = this.game.add.sprite(290, 286);
    var motoBody = this.game.add.sprite(0, 0, "Sprites");
    motoBody.animations.add("drive", ["MotorcycleBody_1.png", "MotorcycleBody_2.png", "MotorcycleBody_3.png", "MotorcycleBody_2.png"], 15, true);
    motoBody.play("drive");
    var motoRider = this.game.add.sprite(0, 0, "Sprites");
    motoRider.animations.add("drive", ["MotorcycleRider_1.png", "MotorcycleRider_2.png", "MotorcycleRider_3.png", "MotorcycleRider_2.png"], 5, true);
    motoRider.play("drive");
    var motoFront = this.game.add.sprite(0, 0, "Sprites", "MotorcycleDash_1.png");
    dave.addChild(motoBody);
    dave.addChild(motoRider);
    dave.addChild(motoFront);

    game.add.tween(dave.position).to({x: 380}, 2500, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);

    var titleText = this.game.add.sprite(0, 0, "Sprites", "Title_1.png");
    titleText.anchor.setTo(0.5, 0.5);
    titleText.position.x = game.width / 2;
    titleText.position.y = game.height / 2 - 70;

    this.game.input.onDown.add(function(event) {
      // game.scale.startFullScreen();
      game.state.start("Play");
    });
  },
  update: function() {
  },
  render: function() {
  }
};
