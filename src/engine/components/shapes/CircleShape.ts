import { IGameRenderer } from "../../GameRenderer";

import { Transform, ITransformProperties } from "../Transform";

import { IBaseShape } from "./types";

export interface ICircleShapeProperties {
  radius: number;
  transform: ITransformProperties;
}

export class CircleShape implements IBaseShape {
  readonly type: "circle";
  readonly radius: number;
  transform: Transform;

  constructor(properties: ICircleShapeProperties) {
    this.type = "circle";
    this.radius = properties.radius;
    this.transform = new Transform(properties.transform);
  }

  render = (renderer: IGameRenderer): void => {
    renderer.beginPath();
    renderer.arc(
      this.transform.position.x,
      this.transform.position.y,
      this.radius,
      0,
      2 * Math.PI
    );
    renderer.lineWidth = 0.5;
    renderer.strokeStyle = "orange";
    renderer.stroke();
  };
}
