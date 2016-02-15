#pragma strict

public var rotate : float = 50.0;
var scoreValue : int;
private var gameController : GameController;

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
			//Debug.Log(coinCount);
			gameController.AddScore (scoreValue);
			Destroy(gameObject);
		}
	}
}
