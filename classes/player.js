class Player{

  constructor(name, health, speed, width, height, allowOffScreen, hasGravity){
    this.name = name
    this.health = health
    this.speed = speed
    this.height = height
    this.width = width
    this.sprite = null
    this.allowOffScreen = allowOffScreen
    this.hasGravity = hasGravity

    this.lastDamagedAt = new Date().getTime()
    this.state = 'idle'
    this.idle = ['idle1', 'idle2', 'idle3', 'idle2']
    this.walk = ['walk1', 'walk2', 'walk3', 'walk4', 'walk5', 'walk6','walk7', 'walk8']
    this.frame = 0
    this.facing = 'right'

    this.projectiles = []
    this.lastFired =  new Date().getTime()
  }

  createSprite(game, x, y, key){
    if(!this.hasGravity){
      this.sprite = game.add.sprite(x, y, key)
      this.sprite.body.setAllowGravity(false)
    }
    else{
      this.sprite = game.physics.add.sprite(x, y, key)
      this.sprite.setBounce(0.2);
      this.sprite.setCollideWorldBounds(true);
    }
    this.sprite.setDisplaySize(this.width, this.height)
    this.sprite.width = this.width
    this.sprite.height = this.height
    this.sprite.setOrigin(0,0)
  }


  move(direction){
      switch(direction){
        case 'up':
          this.sprite.y -= this.speed
          break;
        case 'down':
          this.sprite.y += this.speed
          break;
        case 'left':
          this.sprite.x -= this.speed
          this.state = 'walk-left'
          this.facing = 'left'
          break;
        case 'right':
          this.sprite.x += this.speed
          this.state = 'walk-right'
          this.facing = 'right'
          break;
        default:
          this.state = 'idle'
          this.frame = 0
          break;
    }
  }

  update(enemyList){

    if(this.health > 0){
      this.animate()
      console.log(this.health)
    }
    else{
      console.log('u dead')
    }

    //check if hit by a laser

    //move your lasers
    this.updateProjectiles()
    if(enemyList !== null)
    {
      for(let a = 0; a < enemyList.length; a++){
        if(enemyList[a] !== null){
          for(let i = 0; i < enemyList[a].length; i++){
            if(this.sprite.x > enemyList[a][i].x + enemyList[a][i].width && this.sprite.x < enemyList[a][i].x - this.width){
              if(this.sprite.y > enemyList[a][i].y - enemyList[a][i].height && this.sprite.y < enemyList[a][i].y + enemyList[a][i].height)
              {
                this.health -= 10
                return {enemyIndex: a, projectileIndex: i}
              }
            }
          }
        }
      }
      return null
    }

  }

  animate(){
    let idleRate = 40
    let rate = 3

    if(this.state == 'idle' && this.frame % idleRate == 0){
      if(this.frame >= this.idle.length * idleRate)
        this.frame = 0
      this.sprite.setTexture(this.idle[this.frame / idleRate])
    }
    else if(this.state == 'walk-left' && this.frame % rate == 0){
      if(this.frame >= this.walk.length * rate)
        this.frame = 0
      this.sprite.setTexture(this.walk[this.frame / rate])
      this.sprite.flipX = true
    }else if(this.state == 'walk-right' && this.frame % rate == 0){
      if(this.frame >= this.walk.length * rate)
        this.frame = 0
      this.sprite.setTexture(this.walk[this.frame / rate])
      this.sprite.flipX = false
    }

    this.frame++
  }

  shoot(game, key, damage = 10, speed = 5){
    if(new Date().getTime() - this.lastFired  < 300)
      return

    this.lastFired = new Date().getTime()
    let w = 20
    let h = 55
    let x
    let y
    if(this.facing == 'right'){
      x = this.sprite.x + this.width
      y = this.sprite.y + this.height * 0.30
    }
    else{
      x = this.sprite.x
      y = this.sprite.y + this.height * 0.30
      speed *= -1
    }
    let projectile = game.physics.add.sprite(x, y,  key)
    projectile.body.setAllowGravity(false)
    projectile.speed = speed
    projectile.setDisplaySize(h, w)
    projectile.width = w
    projectile.height = h

    this.projectiles.push(projectile)
  }

  updateProjectiles(){
    for(let i = 0 ; i< this.projectiles.length; i++){
      this.projectiles[i].x += this.projectiles[i].speed

      if(this.projectiles[i].x > 4200){
        this.projectiles[i].destroy()
        this.projectiles.splice(i, 1)
      }
    }
  }

}
