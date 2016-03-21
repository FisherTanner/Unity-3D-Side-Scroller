#pragma strict

var SpawnPoint: Transform; // Create an empty gameObject and drag it onto here, it will move to the most recent checkpoint within the Checkpoint script

var player : GameObject; // Drag the Player gameObject onto here 

function OnTriggerEnter(col : Collider) {
	if(col.tag == "Player") {
		// If the player collides with the gamObject with this script on it then delay 1.5 seconds then run the respawn function
		Invoke("respawn", 1.5);
	}

}

function respawn() {
	// Move the Player to the position of the most recent SpawnPoint
	player.transform.position = SpawnPoint.position;
}