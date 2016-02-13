#pragma strict

function OnTriggerEnter(other : Collider){ // when collider enters trigger collider
                 
    if(other.tag == "Player"){ // if the other colliders tag is Player
        other.transform.parent = transform.parent; // make the parent of the Player collider the same as the parent of the trigger collider
     
    }
}
     
function OnTriggerExit(other : Collider) { // when collider exits trigger collider

    if(other.tag == "Player") {
        other.transform.parent = null; // reset the Player coliders parent to null
                 
    }
}