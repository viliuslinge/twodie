import { ICoord } from "../../shared";

import { Transform, ITransformProperties } from "../Transform";

import { CircleShape } from "./CircleShape";
import { RectShape } from "./RectShape";

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
