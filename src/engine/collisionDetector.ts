import { BaseObject } from "./components/objects";
import { ShapeType, CircleShape, RectShape } from "./components/shapes";

export const CollisionDetector = {
  detect,
};

function detect(objects: BaseObject[]): void {
  for (let idx = 0; idx < objects.length; idx++) {
    objects[idx].resetColliders();
  }

  for (let idx = 0; idx < objects.length; idx++) {
    for (let targetIdx = 0; targetIdx < objects.length; targetIdx++) {
      if (idx === targetIdx) break;

      const obj = objects[idx];
      const targetObj = objects[targetIdx];

      if (intersects(obj.shape, targetObj.shape)) {
        obj.addCollider({
          objectRef: targetObj,
          objectSnapshot: targetObj.serialize(),
        });
        targetObj.addCollider({
          objectRef: obj,
          objectSnapshot: obj.serialize(),
        });
      }
    }
  }
}

function intersects(s1: ShapeType, s2: ShapeType): boolean {
  if (s1.type === "circle") {
    if (s2.type === "circle") {
      return circleCircle(s1, s2);
    } else {
      return circleRect(s1, s2);
    }
  } else {
    if (s2.type === "circle") {
      return circleRect(s2, s1);
    } else {
      return rectRect(s2, s1);
    }
  }
}

function circleRect(c: CircleShape, r: RectShape): boolean {
  let x: number = c.centerPosition.x;
  let y: number = c.centerPosition.y;

  if (c.centerPosition.x < r.transform.position.x) {
    x = r.transform.position.x;
  } else if (c.centerPosition.x > r.transform.position.x + r.width) {
    x = r.transform.position.x + r.width;
  }

  if (c.centerPosition.y < r.transform.position.y) {
    y = r.transform.position.y;
  } else if (c.centerPosition.y > r.transform.position.y + r.height) {
    y = r.transform.position.y + r.height;
  }

  const distX = c.centerPosition.x - x;
  const distY = c.centerPosition.y - y;
  const distance = Math.sqrt(distX * distX + distY * distY);

  if (distance <= c.radius) {
    return true;
  }

  return false;
}

function circleCircle(c1: CircleShape, c2: CircleShape): boolean {
  const squareDist =
    Math.pow(c1.centerPosition.x - c2.centerPosition.x, 2) +
    Math.pow(c1.centerPosition.y - c2.centerPosition.y, 2);

  if (squareDist <= Math.pow(c1.radius + c2.radius, 2)) {
    return true;
  }

  return false;
}

function rectRect(r1: RectShape, r2: RectShape): boolean {
  if (
    r1.transform.position.x + r1.width >= r2.transform.position.x &&
    r1.transform.position.x <= r2.transform.position.x + r2.width &&
    r1.transform.position.y + r1.height >= r2.transform.position.y &&
    r1.transform.position.y <= r2.transform.position.y + r2.height
  ) {
    return true;
  }

  return false;
}
