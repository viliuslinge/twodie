import type { ICoord } from "../../shared";

import { Transform } from "../Transform";
import type { ITransformProperties } from "../Transform";

import type { IBaseShape, IShapeSerialized } from "./types";

export interface ICircleShapeProperties {
  radius: number;
  transform: ITransformProperties;
}

export class CircleShape implements IBaseShape {
  readonly type: "circle";
  private _radius: number;
  transform: Transform;

  constructor(properties: ICircleShapeProperties) {
    this.type = "circle";
    this._radius = properties.radius;
    this.transform = new Transform(properties.transform);
  }

  get radius(): number {
    return this._radius * this.transform.scale;
  }

  get centerPosition(): ICoord {
    return {
      x: this.transform.position.x + this.radius,
      y: this.transform.position.y + this.radius,
    };
  }

  serialize = (): IShapeSerialized => {
    return {
      transform: { ...this.transform },
      centerPosition: { ...this.centerPosition },
    };
  };
}
