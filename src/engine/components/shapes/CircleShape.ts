import { IGameRenderer } from "../../GameRenderer";
import { ICoord } from "../../shared";

import { Transform, ITransformProperties } from "../Transform";

import { IBaseShape, IShapeSerialized } from "./types";

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

  renderDebug = (
    renderer: IGameRenderer,
    properties: { isColliding: boolean }
  ): void => {
    renderer.beginPath();
    renderer.arc(
      this.centerPosition.x,
      this.centerPosition.y,
      this.radius,
      0,
      2 * Math.PI
    );
    renderer.lineWidth = 1;
    renderer.strokeStyle = properties.isColliding ? "#ff0000" : "#ffffff";
    renderer.stroke();

    renderer.beginPath();
    renderer.arc(
      this.transform.position.x,
      this.transform.position.y,
      3,
      0,
      2 * Math.PI
    );
    renderer.lineWidth = 1;
    renderer.strokeStyle = "#ffffff";
    renderer.stroke();

    renderer.font = "10px Arial";
    renderer.fillStyle = "#ffffff63";
    renderer.fillText(
      `${String(this.transform.position.x).slice(0, 6)}, ${String(
        this.transform.position.y
      ).slice(0, 6)}`,
      this.transform.position.x + 10,
      this.transform.position.y
    );
  };

  serialize = (): IShapeSerialized => {
    return {
      transform: { ...this.transform },
      centerPosition: { ...this.centerPosition },
    };
  };
}
