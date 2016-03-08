#pragma strict

var Player : GameObject;
var anim : Animator;
var dist : Vector3;
var aggro : boolean = false;
var stateInfo : AnimatorStateInfo;
var roarStateHash : int = Animator.StringToHash("Base Layer.castspell");

function Start() {
  Player = GameObject.Find('Adventurer Alice-Blue');
  anim = GetComponent("Animator");
}

function FixedUpdate(){
  stateInfo = anim.GetCurrentAnimatorStateInfo(0);

  dist = (Player.transform.position - transform.position);
  Debug.Log(dist.x);
  if(dist.x > -10 && dist.x < 10 && !aggro){
    anim.SetBool('cast spell', true);
    StartCoroutine(WaitForAggro(1.2));
  } else if(aggro) {
    anim.SetBool('walk', true);
  } else {
    anim.SetBool('cast spell', false);
  }

}

function Aggroed(){
  if(dist.x > -10 && dist.x < 10){
    aggro = true;
  }
}

function WaitForAggro(time : float){
  yield WaitForSeconds(time);
  Aggroed();
}
