import type { ICoord } from "../shared";

import type { BaseObject, IBaseObjectSerialized } from "./objects";
import type { CircleShape, RectShape } from "./shapes";

/**
 * Utilities that use different algorithms to determine and change velocity
 */
export const Movement = {
  boundary,
  block,
  moveToPoint,
  useFrictionPhysics,
  useCollisionPhysics,
};

function boundary(
  boundary: { position: ICoord; width: number; height: number },
  source: BaseObject,
  cb?: () => void
): void {
  const { x: velX, y: velY } = source.attributes.velocity;
  const velocity = {
    x: velX,
    y: velY,
  };

  if (source.shape.type === "rect") {
    if (source.shape.transform.position.x <= boundary.position.x && velX < 0) {
      velocity.x = 0;
    }

    if (
      source.shape.transform.position.x + source.shape.width >=
        boundary.position.x + boundary.width &&
      velX > 0
    ) {
      velocity.x = 0;
    }

    if (source.shape.transform.position.y <= boundary.position.y && velY < 0) {
      velocity.y = 0;
    }

    if (
      source.shape.transform.position.y + source.shape.height >=
        boundary.position.y + boundary.height &&
      velY > 0
    ) {
      velocity.y = 0;
    }
  }

  if (source.shape.type === "circle") {
    if (source.shape.transform.position.x <= boundary.position.x && velX < 0) {
      velocity.x = 0;
    }

    if (
      source.shape.transform.position.x + source.shape.radius * 2 >=
        boundary.position.x + boundary.width &&
      velX > 0
    ) {
      velocity.x = 0;
    }

    if (source.shape.transform.position.y <= boundary.position.y && velY < 0) {
      velocity.y = 0;
    }

    if (
      source.shape.transform.position.y + source.shape.radius * 2 >=
        boundary.position.y + boundary.height &&
      velY > 0
    ) {
      velocity.y = 0;
    }
  }

  if (velX !== velocity.x || velY !== velocity.y) {
    cb?.();
  }

  source.attributes.setVelocity(velocity);
}

function block(source: BaseObject, target: BaseObject): void {
  if (source.shape.type === "rect" && target.shape.type === "rect") {
    blockRectRect(source, target);
  }

  if (source.shape.type === "circle" && target.shape.type === "rect") {
    blockCircleRect(source, target);
  }
}

function blockRectRect(source: BaseObject, target: BaseObject): void {
  if (!(source.shape.type === "rect" && target.shape.type === "rect")) return;

  const s = source.shape;
  const t = target.shape;
  const { x: distX, y: distY } = calcDistance(s, t);
  const sWidth = s.width / 2;
  const sHeight = s.height / 2;
  const sWidthCof = sWidth / Math.abs(distX);
  const sHeightCof = sHeight / Math.abs(distY);
  const { x: velX, y: velY } = source.attributes.velocity;
  const velocity = {
    x: velX,
    y: velY,
  };

  if (distX === 0 && distY < 0 && distY >= -sHeight && velY > 0) {
    velocity.y = 0;
  }

  if (distX === 0 && distY > 0 && distY <= sHeight && velY < 0) {
    velocity.y = 0;
  }

  if (distY === 0 && distX < 0 && distX >= -sWidth && velX > 0) {
    velocity.x = 0;
  }

  if (distY === 0 && distX > 0 && distX <= sWidth && velX < 0) {
    velocity.x = 0;
  }

  if (distX > 0 && distY > 0) {
    if (sWidthCof < sHeightCof && velX < 0) {
      velocity.x = 0;
    }

    if (sWidthCof > sHeightCof && velY < 0) {
      velocity.y = 0;
    }
  }

  if (distX < 0 && distY > 0) {
    if (sWidthCof < sHeightCof && velX > 0) {
      velocity.x = 0;
    }

    if (sWidthCof > sHeightCof && velY < 0) {
      velocity.y = 0;
    }
  }

  if (distX < 0 && distY < 0) {
    if (sWidthCof < sHeightCof && velX > 0) {
      velocity.x = 0;
    }

    if (sWidthCof > sHeightCof && velY > 0) {
      velocity.y = 0;
    }
  }

  if (distX > 0 && distY < 0) {
    if (sWidthCof < sHeightCof && velX < 0) {
      velocity.x = 0;
    }

    if (sWidthCof > sHeightCof && velY > 0) {
      velocity.y = 0;
    }
  }

  source.attributes.setVelocity(velocity);
}

