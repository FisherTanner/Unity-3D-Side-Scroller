#pragma strict

var damageStateHash : int = Animator.StringToHash("Damage");
var deathStateHash : int = Animator.StringToHash("Die");
var anim : Animator;
var isColliding : boolean;
var playerScript;
var rb : Rigidbody;
var stateInfo : AnimatorStateInfo;
var died : boolean = false;
var gameController : GameController;
var playerHealth : int;

private var deathGUI : GameObject;
private var controlAudio : GameObject;


//Disable Gravity
//GetComponent.<Rigidbody>().useGravity = false;

function Start () {
  controlAudio = GameObject.Find("GameController");
  // Death Screen //
  deathGUI = GameObject.Find("DeathMenu"); // Find the game object named DeathMenu
  deathGUI.SetActive(false); // Turn the death screen off when the game starts
  //////////////////
  var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
  gameController = gameControllerObject.GetComponent(GameController);
  anim = GetComponent("Animator");
  playerScript = GetComponent(PlayerController);
  rb = GetComponent.<Rigidbody>();
}

function Update(){
  isColliding = false;
}

function FixedUpdate() {
    stateInfo = anim.GetCurrentAnimatorStateInfo(0);
}

function OnCollisionEnter(col: Collision) {
  if(col.gameObject.tag=="Enemy"){
    if(isColliding) return;
    Debug.Log(playerHealth);
    gameController.decreaseHealth();
    playerHealth = gameController.playerHealth;
    isColliding = true;
    //Debug.Log("You ran into a "+col.gameObject.name);
    if(playerHealth > 0){
      anim.SetTrigger('TakeDamage');
      var dir : Vector3 = (transform.position - col.transform.position).normalized;
      dir.y = 2;
      //GetComponent.<Rigidbody>().AddForce(dir * 100);
      rb.velocity = (dir*2);
      GetComponent(PlayerController).enabled = false;
      StartCoroutine(WaitForStunToEnd());
    }
  } else if(col.gameObject.tag=="Death") {
    playerDeath();
  }
}

function OnCollisionExit(col: Collision) {
  if(col.gameObject.tag=="Enemy"){
    isColliding = false;
    //GetComponent(PlayerController).enabled = true;
  }
}

function playerDeath(){
  GetComponent(PlayerController).enabled = false;
  anim.SetTrigger('Die');
  GetComponent(PlayerDamage).enabled = false;

  // Death Screen //
  yield WaitForSeconds(1.5f); // Wait for death animation to end
  Time.timeScale = 0; // Stop the game time
  deathGUI.SetActive(true); // Show the death screen once the player has died
  //////////////////
  controlAudio.GetComponent.<AudioSource>().volume = 0.4; // lower the volume 
}

function WaitForStunToEnd() {
  // Wait 0.2 seconds
  if(playerHealth > 0){
    yield WaitForSeconds(0.4f);
    GetComponent(PlayerController).enabled = true;
  }
 }

 // function PlayerDie(){
 //   anim.SetBool('Idle', false);
 //   anim.SetBool('Death', true);
 //   GetComponent(PlayerDamage).enabled = false;
 // }
