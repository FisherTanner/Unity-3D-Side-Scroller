#pragma strict

public var center : Transform;
public var degreesPerSecond : float;
private var v : Vector2;

function Start() {
  v = transform.position - center.position;
}

function Update() {
  v = Quaternion.AngleAxis (degreesPerSecond * Time.deltaTime, Vector3.forward) * v;
  transform.position.x = center.position.x + (v.x*6);
  transform.position.y = center.position.y + (v.y*6);
}
