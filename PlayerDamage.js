#pragma strict

var damageStateHash : int = Animator.StringToHash("Damage");
var anim : Animator;
var isColliding : boolean;
var playerScript;

//Disable Gravity
//GetComponent.<Rigidbody>().useGravity = false;

function Start () {
    anim = GetComponent("Animator");
    playerScript = GetComponent(PlayerController);
}

function Update(){
  isColliding = false;
}

function FixedUpdate() {
    var stateInfo : AnimatorStateInfo = anim.GetCurrentAnimatorStateInfo(0);
}

function OnCollisionEnter(col: Collision) {
  if(col.gameObject.tag=="Enemy"){
    if(isColliding) return;
    isColliding = true;
    Debug.Log("You ran into a "+col.gameObject.name);
    anim.SetTrigger('TakeDamage');
    var dir : Vector2 = (transform.position - col.transform.position).normalized;
    dir.y = 0.5;
    GetComponent.<Rigidbody>().AddForce((dir/2) * 600);
    GetComponent(PlayerController).enabled = false;
    StartCoroutine(WaitForStunToEnd());
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
