#pragma strict

var Player : GameObject;
var anim : Animator;
var dist : Vector3;

function Start() {
  Player = GameObject.Find('Adventurer Alice-Blue');
  anim = GetComponent("Animator");
}

function Update(){
  //dist = (Player.transform.position - transform.position);
}

function OnTriggerEnter(col:Collider){
  if(col.tag == 'Player'){
    var dist : Vector3 = (col.transform.position - transform.position);
    Debug.Log("player entered attack zone");
    if(dist.y >= 1.3){
      anim.SetBool('Spell Cast', true);
      anim.SetBool('Bite', false);
    } else {
      anim.SetBool('Bite', true);
      anim.SetBool('Spell Cast', false);
    }
  }
}

function OnTriggerExit(col:Collider){
  if(col.tag == 'Player'){
    anim.SetBool('Bite', false);
    anim.SetBool('Spell Cast', false);
    anim.SetBool('Idle', false);
  }
}
