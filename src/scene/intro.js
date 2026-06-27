export function intro(k, sceneData) {
  k.setGravity(1000);
  k.setCamPos(0, 0);
  k.debug.inspect = true;

  k.add([k.pos(0, 0), k.rect(100, 100)]);
}
