import { IGameRenderer } from "../../GameRenderer";

import { Transform } from "../Transform";

import { CircleShape } from "./CircleShape";
import { RectShape } from "./RectShape";

export type ShapeType = RectShape | CircleShape;

export interface IBaseShape {
  transform: Transform;
  render(renderer: IGameRenderer): void;
}
