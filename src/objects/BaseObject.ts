import { CircleObject } from "./CircleObject";
import { RectangularObject } from "./RectangularObject";

export type IObject = CircleObject | RectangularObject;

export abstract class BaseObject {
  abstract type: IObjectType;
  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract update(): void;
  abstract isColliding: boolean;
}

type IObjectType = "circle" | "rectangular";

export interface IObjectSpeed {
  x: number;
  y: number;
}

export interface IObjectPosition {
  x: number;
  y: number;
}
