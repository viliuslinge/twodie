import { ITransformProperties } from "engine/components/Transform";
import { IAttributesProperties } from "engine/components/Attributes";
import { RectShape } from "engine/components/shapes";
import { Sprite } from "engine/components/sprites";
import { BaseObject } from "engine/components/objects";
import { World } from "engine/World";
import { outOfBoundary } from "engine/utils";

import spritePNG from "../../../assets/sprites/sprite.png";

interface IBulletProperties {
  attributes: IAttributesProperties;
  transform: ITransformProperties;
}

export class Bullet extends BaseObject<Sprite, RectShape> {
  constructor(world: World, properties: IBulletProperties) {
    super(world, {
      attributes: properties.attributes,
      shape: new RectShape({
        width: 32,
        height: 32,
        transform: {
          position: properties.transform.position,
          scale: properties.transform.scale,
        },
      }),
      sprite: new Sprite({
        image: spritePNG,
        frameHeight: 32,
        frameWidth: 32,
        transform: {
          position: properties.transform.position,
          scale: properties.transform.scale,
        },
      }),
    });
  }

  update = (): void => {
    if (
      outOfBoundary(this, {
        position: { x: 0, y: 0 },
        width: this.world.game.properties.width,
        height: this.world.game.properties.height,
      })
    ) {
      this.world.removeObject(this.id);
    }

    this.sprite.transform.setPosition({
      x: this.sprite.transform.position.x + this.attributes.velocity.x,
      y: this.sprite.transform.position.y + this.attributes.velocity.y,
    });

    this.shape.transform.setPosition({
      x: this.shape.transform.position.x + this.attributes.velocity.x,
      y: this.shape.transform.position.y + this.attributes.velocity.y,
    });
  };
}
