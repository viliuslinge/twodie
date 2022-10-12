import type { ICoord } from "../../shared";

import type { Transform, ITransformProperties } from "../Transform";

import type { CircleShape } from "./CircleShape";
import type { RectShape } from "./RectShape";

export type ShapeType = RectShape | CircleShape;

export interface IShapeSerialized {
  transform: ITransformProperties;
  centerPosition: ICoord;
}

export interface IBaseShape {
  transform: Transform;
  centerPosition: ICoord;
  serialize(): IShapeSerialized;
}
