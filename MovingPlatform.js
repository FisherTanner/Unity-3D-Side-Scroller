#pragma strict

private var p0: Vector3; // a vector to define the movement relative to the platform

public var vertical : boolean; // switch for vertical movement
public var horizontal : boolean; // switch for horizontal movement
public var amplitude: float = 5; // platform excursion (+/- 5 units, in this case)
public var speed: float = 0.2; // movements per second
private var direction : Vector3; // direction relative to the platform

function Start(){

    // Set the Direction of the moving platform ///////////////////////////////////////

    if(vertical) {
        direction = Vector3.up;
    } else if (horizontal) {
        direction = Vector3.right;
    }

    // 

    p0 = transform.position;

    while (true){
     // convert direction to local space
     var dir = transform.TransformDirection(direction);
     // set platform position:
     transform.position = p0+amplitude*dir*Mathf.Sin(6.28*speed*Time.time);
     yield; // let Unity free for the rest of the frame until the next one begins
    }
}          