#pragma strict

public var rotate : float = 50.0;
var scoreValue : int;
private var gameController : GameController;
public var particle : GameObject;
public var clip : AudioClip;

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
			//var effectScale : Vector3 = gameObject.transform.localScale/2;
			AudioSource.PlayClipAtPoint(clip, gameObject.transform.position);
			gameController.AddScore (scoreValue);
			Destroy(gameObject);
		}
	}
}
