#pragma strict

// Place this script on the Menu Controller Object
// Drag appropriate Buttons on to their matching variables
// use the onClick on the buttons by dragging the Menu Controller Object onto the field to acces the functions within this script

import UnityEngine.SceneManagement; // Make use of the SceneManager

// Level Buttons //////////////////////////////
public var level1 : UnityEngine.UI.Button;
public var level2 : UnityEngine.UI.Button;
public var level3 : UnityEngine.UI.Button;

public function startLevel1 () {
		SceneManager.LoadScene("The Feared Forest");

}

public function startLevel2 () {
		SceneManager.LoadScene("The Lost Limbo");

}

public function startLevel3 () {
		SceneManager.LoadScene("The Jungle Jaws");

}

public function exitGame () {
	Application.Quit();
}