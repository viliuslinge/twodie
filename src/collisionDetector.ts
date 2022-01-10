import { Actor } from "./actors";
import { CircleShape, RectShape, Shape } from "./shapes";

export function detectCollisions(objects: Actor[]): void {
  for (let idx = 0; idx < objects.length; idx++) {
    const { shape } = objects[idx];
    if (!shape) break;

    shape.resetColliders();
  }

  for (let idx = 0; idx < objects.length; idx++) {
    for (let targetIdx = idx + 1; targetIdx < objects.length; targetIdx++) {
      if (idx === targetIdx) break;

      const { shape: shape1 } = objects[idx];
      const { shape: shape2 } = objects[targetIdx];

      if (shape1 && shape2) {
        if (intersects(shape1, shape2)) {
          shape1.addCollider(shape2);
          shape2.addCollider(shape1);
        }
      }
    }
  }
}

function intersects(o1: Shape, o2: Shape): boolean {
  if (o1.type === "circle") {
    if (o2.type === "circle") {
      return circleCircle(o1, o2);
    } else {
      return circleRect(o1, o2);
    }
  } else {
    if (o2.type === "circle") {
      return circleRect(o2, o1);
    } else {
      return rectRect(o1, o2);
    }
  }
}

function circleRect(c: CircleShape, r: RectShape): boolean {
  let x: number = c.positionX;
  let y: number = c.positionY;

  if (c.positionX < r.positionX) {
    x = r.positionX;
  } else if (c.positionX > r.positionX + r.width) {
    x = r.positionX + r.width;
  }

  if (c.positionY < r.positionY) {
    y = r.positionY;
  } else if (c.positionY > r.positionY + r.height) {
    y = r.positionY + r.height;
  }

  const distX = c.positionX - x;
  const distY = c.positionY - y;
  const distance = Math.sqrt(distX * distX + distY * distY);

  if (distance <= c.radius) {
    return true;
  }

  return false;
}

function circleCircle(c1: CircleShape, c2: CircleShape): boolean {
  const squareDist =
    Math.pow(c1.positionX - c2.positionX, 2) +
    Math.pow(c1.positionY - c2.positionY, 2);

  if (squareDist <= Math.pow(c1.radius + c2.radius, 2)) {
    return true;
  }

  return false;
}

function rectRect(r1: RectShape, r2: RectShape): boolean {
  if (
    r1.positionX + r1.width >= r2.positionX &&
    r1.positionX <= r2.positionX + r2.width &&
    r1.positionY + r1.height >= r2.positionY &&
    r1.positionY <= r2.positionY + r2.height
  ) {
    return true;
  }

  return false;
}
