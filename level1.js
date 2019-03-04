let level1Scene = new Phaser.Scene('Level1');

level1Scene.preload = function(game) {
  console.log('preload')
  this.load.image('background1', 'assets/bg1.png');
  this.load.image('enemy', 'assets/e1.png')
  this.load.image('luke', 'assets/luke.png')
  this.load.image('idle1', 'assets/idle1.png')
  this.load.image('idle2', 'assets/idle2.png')
  this.load.image('idle3', 'assets/idle3.png')

  this.load.image('walk1', 'assets/walk1.png')
  this.load.image('walk2', 'assets/walk2.png')
  this.load.image('walk3', 'assets/walk3.png')
  this.load.image('walk4', 'assets/walk4.png')
  this.load.image('walk5', 'assets/walk5.png')
  this.load.image('walk6', 'assets/walk6.png')
  this.load.image('walk7', 'assets/walk7.png')
  this.load.image('walk8', 'assets/walk8.png')

  this.load.audio('level1Music', 'assets/menuMusic.mp3')

  this.load.image('pad', 'assets/pad.png')
  this.load.image('actionButton', 'assets/actionButton.png')
  this.load.image('laser', 'assets/laser.png')
};

level1Scene.create = function() {
   this.background = this.add.sprite(0, 0, 'background1');
   this.background.setOrigin(0,0)
   this.background.setDisplaySize(width, height)

   this.enemies = []
   //name, health, x speed, y speed, x position, y position
   this.enemy = new Enemy("thing", 100, 5, 5, 150, 75)
   //this, width, height, image key
   this.enemy.createSprite(this, 300, 200, 'enemy', )

   this.player = new Player("luke", 100, 7, 50, 100, false, true)
   this.player.createSprite(this, width * 0.2, height * 0.7, 'luke')

   // this.music = this.sound.add('level1Music')
   // this.music.setLoop(true)
   // this.music.play()

   this.pad = new GamePadControllerWithButtons(100, 5, width, height, this)
  //this.pad = new ScreenAsController(width, height, this)

  this.enemyGroup = this.physics.add.group({
    allowGravity: false,
    collideWorldBounds: true
  })
  this.enemies.push(this.enemy)
  this.enemyGroup.add(this.enemy.sprite)
  this.physics.add.overlap(this.player.sprite, this.enemyGroup, damaged.bind(this))

//Score based on time passed:-------------------------------------------------------
  //create a ScoreByTime object from the ScoreByTime class
  this.scoreKeeper = new ScoreByTime(this)
  this.scoreKeeper.start()

//Score based on events:-------------------------------------------------------
  //Create a ScoreByPoints object from the ScoreByPoints class
  // this.scoreKeeper = new ScoreByEvent(this)
  // this.scoreKeeper.addPoints(5)


}



level1Scene.update = function(){

  let direction = this.pad.checkLocation()
  if(direction == 'button'){
    this.player.shoot(this, 'laser', 10)
  }else{
    this.player.move(direction)
  }

//check for hits on player by enemy projectiles and remove projectile on hit
  let hitOn = this.player.update(this.enemyGroup.getChildren())
  if(hitOn !== null && hitOn.enemyIndex !== null && hitOn.projectileIndex !== null){
    this.enemies.getChildren()[hitOn.enemyIndex].projectiles[hitOn.projectileIndex].destroy()
    this.enemies.getChildren()[hitOn.enemyIndex].projectiles.splice(hitOn.projectileIndex, 1)
    hitOn = null
  }
  
//also remove player if health is <= 0
  if(this.player.health <= 0){
    //this.music.stop()
    this.scoreKeeper.stop()
    this.scene.start('gameOver')
  }

//check for hits on enemies from player projectiles and remove projectile on hit
//also remove enemies if health is <= 0
  for(let i = 0; i < this.enemies.length; i++){
    console.log(this.enemies[i])
    this.enemies[i].move(0, 0, height, width)
    hitOn = this.enemies[i].update(this.player.projectiles)
    if(hitOn){
      this.player.projectiles[hitOn].destroy()
      this.player.projectiles.splice(hitOn, 1)
    }

    if(this.enemies[i].health <= 0){
      this.enemies[i].sprite.destroy()
      this.enemies.splice(i, 1)
    }
  }


}

function damaged(){
  if(new Date().getTime() - this.player.lastDamagedAt  > 1500){
    this.player.health -= 50
    this.player.lastDamagedAt = new Date().getTime()
    console.log('hit!')
  }
}
