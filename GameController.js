#pragma strict

var scoreText : UI.Text;
private var score : int;

function Start () {
  scoreText = GameObject.FindWithTag("score").GetComponent(UI.Text);
  score = 0;
  UpdateScore();
}

function AddScore (newScoreValue : int) {
  score += newScoreValue;
  UpdateScore ();
}

function UpdateScore () {
  scoreText.text = "Score: " + score;
}
