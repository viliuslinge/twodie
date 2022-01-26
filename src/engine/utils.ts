import { BaseObject } from "./components/objects";
import { ICoord } from "./shared";

export function outOfBoundary(
  source: BaseObject,
  boundary: { position: ICoord; width: number; height: number }
): boolean {
  const { shape } = source;

  if (shape.type === "rect") {
    if (
      shape.transform.position.x + shape.width <= boundary.position.x ||
      shape.transform.position.x >= boundary.position.x + boundary.width ||
      shape.transform.position.y + shape.height <= boundary.position.y ||
      shape.transform.position.y >= boundary.position.y + boundary.height
    ) {
      return true;
    }
  }

  if (shape.type === "circle") {
    if (
      shape.transform.position.x + shape.radius * 2 <= boundary.position.x ||
      shape.transform.position.x >= boundary.position.x + boundary.width ||
      shape.transform.position.y + shape.radius * 2 <= boundary.position.y ||
      shape.transform.position.y >= boundary.position.y + boundary.height
    ) {
      return true;
    }
  }

  return false;
}
