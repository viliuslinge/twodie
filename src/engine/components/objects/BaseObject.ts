import { uuid } from "../../lib/uuid";
import { IGameRenderer } from "../../GameRenderer";

import { Transform, ITransformProperties } from "../Transform";
import {
  Attributes,
  IAttributesSerialized,
  IAttributesProperties,
} from "../Attributes";
import { SpriteType, ISpriteSerialized } from "../sprites";
import { ShapeType } from "../shapes";

export interface IBaseObjectProperties<T extends SpriteType = SpriteType> {
  shape: ShapeType;
  sprite: T;
  attributes: IAttributesProperties;
}

export interface IBaseObjectSerialized {
  id: string;
  attributes: IAttributesSerialized;
  sprite: ISpriteSerialized;
}

export abstract class BaseObject<T extends SpriteType = SpriteType> {
  readonly id: string;
  readonly attributes: Attributes;
  shape: ShapeType;
  sprite: T;
  /**
   * Snapshots of objects that intersect during the collision.
   * Real references should not be stored here as their state might change during the update phase.
   */
  colliders: IBaseObjectSerialized[];

  constructor(properties: IBaseObjectProperties<T>) {
    this.id = uuid();
    this.shape = properties.shape;
    this.sprite = properties.sprite;
    this.attributes = new Attributes(properties.attributes);
    this.colliders = [];
  }

  abstract update(): void;

  render(renderer: IGameRenderer): void {
    this.sprite.render(renderer);
  }

  renderDebug(renderer: IGameRenderer): void {
    renderer.beginPath();
    renderer.moveTo(
      this.sprite.transform.position.x,
      this.sprite.transform.position.y
    );
    renderer.lineTo(
      this.sprite.transform.position.x + this.attributes.velocity.x * 10,
      this.sprite.transform.position.y + this.attributes.velocity.y * 10
    );
    renderer.strokeStyle = "black";
    renderer.stroke();
  }

  serialize = (): IBaseObjectSerialized => {
    return {
      id: this.id,
      attributes: this.attributes.serialize(),
      sprite: this.sprite.serialize(),
    };
  };

  setColliders = (colliders: IBaseObjectSerialized[]): void => {
    this.colliders = colliders;
  };

  get isColliding(): boolean {
    return !!this.colliders.length;
  }
}
