#pragma strict

public var speed : float;
public var jumpHeight : float;
public var gravity : float;
private var targetRotation : int;
private var canDoubleJump : boolean;

var walkStateHash : int = Animator.StringToHash("Walk");
var anim : Animator;

//Disable Gravity
//GetComponent.<Rigidbody>().useGravity = false;

function Start () {
    anim = GetComponent("Animator");
}

function FixedUpdate() {
	var stateInfo : AnimatorStateInfo = anim.GetCurrentAnimatorStateInfo(0);
	transform.position.z = -9;

	//Apply New Gravity
	GetComponent.<Rigidbody>().AddForce(new Vector3(0, -gravity*GetComponent.<Rigidbody>().mass, 0));

	//Handle Horz Movement
  // if(transform.position.x <= -9.0){
  //   transform.position = new Vector2(-9.0f, transform.position.y);
  // }
  // if(transform.position.y <= -20.0){
  //   transform.position = new Vector2(transform.position.x, -8.0f);
  // }

  if(Input.GetButton('Horizontal')){
  	anim.SetBool('Idle', false);
  	if(isGrounded()){
      anim.SetBool('Jump', false);
  		if(Input.GetButton('Run')){
  			anim.SetBool('Walk', false);
  			anim.SetBool('Run', true);
  		}else{
  			anim.SetBool('Walk', true);
  			anim.SetBool('Run', false);
  		}
  	}else{
      anim.SetBool('Jump', true);
  		anim.SetBool('Walk', false);
  		anim.SetBool('Run', false);
  	}
  }else{
  	anim.SetBool('Idle', true);
  	anim.SetBool('Walk', false);
  	anim.SetBool('Run', false);
  }

  if(Input.GetButton('Run') && Input.GetButton('Horizontal')){
    GetComponent.<Rigidbody>().velocity.x = (speed*2) * Input.GetAxis("Horizontal");
  }else{
    GetComponent.<Rigidbody>().velocity.x = speed * Input.GetAxis("Horizontal");
  }

	if(GetComponent.<Rigidbody>().velocity.x < 0 && Input.GetButton('Horizontal')) {
		//if we're moving to the left
		targetRotation = 270; //set char to left
	}
	else if(GetComponent.<Rigidbody>().velocity.x > 0 && Input.GetButton('Horizontal')) {
		//if we're moving to the right
		targetRotation = 90;
	}
	transform.eulerAngles.y-=(transform.eulerAngles.y-targetRotation)/5;

	//Handle jump
	//if user hits jump key and we are on the ground
	if(Input.GetButtonDown("Jump")){
    if(isGrounded()){
    	anim.SetTrigger('Jump');
    	anim.SetBool('Walk', false);
  		anim.SetBool('Run', false);
      GetComponent.<Rigidbody>().velocity.y = 0;
      GetComponent.<Rigidbody>().velocity = new Vector2(0, jumpHeight);
      canDoubleJump = true;
    }else{
      if(canDoubleJump){
        canDoubleJump = false;
        GetComponent.<Rigidbody>().velocity.y = 0;
        GetComponent.<Rigidbody>().velocity = new Vector2(0, jumpHeight);
       }
    }
  }

}

//run a check to see if the player is on the ground
	function isGrounded() {
    canDoubleJump = true;
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

  function OnTriggerStay(other:Collider){
    if(other.attachedRigidbody){
      transform.parent = other.transform;
      Debug.Log("parent to "+other);
    }
  }

  function OnTriggerExit(other:Collider){
    if(other.attachedRigidbody){
      transform.parent = null;
    }
  }
