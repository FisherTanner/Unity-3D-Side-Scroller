#pragma strict

var damageStateHash : int = Animator.StringToHash("Damage");
var deathStateHash : int = Animator.StringToHash("Die");
var anim : Animator;
var isColliding : boolean;
var playerScript;
var rb : Rigidbody;
var stateInfo : AnimatorStateInfo;
var died : boolean = false;

//Disable Gravity
//GetComponent.<Rigidbody>().useGravity = false;

function Start () {
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
    isColliding = true;
    Debug.Log("You ran into a "+col.gameObject.name);
    anim.SetTrigger('TakeDamage');
    var dir : Vector3 = (transform.position - col.transform.position).normalized;
    dir.y = 2;
    //GetComponent.<Rigidbody>().AddForce(dir * 100);
    rb.velocity = (dir*2);
    GetComponent(PlayerController).enabled = false;
    StartCoroutine(WaitForStunToEnd());
  } else if(col.gameObject.tag=="Death") {
    GetComponent(PlayerController).enabled = false;
    anim.SetTrigger('Die');
    GetComponent(PlayerDamage).enabled = false;
  }
}

function OnCollisionExit(col: Collision) {
  if(col.gameObject.tag=="Enemy"){
    isColliding = false;
    //GetComponent(PlayerController).enabled = true;
  }
}

function WaitForStunToEnd() {
     // Wait 0.2 seconds
     yield WaitForSeconds(0.4f);
     GetComponent(PlayerController).enabled = true;
 }

 // function PlayerDie(){
 //   anim.SetBool('Idle', false);
 //   anim.SetBool('Death', true);
 //   GetComponent(PlayerDamage).enabled = false;
 // }
