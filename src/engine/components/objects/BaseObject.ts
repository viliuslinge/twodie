import { uuid } from "../../lib/uuid";
import { IGameRenderer } from "../../GameRenderer";

import { Transform, ITransformProperties } from "../Transform";
import { Attributes, IAttributesProperties } from "../Attributes";
import { SpriteType } from "../sprites";
import { ShapeType } from "../shapes";

export interface IBaseObjectProperties {
  shape: ShapeType;
  sprite: SpriteType;
  transform: ITransformProperties;
  attributes: IAttributesProperties;
}

export abstract class BaseObject {
  readonly id: string;
  readonly transform: Transform;
  readonly attributes: Attributes;
  shape: ShapeType;
  sprite: SpriteType;
  colliders: BaseObject[];

  constructor(properties: IBaseObjectProperties) {
    this.id = uuid();
    this.shape = properties.shape;
    this.sprite = properties.sprite;
    this.transform = new Transform(properties.transform);
    this.attributes = new Attributes(properties.attributes);
    this.colliders = [];
  }

  abstract update(): void;

  abstract render(renderer: IGameRenderer): void;

  setShape = (shape: ShapeType): void => {
    this.shape = shape;
  };

  setSprite = (sprite: SpriteType): void => {
    this.sprite = sprite;
  };

  setColliders = (colliders: BaseObject[]): void => {
    this.colliders = colliders;
  };

  get isColliding(): boolean {
    return !!this.colliders.length;
  }
}

// ctx.beginPath();
// ctx.moveTo(this.positionX, this.positionY);
// ctx.lineTo(
//   this.positionX + this.actor.velocityX * 25,
//   this.positionY + this.actor.velocityY * 25
// );
// ctx.strokeStyle = "black";
// ctx.stroke();
