class Enemy{

  constructor(name, health, xspeed, yspeed, width, height){
    this.name = name
    this.health = health
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.height = height
    this.width = width
    this.sprite = null
    this.projectiles = []
  }

  createSprite(game, x, y, key){
    if(!this.hasGravity)
      this.sprite = game.add.sprite(x, y, key)
    else{
      this.sprite = game.physics.add.sprite(x, y, key)
      this.sprite.setBounce(0.2);
    }
    this.sprite.setDisplaySize(this.width, this.height)
    this.sprite.width = this.width
    this.sprite.height = this.height
    this.sprite.setOrigin(0,0)
  }


  move(top, left, bottom, right){


      if(this.sprite.y <= top || this.sprite.y + this.height  >= bottom){
        this.yspeed = this.yspeed * -1
      }

      if(this.sprite.x <= left || this.sprite.x + this.width >= right){
        this.xspeed = this.xspeed * -1
      }

      this.sprite.x += this.xspeed
      this.sprite.y += this.yspeed
  }

  update(playerProjectiles){
    if(playerProjectiles){
      for(let i = 0; i < playerProjectiles.length; i++){
        if(this.sprite.x > playerProjectiles[i].x - this.width){
          if( this.sprite.x < playerProjectiles[i].x + playerProjectiles[i].width){
            if(this.sprite.y > playerProjectiles[i].y - this.height && this.sprite.y < playerProjectiles[i].y + playerProjectiles[i].height){
              console.log('d')
              this.health -= 10
              return i
            }
          }
        }
      }

    }
  }

}
