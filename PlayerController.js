#pragma strict

public var speed : float;
public var jumpHeight : float;
public var gravity : float;
private var targetRotation : int;
private var canDoubleJump : boolean;

//Disable Gravity
GetComponent.<Rigidbody>().useGravity = false;

function FixedUpdate() {
	transform.position.z = 0;

	//Apply New Gravity
	GetComponent.<Rigidbody>().AddForce(new Vector3(0, -gravity*GetComponent.<Rigidbody>().mass, 0));

	//Handle Horz Movement
  if(transform.position.x <= -9.0){
    transform.position = new Vector2(-9.0f, transform.position.y);
  }
  if(transform.position.y <= -8.0){
    transform.position = new Vector2(transform.position.x, -8.0f);
  }

  if(Input.GetButton('Run')){
    GetComponent.<Rigidbody>().velocity.x = (speed*2) * Input.GetAxis("Horizontal");
  }else{
    GetComponent.<Rigidbody>().velocity.x = speed * Input.GetAxis("Horizontal");
  }

	if(GetComponent.<Rigidbody>().velocity.x < 0) {
		//if we're moving to the left
		targetRotation = 180; //set char to left
	}
	else if(GetComponent.<Rigidbody>().velocity.x > 0) {
		//if we're moving to the right
		targetRotation = 0;
	}
	transform.eulerAngles.y-=(transform.eulerAngles.y-targetRotation)/5;

	//Handle jump
	//if user hits jump key and we are on the ground
	if(Input.GetButtonDown("Jump")){
    if(isGrounded()){
      GetComponent.<Rigidbody>().velocity.y = 0;
      GetComponent.<Rigidbody>().AddForce(new Vector2(0, jumpHeight));
      canDoubleJump = true;
    }else{
      if(canDoubleJump){
        canDoubleJump = false;
        GetComponent.<Rigidbody>().velocity.y = 0;
        GetComponent.<Rigidbody>().AddForce(new Vector2(0, jumpHeight));
       }
    }
  }

}

//run a check to see if the player is on the ground
	function isGrounded() {

		var front : Vector3 = transform.position;
		front.x +=0.4;

		var middle : Vector3 = transform.position;

		var back : Vector3 = transform.position;
		back.x -=0.4;

		//debug raycast
		var jumpLine : float = GetComponent.<Collider>().bounds.size.y/2 + 0.2;
		Debug.DrawRay (middle, Vector3(0, -jumpLine, 0), Color.red);
		Debug.DrawRay (front, Vector3(0, -jumpLine, 0), Color.red);
		Debug.DrawRay (back, Vector3(0, -jumpLine, 0), Color.red);

		if(
		Physics.Raycast(front, Vector3.down, jumpLine) ||
		Physics.Raycast(middle, Vector3.down, jumpLine) ||
		Physics.Raycast(back, Vector3.down, jumpLine)

		) {
			return true;

		}
		return false;
	}
