import { IGameRenderer } from "../../GameRenderer";
import { ICoord } from "../../shared";

import { Transform, ITransformProperties } from "../Transform";

import { IBaseShape, IShapeSerialized } from "./types";

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

  renderDebug = (
    renderer: IGameRenderer,
    properties: { isColliding: boolean }
  ): void => {
    renderer.lineWidth = 1;
    renderer.strokeStyle = properties.isColliding ? "#ff0000" : "#ffffff";
    renderer.strokeRect(
      this.transform.position.x,
      this.transform.position.y,
      this.width,
      this.height
    );

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
