var Preload = {
  preload: function() {
    var preloadBar = game.add.sprite(0, game.height / 2 - 10, "PreloadBar");
    game.load.setPreloadSprite(preloadBar, 0);

    // Load atlas
    game.load.atlas("Sprites", "assets/Sprites.png", "assets/Sprites.json", null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.audio("Music", ["assets/MegaBlaster.mp3", "assets/MegaBlaster.ogg"]);
  },
  create: function() {
    this.game.state.start("Title");
    var music = game.add.audio("Music", 0.7, true);
    music.play();
  },
  update: function() {
  },
  render: function() {
  }
};
