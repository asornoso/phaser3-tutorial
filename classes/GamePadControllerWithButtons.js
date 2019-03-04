class GamePadControllerWithButtons{

  constructor(size, padding, width, height, game){
    this.game = game
    this.size = size
    this.padding = padding + (this.size/2)
    this.width = width
    this.height = height
    this.portion = 6
    this.zones = []

    this.displayPad()
    this.displayActionButton()
    this.createZones()
  }

  displayPad(){
    this.game.pad = this.game.add.sprite(this.width - this.padding, this.height - this.padding, 'pad')
    this.game.pad.setDisplaySize(this.size, this.size)

  }

  displayActionButton(){
    this.game.actionButton = this.game.add.sprite(this.padding, this.height - this.padding, 'actionButton')
    this.game.actionButton.setDisplaySize(this.size/2, this.size/2)

  }



  createZones(){
    this.createUpZone()
    this.createDownZone()
    this.createLeftZone()
    this.createRightZone()

    this.createButtonZone()
  }

  createButtonZone(){
    this.zones.push({
      zone:'button',
      topLeft:{
        x: this.game.actionButton.x - (this.size / 4),
        y: this.game.actionButton.y - (this.size / 4)
      },
      bottomRight:{
        x: this.game.actionButton.x + (this.size / 4),
        y: this.game.actionButton.y + (this.size / 4)
      }
    })
  }



  createUpZone(){
    this.zones.push({
      zone: 'up',
      topLeft:{
        x: this.game.pad.x - (this.size / this.portion),
        y: this.game.pad.y - (this.size / 2)
      },
      bottomRight:{
        x: this.game.pad.x + (this.size / this.portion),
        y: this.game.pad.y - 5
      }
    })
  }

  createDownZone(){
    this.zones.push({
      zone: 'down',
      topLeft:{
        x: this.game.pad.x - (this.size / this.portion),
        y: this.game.pad.y + 5
      },
      bottomRight:{
        x: this.game.pad.x + (this.size / this.portion),
        y: this.game.pad.y + (this.size / 2),
      }
    })
  }

  createLeftZone(){
    this.zones.push({
      zone: 'left',
      topLeft:{
        x: this.game.pad.x - (this.size / 2),
        y: this.game.pad.y - (this.size / this.portion)
      },
      bottomRight:{
        x: this.game.pad.x - 5,
        y: this.game.pad.y + (this.size / this.portion)
      }
    })
  }

  createRightZone(){
    this.zones.push({
      zone: 'right',
      topLeft:{
        x: this.game.pad.x + 5,
        y:  this.game.pad.y - (this.size / this.portion)
      },
      bottomRight:{
        x:  this.game.pad.x + (this.size / 2),
        y: this.game.pad.y + (this.size / this.portion)
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
