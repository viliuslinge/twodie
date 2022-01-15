import { BaseObject, IBaseObjectSerialized } from "./components/objects";

export const Physics = {
  applyFriction,
  applyCollision,
};

function applyFriction(target: BaseObject): void {
  target.attributes.setVelocity({
    x: target.attributes.velocity.x * target.attributes.friction,
    y: target.attributes.velocity.y * target.attributes.friction,
  });
}

function applyCollision(
  target: BaseObject,
  collider: IBaseObjectSerialized
): void {
  const vCollision = {
    x:
      collider.sprite.transform.position.x - target.sprite.transform.position.x,
    y:
      collider.sprite.transform.position.y - target.sprite.transform.position.y,
  };

  const distance = Math.sqrt(
    (collider.sprite.transform.position.x -
      target.sprite.transform.position.x) *
      (collider.sprite.transform.position.x -
        target.sprite.transform.position.x) +
      (collider.sprite.transform.position.y -
        target.sprite.transform.position.y) *
        (collider.sprite.transform.position.y -
          target.sprite.transform.position.y)
  );

  const vCollisionNorm = {
    x: vCollision.x / distance,
    y: vCollision.y / distance,
  };

  const vRelativeVelocity = {
    x: target.attributes.velocity.x - collider.attributes.velocity.x,
    y: target.attributes.velocity.y - collider.attributes.velocity.y,
  };

  let speed =
    vRelativeVelocity.x * vCollisionNorm.x +
    vRelativeVelocity.y * vCollisionNorm.y;

  if (speed < 0) return;

  const impulse =
    (2 * speed) / (target.attributes.mass + collider.attributes.mass);

  target.attributes.setVelocity({
    x:
      target.attributes.velocity.x -
      impulse * collider.attributes.mass * vCollisionNorm.x,
    y:
      target.attributes.velocity.y -
      impulse * collider.attributes.mass * vCollisionNorm.y,
  });
}
