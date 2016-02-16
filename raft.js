#pragma strict

private var distance : int = 20;
public var direction;
var endPoint : Vector3;

function Start () {
  var startPoint = transform.position;
  while (true) {
    yield MoveObject(transform, startPoint, endPoint, 3.0);
    yield MoveObject(transform, endPoint, startPoint, 3.0);
  }
}

function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) {
     var i = 0.0;
     var rate = 0.5/time;
     while (i < 1.0) {
         i += Time.deltaTime * rate;
         thisTransform.position = Vector3.Lerp(startPos, endPos, i);
         yield;
     }
 }
