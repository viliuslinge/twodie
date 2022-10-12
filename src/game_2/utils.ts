import type { BaseObject } from "engine/components/objects";
import type { ICoord } from "engine/shared";

export function getCoord(
  screenSize: { width: number; height: number },
  hero: BaseObject,
  ball: BaseObject,
  prevBall?: BaseObject
): ICoord | undefined {
  if (!prevBall) {
    return {
      x: 0,
      y: 0,
    };
  }

  if (!(prevBall.shape.type === "rect" && ball.shape.type === "rect")) {
    throw new Error("Current and prev object shapes have to be rectangulars");
  }

  if (hero.shape.type !== "circle") {
    throw new Error("Hero shape has to be circular");
  }

  const gap = 2;
  const ballWidth = ball.shape.width + gap;
  const ballHeight = ball.shape.height + gap;
  const prevBallWidth = prevBall.shape.width + gap;
  const prevBallHeight = prevBall.shape.height + gap;
  const prevBallPosX = prevBall.shape.transform.position.x;
  const prevBallPosY = prevBall.shape.transform.position.y;

  let nextX = prevBallPosX + prevBallWidth;
  let nextY = prevBallPosY;

  if (nextX + ballWidth > screenSize.width) {
    nextY = prevBallPosY + prevBallHeight;
    const setOffset = (nextY / ballHeight) % 2 !== 0;
    nextX = setOffset ? ballWidth / 2 : 0;
  }

  if (nextY + ballHeight > screenSize.height) {
    return;
  }

  return {
    x: nextX,
    y: nextY,
  };
}
