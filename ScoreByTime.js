class ScoreByTime{

  constructor(game, score=0, pointsPerScore=1, everyNSeconds = 1){
    this.score = score
    this.pointsPerScore = pointsPerScore
    this.time = 0
    this.everyNSeconds = everyNSeconds
    this.intervalID = null
    this.game = game
    this.scoreText =  this.game.add.text(10,10, 'Score: ' + this.score,  {  fontSize: 25.0})
  }

  start(){
    this.intervalID = setInterval( ()=>{
      this.score += this.pointsPerScore
      this.scoreText.setText('Score: ' + this.score)

    }, this.everyNSeconds * 1000)
  }

  stop(){
    clearInterval(this.intervalID)
  }

}
