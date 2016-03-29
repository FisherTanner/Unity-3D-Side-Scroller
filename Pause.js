#pragma strict

private var pauseGame : boolean = false; // pause menu toggle boolean switch
private var showGUI : boolean = false; // pause menu toggle boolean switch
private var pauseGUI : GameObject;
private var gameController : GameObject;

function Start() {
	pauseGUI = GameObject.Find("PauseMenu"); // set pauseGUI to be the pause menu container
	pauseGUI.SetActive(false); // initially set the pausemenu to be hidden when the game starts
	gameController = GameObject.Find("GameController");
}

function Update() {

	if(Input.GetKeyDown("p")) { // if the user presses p on the keyboard

		pauseGame = !pauseGame; // set switch boolean to be not what it was before

		if(pauseGame == true) {
			pause();
		} else if(pauseGame == false) {
			unPause();
		}
	}
}

function pause() {
	Time.timeScale = 0; // stop the time in the game
	pauseGame = true; // set pause menu on
	showGUI = true; // see pauseToggle()
	gameController.GetComponent.<AudioSource>().volume = 0.4; // lower the volume
	pauseToggle();
}

function unPause() {
	Time.timeScale = 1;
	pauseGame = false;
	showGUI = false;
	gameController.GetComponent.<AudioSource>().volume = 1.0; // raise the volume back to normal
	pauseToggle();
}

function pauseToggle() {
	if(showGUI == true) {
		pauseGUI.SetActive(true); // if the user presses 'p' set the pauseMenu game object to be active
	} else {
		pauseGUI.SetActive(false); // if the user presses 'p' again set the pauseMenu game object to be not active
	}
}