#pragma strict

var SpawnPoint : Transform; // Drag the SpawnPoint empty gameObject onto here

function OnTriggerEnter(col : Collider)
{
	if(col.tag =="Player") {
		// If the Player collides with a gameObject with this script on it set the spawnPoint position to checkpoints position
		SpawnPoint.position = Vector3(transform.position.x, transform.position.y, transform.position.z);
	}
}