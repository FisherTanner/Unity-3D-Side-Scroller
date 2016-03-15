#pragma strict

var lives3 : Sprite; // Player has full health
var lives2 : Sprite; // Player has 2 lives left
var lives1 : Sprite; // Player has 1 life left
var lives0 : Sprite; // Player has 0 lives left

private var currentLives : UnityEngine.UI.Image;

static var LIVES = 3; // A global variable to hold the value of lives that the player possesses
     
function Start () {
	currentLives = gameObject.GetComponent.<UnityEngine.UI.Image>(); // Set the Image component of the gameObject to be currentLives
	Debug.Log("Lives left = " +LIVES); // How many lives are left
}

function Update () {
	if (LIVES == 3) { // If the Player has 3 lives
		currentLives.sprite = lives3; // Set the Image sprite to show 3 active hearts
	}
	else if (LIVES == 2) {
		currentLives.sprite = lives2;
	}
	else if (LIVES == 1) {
		currentLives.sprite = lives1;
	}
	else {
		currentLives.sprite = lives0;
	}
}