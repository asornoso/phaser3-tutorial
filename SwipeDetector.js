class SwipeDetector{

  constructor(distanceThreshold, errorMargin){
    this.downX = null
    this.downY = null
    this.upX = null
    this.upY = null
    this.threshold = distanceThreshold
    this.errorMargin = errorMargin


  }

  touchDown(x, y){
    this.downX = x
    this.downY = y
  }

  touchUp(x, y){
    this.upX = x
    this.upY = y

    if(this.getDistance() > this.threshold){

      //if up x is less than down x, that means swiped to the left
      if(this.upX < this.downX && Math.abs(this.upY - this.downY) < this.errorMargin){
        return 'left'
      }// if up x is greater than down x, that means swiped to the right
      else if(this.upX > this.downX && Math.abs(this.upY - this.downY) < this.errorMargin){
        return 'right'
      }// if up y is greater than down y, then that means swiped down
      else if(this.upY > this.downY && Math.abs(this.upX - this.downX) < this.errorMargin){
        return 'down'
      }// if up U is less than down y, then that means swiped up
      else if(this.upY < this.downY && Math.abs(this.upX - this.downX) < this.errorMargin){
        return 'up'
      }
      else{
        console.log('swipe is long enough, but outside error margin')
        return null
      }
    }
    else{
      console.log('swipe not long enough')
      return null
    }
  }

  getDistance(){
    let distance = Math.sqrt(Math.pow(this.upX - this.downX, 2) + Math.pow(this.upY - this.downY, 2))
    return distance
  }
}

let detector = new SwipeDetector(50, 20)

detector.touchDown(1,100)
let swipeDirection = detector.touchUp(1000,100)
console.log(swipeDirection)
