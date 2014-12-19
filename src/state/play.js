var Play = {
  preload: function() {
  },
  create: function() {
    var _this = this;
    
    // state variables
    this.gameSpeed = 650;
    
    // init physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 2500;
    game.physics.arcade.OVERLAP_BIAS = 30;

    // add sprite groups
    game.stage.backgroundColor = "#2222AA";
    game.add.sprite(0, 0, "Sprites", "Background_1.png");

    this.bgBuildings = this.game.add.tileSprite(0, 0, game.width, game.height, "Sprites", "CityScape1_1.png");
    this.bgBuildings.autoScroll(-this.gameSpeed / 5.2, 0);

    this.buildings = game.add.group();
    
    this.kittens = game.add.group();
    for (var i = 0; i < 20; i ++) {
      var catNum = Math.floor(Math.random() * 3) + 1;
      var kitten = game.add.sprite(0, 0, "Sprites");
      kitten.animations.add("hop", ["Cat" + catNum + "_1.png", "Cat" + catNum + "_2.png"], 25, true);
      kitten.play("hop");
      game.physics.enable(kitten, Phaser.Physics.ARCADE);
      kitten.body.bounce.y = 1;
      this.kittens.add(kitten);
      kitten.kill();
    }

    // draw score
    var loveSize = 30;
    this.score = 0;
    this.displayScore = 0;
    this.scoreText = game.add.text(this.game.width - 250, 15, "LOVE: " + this.displayScore, {fill: "#FFB6C1", font: loveSize + "px Impact"});

    this.player = game.add.sprite(70, game.height - 96 - 100);
    // this.player.anchor.setTo(.5, .5);
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.width = 124;
    this.player.body.height = 96;
    // this.player.body.collideWorldBounds = true;
    this.player.body.bounce.y = 0.35;

    var motoBody = this.game.add.sprite(0, 0, "Sprites");
    motoBody.animations.add("drive", ["MotorcycleBody_1.png", "MotorcycleBody_2.png", "MotorcycleBody_3.png", "MotorcycleBody_2.png"], 15, true);
    motoBody.play("drive");
    var motoRider = this.game.add.sprite(0, 0, "Sprites");
    motoRider.animations.add("drive", ["MotorcycleRider_1.png", "MotorcycleRider_2.png", "MotorcycleRider_3.png", "MotorcycleRider_2.png"], 25, true);
    motoRider.play("drive");
    var motoFront = this.game.add.sprite(0, 0, "Sprites", "MotorcycleDash_1.png");
    this.player.addChild(motoBody);
    this.player.addChild(motoRider);
    this.player.addChild(motoFront);

    this.loveEmitter = game.add.emitter(0, 0, 100);
    this.loveEmitter.makeParticles("Sprites", ["Heart_1.png"]);
    this.loveEmitter.gravity = -2500;
    this.loveEmitter.setRotation(0, 0);
    this.loveEmitter.setAlpha(0.95, 0.0, 2000);
    this.loveEmitter.setScale(0.75, 1, 0.75, 1);

    function jump(event) {
      if (_this.playerJumpCount) {
        _this.playerJumpCount --;
        _this.player.body.velocity.y = -1000;
      }      
    }
    game.input.onDown.add(jump);
    game.input.keyboard.onDownCallback = jump;

    this.makeBuilding(0, 25, 100, false);

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
      this.chaseAngle += 0.05;
      this.chaseX = 70 + Math.sin(this.chaseAngle) * 30;
      
      this.player.body.position.x = this.chaseX;
    }

    this.gameSpeed += 0.1;

    var moveAmount = this.gameSpeed / 70;

    // loop over buildings
    // if the right of the last building is on the screen, then we need to generate a new building
    var maxRight = 0;
    this.buildings.children.forEach(function(building) {
      // building.body.velocity.x = -_this.gameSpeed;
      building.body.position.x -= moveAmount;

      if (building.body.right > maxRight) {
        maxRight = building.body.right;
      }
    });
    if (maxRight < game.width) {
      this.makeBuilding(game.width + this.gameSpeed * .5, Math.floor(Math.random() * 10) + 2, Math.floor(Math.random() * 300) + 30, true);
    }

    this.kittens.children.forEach(function(kitten) {
      // building.body.velocity.x = -_this.gameSpeed;
      kitten.body.position.x -= moveAmount;
    });

    game.physics.arcade.collide(this.player, this.buildings, function(player, building) {
      _this.playerOnBuilding = true;
      _this.player.body.position.x = _this.chaseX;
      // _this.player.body.velocity.x = _this.gameSpeed + (_this.chaseX - _this.player.body.position.x);
    });

    game.physics.arcade.collide(this.buildings, this.kittens);

    game.physics.arcade.overlap(this.player, this.kittens, function(player, kitten) {
      _this.score += 100 + Math.floor(Math.random() * 100);
      if (_this.score > highScore) {
        highScore = _this.score;
      }
      
      // move emitter to cat location and burst hearts
      _this.loveEmitter.x = kitten.body.position.x;
      _this.loveEmitter.y = kitten.body.position.y;
      _this.loveEmitter.start(true, 2000, null, 6);

      // kitten.destroy();
      kitten.kill();
    });

    // update score
    if (_this.displayScore < _this.score) {
      var addAmount = Math.ceil((_this.score - _this.displayScore) / 8);
      _this.displayScore += addAmount;
      _this.scoreText.text = "LOVE: " + _this.displayScore;
    }

    if (this.player.body.y > game.height) {
      game.state.start("Title");
    }

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
  makeBuilding: function(x, width, height, spawnKittens) {
    var _this = this;
    var building = this.game.add.tileSprite(x, game.height - height, width * 63, height, "Sprites", "BuildingTile_1.png");
    // var building = game.add.sprite(x, game.height - height);
    game.physics.enable(building, Phaser.Physics.ARCADE);
    building.body.allowGravity = false;
    building.body.immovable = true;
    building.body.width = width * 63;
    building.body.height = 400;
    
    // for (var i = 0; i < width; i ++) {
    //   var buildingPiece = game.add.sprite(i * 63, 0, "Building");
    //   building.addChild(buildingPiece);
    // }

    // building.body.velocity.x = -this.gameSpeed;

    building.update = function() {
      if (this.body.position.x + this.body.width < 0) {
        this.destroy();
      }
    };

    if (spawnKittens) {
      // place kittens randomly above building
      var numKittens = Math.floor(Math.random() * width / 2);
      var kittenLocations = [];
      for (i = 1; i < width; i ++) {
        if (Math.random() > 0.7) {
          var hopHeight = Math.floor(Math.random() * 20) + 10;
          var kitten = this.kittens.getFirstExists(false);
          if (kitten) {
            kitten.reset(x + i * 63, game.height - height - 64 - hopHeight);
          }
        }
      }
    }

    this.buildings.add(building);
  }
};
