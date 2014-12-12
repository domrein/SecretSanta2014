var Play = {
  preload: function() {
  },
  create: function() {
    var _this = this;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 2500;

    game.stage.backgroundColor = "#2222AA";

    game.add.sprite(0, 0, "preloadImage");

    // draw score
    var loveSize = 30;
    this.scoreText = game.add.text(this.game.width - 250, 15, "LOVE:", {fill: "#FFB6C1", font: loveSize + "px Impact"});

    this.player = game.add.sprite(50, 300, "Dave");
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.y = 0.5;

    this.game.input.onDown.add(function(event) {
      if (_this.player.body.onFloor()) {
        _this.player.body.velocity.y -= 1000;
      }
    });

    // bg = game.add.tileSprite(0, 0, 800, 600, "background");
    // bg.fixedToCamera = true;
    
    // game.physics.arcade.gravity.y = 250;

    // player = game.add.sprite(32, 32, 'dude');
    // game.physics.enable(player, Phaser.Physics.ARCADE);

    // player.body.bounce.y = 0.2;
    // player.body.collideWorldBounds = true;
    // player.body.setSize(20, 32, 5, 16);

    // player.animations.add('left', [0, 1, 2, 3], 10, true);
    // player.animations.add('turn', [4], 20, true);
    // player.animations.add('right', [5, 6, 7, 8], 10, true);

    // game.camera.follow(player);

    // cursors = game.input.keyboard.createCursorKeys();
    // jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  update: function() {

  },
  render: function() {

  },
  makeBuilding: function(x, y) {
    // var building = game.add.sprite()
  }
};


// var map;
// var tileset;
// var layer;
// var player;
// var facing = 'left';
// var jumpTimer = 0;
// var cursors;
// var jumpButton;
// var bg;

// function create() {



//     map = game.add.tilemap('level1');

//     map.addTilesetImage('tiles-1');

//     map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

//     layer = map.createLayer('Tile Layer 1');

//     //  Un-comment this on to see the collision tiles
//     // layer.debug = true;

//     layer.resizeWorld();


// }

// function update() {

//     game.physics.arcade.collide(player, layer);

//     player.body.velocity.x = 0;

//     if (cursors.left.isDown)
//     {
//         player.body.velocity.x = -150;

//         if (facing != 'left')
//         {
//             player.animations.play('left');
//             facing = 'left';
//         }
//     }
//     else if (cursors.right.isDown)
//     {
//         player.body.velocity.x = 150;

//         if (facing != 'right')
//         {
//             player.animations.play('right');
//             facing = 'right';
//         }
//     }
//     else
//     {
//         if (facing != 'idle')
//         {
//             player.animations.stop();

//             if (facing == 'left')
//             {
//                 player.frame = 0;
//             }
//             else
//             {
//                 player.frame = 5;
//             }

//             facing = 'idle';
//         }
//     }
    
//     if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
//     {
//         player.body.velocity.y = -250;
//         jumpTimer = game.time.now + 750;
//     }

// }

// function render () {

//     // game.debug.text(game.time.physicsElapsed, 32, 32);
//     // game.debug.body(player);
//     // game.debug.bodyInfo(player, 16, 24);

// }