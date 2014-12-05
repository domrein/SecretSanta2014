var game = new Phaser.Game(1024, 768, Phaser.AUTO, "game");
game.state.add("Boot", Boot);
game.state.add("Preload", Preload);
game.state.add("Title", Title);
game.state.add("Play", Play);
game.state.start("Boot");