function blockCircleRect(source: BaseObject, target: BaseObject): void {
  if (!(source.shape.type === "circle" && target.shape.type === "rect")) return;

  const s = source.shape;
  const t = target.shape;
  const { x: distX, y: distY } = calcDistance(s, t);
  const { x: velX, y: velY } = source.attributes.velocity;
  const velocity = {
    x: velX,
    y: velY,
  };

  if (distX === 0 && distY < 0 && distY >= -s.radius && velY > 0) {
    velocity.y = 0;
  }

  if (distX === 0 && distY > 0 && distY <= s.radius && velY < 0) {
    velocity.y = 0;
  }

  if (distY === 0 && distX < 0 && distX >= -s.radius && velX > 0) {
    velocity.x = 0;
  }

  if (distY === 0 && distX > 0 && distX <= s.radius && velX < 0) {
    velocity.x = 0;
  }

  if (distX > 0 && distY > 0) {
    if (velX < 0) {
      velocity.x = 0;
    }

    if (velY < 0) {
      velocity.y = 0;
    }
  }

  if (distX < 0 && distY > 0) {
    if (velX > 0) {
      velocity.x = 0;
    }

    if (velY < 0) {
      velocity.y = 0;
    }
  }

  if (distX < 0 && distY < 0) {
    if (velX > 0) {
      velocity.x = 0;
    }

    if (velY > 0) {
      velocity.y = 0;
    }
  }

  if (distX > 0 && distY < 0) {
    if (velX < 0) {
      velocity.x = 0;
    }

    if (velY > 0) {
      velocity.y = 0;
    }
  }

  source.attributes.setVelocity(velocity);
}

function calcDistance(
  source: CircleShape | RectShape,
  target: RectShape
): ICoord {
  let x: number = source.centerPosition.x;
  let y: number = source.centerPosition.y;

  if (source.centerPosition.x < target.transform.position.x) {
    x = target.transform.position.x;
  } else if (
    source.centerPosition.x >
    target.transform.position.x + target.width
  ) {
    x = target.transform.position.x + target.width;
  }

  if (source.centerPosition.y < target.transform.position.y) {
    y = target.transform.position.y;
  } else if (
    source.centerPosition.y >
    target.transform.position.y + target.height
  ) {
    y = target.transform.position.y + target.height;
  }

  return {
    x: source.centerPosition.x - x,
    y: source.centerPosition.y - y,
  };
}

function moveToPoint(source: BaseObject, point: ICoord): void {
  const deltaX = point.x - source.shape.transform.position.x;
  const deltaY = point.y - source.shape.transform.position.y;
  const cof = Math.abs(deltaX) / Math.abs(deltaY);
  const velocity = {
    x: source.attributes.maxVelocity * (deltaX === 0 ? 0 : deltaX > 0 ? 1 : -1),
    y: source.attributes.maxVelocity * (deltaY === 0 ? 0 : deltaY > 0 ? 1 : -1),
  };

  if (cof > 1) {
    velocity.y *= 1 / cof;
  }

  if (cof < 1) {
    velocity.x *= cof;
  }

  source.attributes.setVelocity(velocity);
}

function useFrictionPhysics(source: BaseObject): void {
  source.attributes.setVelocity({
    x: source.attributes.velocity.x * source.attributes.friction,
    y: source.attributes.velocity.y * source.attributes.friction,
  });
}

function useCollisionPhysics(
  source: BaseObject,
  target: IBaseObjectSerialized
): void {
  const vCollision = {
    x: target.shape.centerPosition.x - source.shape.centerPosition.x,
    y: target.shape.centerPosition.y - source.shape.centerPosition.y,
  };

  const distance = Math.sqrt(
    (target.shape.centerPosition.x - source.shape.centerPosition.x) *
      (target.shape.centerPosition.x - source.shape.centerPosition.x) +
      (target.shape.centerPosition.y - source.shape.centerPosition.y) *
        (target.shape.centerPosition.y - source.shape.centerPosition.y)
  );

  const vCollisionNorm = {
    x: vCollision.x / distance,
    y: vCollision.y / distance,
  };

  const vRelativeVelocity = {
    x: source.attributes.velocity.x - target.attributes.velocity.x,
    y: source.attributes.velocity.y - target.attributes.velocity.y,
  };

  let speed =
    vRelativeVelocity.x * vCollisionNorm.x +
    vRelativeVelocity.y * vCollisionNorm.y;

  speed *= Math.min(
    source.attributes.restitution,
    source.attributes.restitution
  );

  if (speed < 0) return;

  const impulse =
    (2 * speed) / (source.attributes.mass + target.attributes.mass);

  source.attributes.setVelocity({
    x:
      source.attributes.velocity.x -
      impulse * target.attributes.mass * vCollisionNorm.x,
    y:
      source.attributes.velocity.y -
      impulse * target.attributes.mass * vCollisionNorm.y,
  });
}
