#pragma strict

public var speed : float;
public var jumpHeight : float;
public var gravity : float;
private var targetRotation : int;
private var canDoubleJump : boolean;

var walkStateHash : int = Animator.StringToHash("Walk");
var jumpStateHash : int = Animator.StringToHash("Jump");
var anim : Animator;
var distToGround: float;

//Disable Gravity
//GetComponent.<Rigidbody>().useGravity = false;

function Start () {
    anim = GetComponent("Animator");
    distToGround = GetComponent.<Collider>().bounds.extents.y;
}

function FixedUpdate() {
	var stateInfo : AnimatorStateInfo = anim.GetCurrentAnimatorStateInfo(0);

	//Apply New Gravity
	GetComponent.<Rigidbody>().AddForce(new Vector3(0, -gravity*GetComponent.<Rigidbody>().mass, 0));

	//Handle Horz Movement
  // if(transform.position.x <= -9.0){
  //   transform.position = new Vector2(-9.0f, transform.position.y);
  // }
  // if(transform.position.y <= -20.0){
  //   transform.position = new Vector2(transform.position.x, -8.0f);
  // }

  if(closeToGround()){
    if(isGrounded()){
      canDoubleJump = true;
      GetComponent.<CapsuleCollider>().height = 1.73;
      GetComponent.<CapsuleCollider>().center = new Vector3(0,0.81,0);
    }else{
      GetComponent.<CapsuleCollider>().height = 1.3;
      GetComponent.<CapsuleCollider>().center = new Vector3(0,1.3,0);
    }
  }

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
  	anim.SetBool('Walk', false);
  	anim.SetBool('Run', false);
    if(isGrounded()){
      anim.SetBool('Idle', true);
      anim.SetBool('Jump', false);
    }else{
      anim.SetBool('Idle', false);
      anim.SetBool('Jump', true);
    }
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
    if(isGrounded() && stateInfo.nameHash != jumpStateHash){
    	anim.SetTrigger('Jump');
    	anim.SetBool('Walk', false);
  		anim.SetBool('Run', false);
      anim.SetBool('Idle', false);
      canDoubleJump = true;
      GetComponent.<Rigidbody>().velocity.y = 0;
      GetComponent.<Rigidbody>().velocity = new Vector2(0, jumpHeight);
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
function isGrounded(): boolean {
 return Physics.Raycast(transform.position, -Vector3.up, distToGround + 0.9);
}

function closeToGround(): boolean {
 return Physics.Raycast(transform.position, -Vector3.up, distToGround + 1);
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
