import type { ICoord } from "../../shared";

import { Transform } from "../Transform";
import type { ITransformProperties } from "../Transform";

import type { IBaseShape, IShapeSerialized } from "./types";

export interface IRectShapeProperties {
  width: number;
  height: number;
  transform: ITransformProperties;
}

export class RectShape implements IBaseShape {
  readonly type: "rect";
  private _width: number;
  private _height: number;
  transform: Transform;

  constructor(properties: IRectShapeProperties) {
    this.type = "rect";
    this._width = properties.width;
    this._height = properties.height;
    this.transform = new Transform(properties.transform);
  }

  get width(): number {
    return this._width * this.transform.scale;
  }

  get height(): number {
    return this._height * this.transform.scale;
  }

  get centerPosition(): ICoord {
    return {
      x: this.transform.position.x + this.width / 2,
      y: this.transform.position.y + this.height / 2,
    };
  }

  serialize = (): IShapeSerialized => {
    return {
      transform: { ...this.transform },
      centerPosition: { ...this.centerPosition },
    };
  };
}
