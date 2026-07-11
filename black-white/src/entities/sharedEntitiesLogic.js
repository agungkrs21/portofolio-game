export async function makeBlink(k, obj, interval = 0.2, duration = 0.8) {
  const l = k.loop(interval, () => {
    obj.opacity = obj.opacity === 1 ? 0 : 1;
  });

  k.wait(duration, () => {
    l.cancel();
    obj.opacity = 1;
    obj.invincible = false;
  });
}
