export function setMapColliders(k, map, colliders) {
  for (const collider of colliders) {
    if (collider.type === 'polygon') {
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
        collider.type,
      ]);
      return;
    }

    map.add([
      k.pos(collider.x, collider.y),
      k.area({
        shape: new k.Rect(k.vec2(0), collider.width, collider.height),
        collisionIgnore: ['collider'],
      }),
      k.body({ isStatic: true }),
      'collider',
      collider.type,
    ]);
  }
}
