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
  if(playerHealth >= 0 && playerHealth <= 2){
    arrLife[playerHealth].SetActive(false);
  }
  if(playerHealth <= 0){
    Debug.Log(arrLife);
    for(var i=0;i<arrLife.length;i++){
      arrLife[i].SetActive(false);
    }
    player.GetComponent(PlayerDamage).playerDeath();
  }
}

// Use this function to resume the runtime after the game has been
// paused, the player has won, or the player has died
function resumeRuntime(){
  Time.timeScale = 1;
}
/////////////////////////
