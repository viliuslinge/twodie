interface IPosition {
  x: number;
  y: number;
}

export interface ITransformProperties {
  position: IPosition;
  scale: number;
}

export class Transform {
  position: IPosition;
  scale: number;

  constructor(properties: ITransformProperties) {
    this.position = properties.position;
    this.scale = properties.scale;
  }

  setPosition = (position: IPosition): void => {
    this.position = {
      x: position.x,
      y: position.y,
    };
  };

  setScale = (scale: number): void => {
    this.scale = scale;
  };
}
