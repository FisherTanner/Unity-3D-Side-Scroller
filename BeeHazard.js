#pragma strict

var player : GameObject;

function Start(){
  player = GameObject.FindWithTag("Player");
}

function FixedUpdate(){
  transform.Translate(Vector3.forward * 10 * Time.deltaTime);

  if(transform.position.x < (player.transform.position.x - 20)){
    Destroy(gameObject);
  }
}
