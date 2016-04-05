#pragma strict

private var winGUI : GameObject; // win screen
private var gameController : GameObject;

function Start () {
  // Win Screen //
  winGUI = GameObject.Find("WinMenu"); // Find the game object named WinMenu
  winGUI.SetActive(false); // Turn the win screen off when the game starts
  //////////////////
  gameController = GameObject.Find("GameController");
}

function OnTriggerEnter(col:Collider) {
	// Win Screen //
	// yield WaitForSeconds(1.5f); // Wait for win animation to end
	Time.timeScale = 0; // Stop the game time
	winGUI.SetActive(true); // Show the win screen once the player has won
	//////////////////
	gameController.GetComponent.<AudioSource>().volume = 0.4; // lower the volume 
}