#pragma strict

var scoreText : UI.Text;
private var score : int;
private var player : GameObject;
public var playerHealth : int;
var arrLife : GameObject[];

function Start () {
  arrLife = GameObject.FindGameObjectsWithTag('healthIcon');
  arrLife.Sort(arrLife, function(g1,g2) String.Compare(g1.name, g2.name));
  playerHealth = 3;
  scoreText = GameObject.FindWithTag("score").GetComponent(UI.Text);
  player = GameObject.FindWithTag('Player');
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

function increaseHealth(){
  arrLife[playerHealth].SetActive(true);
  playerHealth++;
  Debug.Log(playerHealth);
}

function decreaseHealth(){
  playerHealth--;
  arrLife[playerHealth].SetActive(false);
  Debug.Log(arrLife[playerHealth]);
  if(playerHealth == 0){
    player.GetComponent(PlayerDamage).playerDeath();
  }
}

// Use this function to resume the runtime after the game has been
// paused, the player has won, or the player has died
function resumeRuntime(){
  Time.timeScale = 1;
}
/////////////////////////
