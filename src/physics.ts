import { BaseActor } from "./actors";

export function applyFrictionPhysics(o: BaseActor, friction: number): void {
  o.setVelocity(o.velocityX * friction, o.velocityY * friction);
}

export function applyCollisionPhysics(o1: BaseActor, o2: BaseActor): void {
  const vCollision = {
    x: o2.positionX - o1.positionX,
    y: o2.positionY - o1.positionY,
  };

  const distance = Math.sqrt(
    (o2.positionX - o1.positionX) * (o2.positionX - o1.positionX) +
      (o2.positionY - o1.positionY) * (o2.positionY - o1.positionY)
  );

  const vCollisionNorm = {
    x: vCollision.x / distance,
    y: vCollision.y / distance,
  };

  const vRelativeVelocity = {
    x: o1.velocityX - o2.velocityX,
    y: o1.velocityY - o2.velocityY,
  };

  let speed =
    vRelativeVelocity.x * vCollisionNorm.x +
    vRelativeVelocity.y * vCollisionNorm.y;

  if (speed < 0) return;

  const impulse = (2 * speed) / (o1.mass + o2.mass);

  o1.setVelocity(
    o1.velocityX - impulse * o2.mass * vCollisionNorm.x,
    o1.velocityY - impulse * o2.mass * vCollisionNorm.y
  );

  o2.setVelocity(
    o2.velocityX + impulse * o1.mass * vCollisionNorm.x,
    o2.velocityY + impulse * o1.mass * vCollisionNorm.y
  );
}
