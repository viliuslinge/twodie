import { uuid } from "../../lib/uuid";
import { IGameRenderer } from "../../GameRenderer";

import {
  Attributes,
  IAttributesSerialized,
  IAttributesProperties,
} from "../Attributes";
import { ShapeType, IShapeSerialized } from "../shapes";
import { SpriteType } from "../sprites";

export interface IBaseObjectProperties<T extends SpriteType = SpriteType> {
  shape: ShapeType;
  sprite: T;
  attributes: IAttributesProperties;
}

export interface IBaseObjectSerialized {
  id: string;
  attributes: IAttributesSerialized;
  shape: IShapeSerialized;
}

interface ICollider {
  objectRef: BaseObject;
  /**
   * State snapshot of the object that intersects during the collision.
   * Real reference should not be stored here as its state might change during the update phase.
   */
  objectSnapshot: IBaseObjectSerialized;
}

export abstract class BaseObject<T extends SpriteType = SpriteType> {
  readonly id: string;
  readonly attributes: Attributes;
  shape: ShapeType;
  sprite: T;
  colliders: ICollider[];

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
      shape: this.shape.serialize(),
    };
  };

  addCollider = (collider: ICollider): void => {
    this.colliders.push(collider);
  };

  resetColliders = (): void => {
    this.colliders = [];
  };

  get isColliding(): boolean {
    return !!this.colliders.length;
  }
}
