import { IGameRenderer } from "../../GameRenderer";

import { Transform, ITransformProperties } from "../Transform";

export interface ISpriteProperties {
  image: string;
  frameWidth: number;
  frameHeight: number;
  transform: ITransformProperties;
}

export class Sprite {
  readonly image: HTMLImageElement;
  readonly frameWidth: number;
  readonly frameHeight: number;
  transform: Transform;

  constructor(properties: ISpriteProperties) {
    this.image = new Image();
    this.image.src = properties.image;
    this.frameWidth = properties.frameWidth;
    this.frameHeight = properties.frameHeight;
    this.transform = new Transform(properties.transform);
  }

  render = (renderer: IGameRenderer): void => {
    renderer.drawImage(
      this.image,
      0,
      0,
      this.frameWidth,
      this.frameHeight,
      this.transform.position.x,
      this.transform.position.y,
      this.frameWidth * this.transform.scale,
      this.frameHeight * this.transform.scale
    );
  };
}
