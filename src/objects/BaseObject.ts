import { CircleObject } from "./CircleObject";
import { RectObject } from "./RectObject";

export type IObject = CircleObject | RectObject;

export abstract class BaseObject {
  abstract type: IObjectType;
  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract update(): void;
  abstract isColliding: boolean;
}

type IObjectType = "circle" | "rect";

export interface IObjectSpeed {
  x: number;
  y: number;
}

export interface IObjectPosition {
  x: number;
  y: number;
}
