let gameOverScene = new Phaser.Scene('gameOver');

gameOverScene.preload = function(game) {
  this.load.image('gameover', 'assets/gameover.png')
  this.load.image('startAgainButton', 'assets/again.png')


};

gameOverScene.create = function() {
   this.background = this.add.sprite(0, 0, 'gameover');
   this.background.setOrigin(0,0)
   this.background.setDisplaySize(width, height)

   this.startAgainButton = this.add.sprite(width * 0.50, height * 0.75, 'startAgainButton')
   this.startAgainButton.setDisplaySize(200, 70)
   this.startAgainButton.width = 200
   this.startAgainButton.height = 70
   this.startAgainButton.setInteractive();


   this.input.on('gameobjectdown', restartGame, this)

}

function restartGame(pointer,gameObject){
  if(gameObject.texture.key == 'startAgainButton'){
    console.log('START')
    // this.music.stop();
    this.scene.start('Level1')
  }
}
