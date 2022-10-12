import type { ICoord } from "../shared";

export interface ITransformProperties {
  position: ICoord;
  scale: number;
}

export class Transform {
  position: ICoord;
  scale: number;

  constructor(properties: ITransformProperties) {
    this.position = properties.position;
    this.scale = properties.scale;
  }

  setPosition = (position: ICoord): void => {
    this.position = {
      x: position.x,
      y: position.y,
    };
  };

  setScale = (scale: number): void => {
    this.scale = scale;
  };
}
