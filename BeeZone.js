#pragma strict

public var spawnValues : Vector3;
public var bee : GameObject;
private var player : GameObject;
private var playerPos : Vector3;
private var spawnTime : float;

function Start(){
  player = GameObject.FindWithTag("Player");
}

function Update(){
  playerPos = player.transform.position;
}

function OnTriggerStay(other:Collider){
  if(other.gameObject.tag=="Player"){
    Debug.Log("Player Entered bee zone");
    if(spawnTime <= (Time.time - 2.0)){
      var spawnPosition : Vector3 = new Vector3 (playerPos.x+15, Random.Range(-1, spawnValues.y), spawnValues.z);
      var spawnRotation : Quaternion =Quaternion.Euler(0,270,0);
      Instantiate(bee, spawnPosition, spawnRotation);
      spawnTime = Time.time;
    }
  }
}

public function WaitForSpawn(){
  yield WaitForSeconds(3);
}
