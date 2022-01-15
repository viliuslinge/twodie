import { IGameRenderer } from "../../GameRenderer";

import { Transform, ITransformProperties } from "../Transform";

import { IBaseShape } from "./types";

export interface IRectShapeProperties {
  width: number;
  height: number;
  transform: ITransformProperties;
}

export class RectShape implements IBaseShape {
  readonly type: "rect";
  readonly width: number;
  readonly height: number;
  transform: Transform;

  constructor(properties: IRectShapeProperties) {
    this.type = "rect";
    this.width = properties.width;
    this.height = properties.height;
    this.transform = new Transform(properties.transform);
  }

  render = (renderer: IGameRenderer): void => {
    renderer.lineWidth = 0.5;
    renderer.strokeStyle = "orange";
    renderer.strokeRect(
      this.transform.position.x,
      this.transform.position.y,
      this.width,
      this.height
    );
  };
}
