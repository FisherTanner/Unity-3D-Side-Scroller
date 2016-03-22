#pragma strict

var Player : GameObject;
var anim : Animator;
var dist : Vector3;
var aggro : boolean = false;
var stateInfo : AnimatorStateInfo;
var roarStateHash : int = Animator.StringToHash("Base Layer.castspell");
var stun : boolean;
var pRb : Rigidbody;
public var hitPoints : int;
private var reqHits : int;

public var particle : GameObject;
public var clip : AudioClip;

function Start() {
  Player = GameObject.Find('Adventurer Alice-Blue');
  anim = GetComponent("Animator");
  pRb = GameObject.FindWithTag('Player').GetComponent.<Rigidbody>();
  reqHits = hitPoints;
  stun = false;
}

function FixedUpdate(){
  stateInfo = anim.GetCurrentAnimatorStateInfo(0);

  dist = (Player.transform.position - transform.position);
  //Debug.Log(dist.x);
  if(!stun){
    if(dist.x > -10 && dist.x < 10 && !aggro && hitPoints != 0){
      anim.SetBool('cast spell', true);
      StartCoroutine(WaitForAggro(1.2));
    } else if(aggro) {
      anim.SetBool('walk', true);
    } else {
      anim.SetBool('cast spell', false);
    }
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

function OnTriggerEnter(col:Collider){
  if(col.tag == 'Player'){
    pRb.velocity = new Vector3(0,10,0);
    hitPoints--;
    if(hitPoints > 0){
      anim.SetTrigger('damage');
      yield WaitForSeconds(0.3f);
      Aggroed();
      anim.SetBool('run', true);
    } else {
      anim.SetBool('cast spell', false);
      anim.SetBool('walk', false);
      anim.SetBool('run', false);
      anim.SetBool('die', true);
      stun = true;
      StartCoroutine(StunTimer());
    }
  }
}

public function StunTimer(){
  yield new WaitForSeconds(1.5f);
  var effect : GameObject = Instantiate(particle, Vector3((gameObject.transform.position.x+2),(gameObject.transform.position.y+1.5),gameObject.transform.position.z), transform.rotation);
  effect.transform.localScale = new Vector3 (3,1,3);
  yield new WaitForSeconds(4f);
  effect.AddComponent.<DestroyParticle>();
  stun = false;
  hitPoints = reqHits;
  anim.SetBool('die', false);
  anim.SetBool('run', true);
}
