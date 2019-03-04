class ScoreByEvent{

  constructor(game, score=0){
    this.score = score
    this.game = game
    this.scoreText =  this.game.add.text(10,10, 'Score: ' + this.score,  {  fontSize: 25.0})
  }

  addPoints(points){
    this.score += points
    this.scoreText.setText('Score: ' + this.score)
  }

  subtractPoints(points){
    this.score += points
    this.scoreText.setText('Score: ' + this.score)
  }



}
