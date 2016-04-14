#pragma strict

private var target : GameObject;

function Start () {
    target = GameObject.FindWithTag("Player");
}

function Update () {
    transform.position.z = -15f;
    // X axis
   if(target.transform.position.x < -6.0f) {
       transform.position = new Vector3(-6.0f, transform.position.y, -15f);
   }else if(target.transform.position.y < -3){
     transform.position.x = transform.position.x;
   }else{
     transform.position.x = target.transform.position.x;
   }

   // Y axis
   if (target.transform.position.y < 0.0f) {
       transform.position = new Vector3(transform.position.x, transform.position.y, -15f);
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
