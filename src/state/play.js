var Play = {
  preload: function() {
  },
  create: function() {
    var _this = this;
    
    // state variables
    this.gameSpeed = 200;
    
    // init physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 2500;

    // add sprite groups
    game.stage.backgroundColor = "#2222AA";
    game.add.sprite(0, 0, "preloadImage");
    this.buildings = game.add.group();
    this.kittens = game.add.group();

    this.loveEmitter = game.add.emitter(0, 0, 100);
    this.loveEmitter.makeParticles("Heart");
    this.loveEmitter.gravity = -2500;
    // this.loveEmitter.setRotation(0, 0);
    this.loveEmitter.setAlpha(0.9, 0.0, 2000);
    this.loveEmitter.setScale(0.5, 1, 0.5, 1);

    // draw score
    var loveSize = 30;
    this.score = 0;
    this.scoreText = game.add.text(this.game.width - 250, 15, "LOVE:", {fill: "#FFB6C1", font: loveSize + "px Impact"});

    this.player = game.add.sprite(70, 200, "Dave");
    this.player.anchor.setTo(.5, .5);
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.y = 0.5;

    this.game.input.onDown.add(function(event) {
      if (_this.playerJumpCount) {
        _this.playerJumpCount --;
        _this.player.body.velocity.y = -1000;
      }
    });

    this.makeBuilding(-100, 15, 100);

    // the point the motorcycle tries to be at
    this.chaseX = 100;
    this.chaseAngle = 0;
    this.playerOnBuilding = false;
  },
  update: function() {
    var _this = this;

    if (this.playerOnBuilding) {
      this.playerOnBuilding = false;
      this.playerJumpCount = 1;

      // move back and forth towards the floating chase x point
      this.chaseAngle += .05;
      this.chaseX = 70 + Math.sin(this.chaseAngle) * 30;
      if (this.player.body.position.x < this.chaseX) {
        this.player.body.velocity.x = this.gameSpeed + (this.chaseX - this.player.body.position.x);
      }
      else if (this.player.body.position.x > this.chaseX) {
        this.player.body.velocity.x = this.gameSpeed - (this.player.body.position.x - this.chaseX);
      }
    }

    game.physics.arcade.collide(this.player, this.buildings, function(player, building) {
      _this.playerOnBuilding = true;
    });

    game.physics.arcade.collide(this.buildings, this.kittens);

    game.physics.arcade.overlap(this.player, this.kittens, function(player, kitten) {
      _this.score ++;
      _this.scoreText.text = "LOVE: " + _this.score;
      
      // move emitter to cat location and burst hearts
      _this.loveEmitter.x = kitten.body.position.x;
      _this.loveEmitter.y = kitten.body.position.y;
      _this.loveEmitter.start(true, 2000, null, 10);

      kitten.destroy();
    });

    // rotate when jumping
    // console.log(this.player.body.velocity.y);
    // if (this.player.body.velocity.y > 20) {
    //   this.player.rotation -= .1;
    // }
    // else if (this.player.body.velocity.y < -20) {
    //   this.player.rotation += .1;
    // }
  },
  render: function() {
  },
  makeBuilding: function(x, width, height) {
    var _this = this;
    var building = game.add.sprite(x, game.height - height);
    game.physics.enable(building, Phaser.Physics.ARCADE);
    building.body.allowGravity = false;
    building.body.immovable = true;
    building.body.width = (width + 2) * 50;
    building.body.height = 400;
    
    var buildingLeft = game.add.sprite(0, 0, "BuildingLeft");
    building.addChild(buildingLeft);
    for (var i = 0; i < width; i ++) {
      var buildingMiddle = game.add.sprite((i + 1) * 50, 0, "BuildingMiddle");
      building.addChild(buildingMiddle);
    }
    var buildingRight = game.add.sprite((width + 1) * 50, 0, "BuildingRight");
    building.addChild(buildingRight);

    building.body.velocity.x = -this.gameSpeed;

    building.update = function() {
      if (this.body.position.x + this.body.width < 0) {
        this.destroy();
      }
    };

    // place kittens randomly above building
    var numKittens = Math.floor(Math.random() * width / 2);
    var kittenLocations = [];
    for (i = 0; i < width + 2; i ++) {
      if (Math.random() > .7) {
        var kitten = game.add.sprite(x + i * 50, game.height - height - 180, "Kitty");
        game.physics.enable(kitten, Phaser.Physics.ARCADE);
        kitten.body.velocity.x = -this.gameSpeed;
        kitten.body.bounce.y = 1;
        this.kittens.add(kitten);
      }
    }

    this.buildings.add(building);
  }
};
