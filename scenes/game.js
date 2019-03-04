let width = window.innerWidth
let height = window.innerHeight

let menuScene = new Phaser.Scene('Menu');

let config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: width, // game width
  height: height, // game height
  scene: menuScene, // our newly created scene
  physics: {
       default: 'arcade',
       arcade: {
           gravity: { y: 200 },
           debug: false
       }
   },
};

let game = new Phaser.Game(config);

menuScene.preload = function() {
  this.load.image('background', 'assets/bg.jpg');
  this.load.image('startButton', 'assets/start.png')
  this.load.image('title', 'assets/title.png')
  this.load.audio('music', 'assets/menuMusic.mp3')
};

menuScene.create = function() {
   this.background = this.add.sprite(0, 0, 'background');
   this.background.setOrigin(0,0)
   this.background.setDisplaySize(width, height)

   this.startButton = this.add.sprite(width * 0.50, height * 0.70, 'startButton');
   this.startButton.setDisplaySize(200, 75)
   this.startButton.setInteractive();

   this.title = this.add.sprite(width * 0.50, height * 0.20, 'title');
   this.title.setDisplaySize(400, 250)

   // this.music = this.sound.add('music')
   // this.music.setLoop(true)
   // this.music.play()

   console.log(this)
   this.input.on('gameobjectdown',startGame, this)

//Add all of our levels/scenes
   this.scene.add('Level1', level1Scene)
   this.scene.add('gameOver', gameOverScene)
}

function startGame(pointer,gameObject){
  console.log('clicked')
  if(gameObject.texture.key == 'startButton'){
    console.log('START')
    // this.music.stop();
    // this.scene.add('Level1')
    this.scene.start('Level1')
  }
}
