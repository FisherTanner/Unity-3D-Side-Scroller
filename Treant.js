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
public var MoveSpeed : int;

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
  GetComponent.<Rigidbody>().AddForce(new Vector3(0, -10*GetComponent.<Rigidbody>().mass, 0));
  if(transform.position.y <= -10){
    Destroy(gameObject);
  }
  stateInfo = anim.GetCurrentAnimatorStateInfo(0);

  dist = (Player.transform.position - transform.position);
  //Debug.Log(dist.x);
  if(!stun){
    if(dist.x > -10 && dist.x < 10 && !aggro && hitPoints != 0){
      anim.SetBool('cast spell', true);
      StartCoroutine(WaitForAggro(1.2));
    } else if(aggro) {
      anim.SetBool('cast spell', false);
      anim.SetBool('run', true);
      var lookPos = Player.transform.position - transform.position;
      lookPos.y = 0;
      var rotation = Quaternion.LookRotation(lookPos);
      transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * 4);
      //transform.LookAt(Player.transform.position);
      transform.position = Vector2.MoveTowards(transform.position, new Vector2(Player.transform.position.x, transform.position.y), MoveSpeed * Time.deltaTime);
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
    Player.GetComponent.<PlayerDamage>().nextHitAllowed = Time.time + 1.0;
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
  var effect : GameObject = Instantiate(particle, Vector3((gameObject.transform.Find("RigHeadGizmo").position.x),(gameObject.transform.Find("RigHeadGizmo").position.y+1.5),gameObject.transform.Find("RigHeadGizmo").position.z), transform.rotation);
  effect.transform.localScale = new Vector3 (3,1,3);
  yield new WaitForSeconds(4f);
  effect.AddComponent.<DestroyParticle>();
  anim.SetBool('die', false);
  yield new WaitForSeconds(1f);
  stun = false;
  hitPoints = reqHits;
  anim.SetBool('run', true);
}
