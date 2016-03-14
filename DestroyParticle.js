#pragma strict

function Start () {
  yield StartCoroutine(WaitAndDestroy());
}

public function WaitAndDestroy(){
  yield WaitForSeconds(1);
  Destroy(gameObject);
}
