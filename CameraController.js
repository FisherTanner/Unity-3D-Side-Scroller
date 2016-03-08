#pragma strict

private var target : GameObject;
public var players: GameObject[];

function Start () {
	target = GameObject.Find('Adventurer Alice-Blue');
}

function Update () {
    // X axis
   if(target.transform.position.x < 0.0f) {
  	transform.position = new Vector3(0.0f, transform.position.y, target.transform.position.z -12);
   }else if(target.transform.position.y < -3){
     transform.position.x = transform.position.x;
   }else{
     transform.position.x = target.transform.position.x;
   }

   // Y axis
   if (target.transform.position.y < 0.0f) {
       transform.position = new Vector3(transform.position.x, transform.position.y, target.transform.position.z-12);
   } else {
     transform.position.y = target.transform.position.y+2.44;
   }

	// if(target.transform.position.x < 0) {
	// 	transform.position.x = 0.0f;
	// 	transform.position.y = target.transform.position.y;
	// }else if(target.transform.position.y < 0){
  //   transform.position.y = 1.0f;
  //   transform.position.x = target.transform.position.x;
  // } else if(target.transform.position.y < -5){
  //   transform.position.x = 1.0f;
  // } else {
  //   transform.position.x = target.transform.position.x;
  //   transform.position.y = target.transform.position.y;
  // }
}
