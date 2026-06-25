export function setBackgroundColor(k, hexColorCode) {
  k.add([
    k.rect(k.width(), k.height()),
    k.color(k.Color.fromHex(hexColorCode)),
    k.fixed(),
  ]);
}

export function setMapColliders(k, map, colliders) {
  for (const collider of colliders) {
    switch (collider.type) {
      case 'polygon': {
        const cordinates = collider.polygon.map((cordinate) =>
          k.vec2(cordinate.x, cordinate.y),
        );

        map.add([
          k.pos(collider.x, collider.y),
          k.area({
            shape: new k.Polygon(cordinates),
            collisionIgnore: ['collider'],
          }),
          k.body({ isStatic: true }),
          'collider',
          collider.name,
        ]);
        break;
      }
      case 'rect': {
        map.add([
          k.pos(collider.x, collider.y),
          k.area({
            shape: new k.Rect(k.vec2(0), collider.width, collider.height),
            collisionIgnore: ['collider'],
          }),
          k.body({ isStatic: true }),
          'collider',
          collider.name,
        ]);
      }
    }
  }
}

export function setCameraControls(k, map, player) {
  k.onUpdate(() => {
    const target = player.worldPos();
    const targetX = k.clamp(target.x, map.pos.x + 50, map.width - 50);
    const targetY = k.clamp(target.y, map.pos.y + 100, map.height - 100);

    k.setCamPos(
      k.lerp(k.getCamPos().x, targetX, 0.1),
      k.lerp(k.getCamPos().y, targetY, 0.1),
    );
  });
}
