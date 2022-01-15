import { IGameRenderer } from "../../GameRenderer";

import { Transform, ITransformProperties } from "../Transform";

import { IBaseShape } from "./types";

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

  renderDebug = (
    renderer: IGameRenderer,
    properties: { isColliding: boolean }
  ): void => {
    renderer.beginPath();
    renderer.arc(
      this.transform.position.x,
      this.transform.position.y,
      this.radius * this.transform.scale,
      0,
      2 * Math.PI
    );
    renderer.lineWidth = 1;
    renderer.strokeStyle = properties.isColliding ? "#ff0000" : "#00ff43";
    renderer.stroke();
  };
}
