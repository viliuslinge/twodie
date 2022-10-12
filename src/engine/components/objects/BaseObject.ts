import { uuid } from "../../lib/uuid";
import type { GameRenderer } from "../../GameRenderer";
import type { World } from "../../World";

import { Attributes } from "../Attributes";
import type {
  IAttributesSerialized,
  IAttributesProperties,
} from "../Attributes";
import type { ShapeType, IShapeSerialized } from "../shapes";
import type { SpriteType } from "../sprites";

export interface IBaseObjectProperties<
  T extends SpriteType = SpriteType,
  D extends ShapeType = ShapeType
> {
  sprite: T;
  shape: D;
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

export abstract class BaseObject<
  T extends SpriteType = SpriteType,
  D extends ShapeType = ShapeType
> {
  readonly id: string;
  readonly attributes: Attributes;
  sprite: T;
  shape: D;
  colliders: ICollider[];
  world: World;

  constructor(world: World, properties: IBaseObjectProperties<T, D>) {
    this.world = world;
    this.id = uuid();
    this.shape = properties.shape;
    this.sprite = properties.sprite;
    this.attributes = new Attributes(properties.attributes);
    this.colliders = [];
  }

  abstract update(): void;

  render(renderer: GameRenderer): void {
    this.sprite.render(renderer);
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
