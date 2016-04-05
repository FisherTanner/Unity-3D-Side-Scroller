#pragma strict

public var rotate : float = 50.0;
var scoreValue : int;
private var gameController : GameController;
public var particle : GameObject;
public var clip : AudioClip;
var playerHealth : int;

function Start () {
	//coinCount = 0;
	var gameControllerObject : GameObject = GameObject.FindWithTag ("GameController");
  if (gameControllerObject != null){
    gameController = gameControllerObject.GetComponent (GameController);
  }
  if (gameController == null){
    Debug.Log ("Cannot find 'GameController' script");
  }
}

function Update () {
	var rotateDelta : float = rotate*Time.deltaTime;
	transform.Rotate(0, rotateDelta, 0);
}

function OnTriggerEnter(col:Collider) {
	if(col.tag == "Player") {
		if(gameObject.tag == "gem") {
			var effect : GameObject = Instantiate(particle, gameObject.transform.position, transform.rotation);
			effect.transform.localScale = new Vector3 (1.5,1.5,1.5);
			//var effectScale : Vector3 = gameObject.transform.localScale*2;
			AudioSource.PlayClipAtPoint(clip, gameObject.transform.position);
			gameController.AddScore (scoreValue);
			effect.AddComponent.<DestroyParticle>();
			Destroy(gameObject);
		}else if(gameObject.tag == "health"){
			playerHealth = gameController.playerHealth;
			if(playerHealth < 3 && playerHealth > 0){
				gameController.increaseHealth();
				Destroy(gameObject);
			}
		} 
	}
}
