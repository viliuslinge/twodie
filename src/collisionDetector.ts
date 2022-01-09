import { IObject, CircleObject, RectObject } from "./objects";

export function detectCollisions(objects: IObject[]): void {
  for (let idx = 0; idx < objects.length; idx++) {
    objects[idx].isColliding = false;
  }

  for (let idx = 0; idx < objects.length; idx++) {
    for (let targetIdx = idx + 1; targetIdx < objects.length; targetIdx++) {
      if (idx === targetIdx) break;

      if (checkIntersection(objects[idx], objects[targetIdx])) {
        objects[idx].isColliding = true;
        objects[targetIdx].isColliding = true;
      }
    }
  }
}

function checkIntersection(o1: IObject, o2: IObject): boolean {
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

function circleRect(c: CircleObject, r: RectObject): boolean {
  let testX: number = c.position.x;
  let testY: number = c.position.y;

  if (c.position.x < r.position.x) {
    testX = r.position.x;
  } else if (c.position.x > r.position.x + r.width) {
    testX = r.position.x + r.width;
  }

  if (c.position.y < r.position.y) {
    testY = r.position.y;
  } else if (c.position.y > r.position.y + r.height) {
    testY = r.position.y + r.height;
  }

  const distX = c.position.x - testX;
  const distY = c.position.y - testY;
  const distance = Math.sqrt(distX * distX + distY * distY);

  if (distance <= c.radius) {
    return true;
  }
  return false;
}

function circleCircle(c1: CircleObject, c2: CircleObject): boolean {
  const squareDist =
    Math.pow(c1.position.x - c2.position.x, 2) +
    Math.pow(c1.position.y - c2.position.y, 2);

  if (squareDist <= Math.pow(c1.radius + c2.radius, 2)) {
    return true;
  }

  return false;
}

function rectRect(r1: RectObject, r2: RectObject): boolean {
  if (
    r1.position.x + r1.width >= r2.position.x &&
    r1.position.x <= r2.position.x + r2.width &&
    r1.position.y + r1.height >= r2.position.y &&
    r1.position.y <= r2.position.y + r2.height
  ) {
    return true;
  }

  return false;
}
