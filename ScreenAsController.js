class ScreenAsController{

  constructor(width, height, game){
    this.game = game
    this.width = width
    this.height = height

    this.zones = []
    this.zoneSize = {
      x: 0.7,
      y: 0.7
    }

    this.createZones()
  }

  createZones(){
    this.createUpZone()
    this.createDownZone()
    this.createLeftZone()
    this.createRightZone()
  }

  createUpZone(){
    this.zones.push({
      zone: 'up',
      topLeft:{
        x: this.width * (1 - this.zoneSize.x),
        y: 0
      },
      bottomRight:{
        x: this.width * this.zoneSize.x,
        y:  this.height * (1 - this.zoneSize.y)
      }
    })
  }

  createDownZone(){
    this.zones.push({
      zone: 'down',
      topLeft:{
        x: this.width * (1 - this.zoneSize.x),
        y: this.height * this.zoneSize.y
      },
      bottomRight:{
        x: this.width * this.zoneSize.x,
        y: this.height,
      }
    })
  }

  createLeftZone(){
    this.zones.push({
      zone: 'left',
      topLeft:{
        x: 0,
        y: this.height * (1- this.zoneSize.y)
      },
      bottomRight:{
        x: this.width * (1 - this.zoneSize.x),
        y: this.height * this.zoneSize.y,
      }
    })
  }
  createRightZone(){
    this.zones.push({
      zone: 'right',
      topLeft:{
        x: this.width * this.zoneSize.x,
        y: this.height * (1- this.zoneSize.y)
      },
      bottomRight:{
        x: this.width,
        y: this.height * this.zoneSize.y,
      }
    })
  }


  checkLocation(){
    if(this.game.input.pointer1.isDown ){

      let x = this.game.input.pointer1.x
      let y = this.game.input.pointer1.y

      for(let i = 0; i < this.zones.length; i++){
        if(x > this.zones[i].topLeft.x && x < this.zones[i].bottomRight.x){
          if(y > this.zones[i].topLeft.y && y < this.zones[i].bottomRight.y){
            return this.zones[i].zone
          }
        }
      }
      return 'none'
    }

    return 'none'

  }






}
