import type { ITransformProperties } from "engine/components/Transform";
import type { IAttributesProperties } from "engine/components/Attributes";
import { RectShape } from "engine/components/shapes";
import { Sprite } from "engine/components/sprites";
import { BaseObject } from "engine/components/objects";
import { Movement } from "engine/components/Movement";
import type { World } from "engine/World";

import spritePNG from "../assets/ball.png";

interface IBallProperties {
  attributes: IAttributesProperties;
  transform: ITransformProperties;
}

export class Ball extends BaseObject<Sprite> {
  constructor(world: World, properties: IBallProperties) {
    super(world, {
      attributes: properties.attributes,
      shape: new RectShape({
        width: 32,
        height: 16,
        transform: {
          position: {
            x: properties.transform.position.x,
            y: properties.transform.position.y,
          },
          scale: properties.transform.scale,
        },
      }),
      sprite: new Sprite({
        image: spritePNG,
        frameHeight: 50,
        frameWidth: 50,
        transform: {
          position: {
            x: properties.transform.position.x - 9,
            y: properties.transform.position.y - 32,
          },
          scale: properties.transform.scale,
        },
      }),
    });
  }

  update = (): void => {
    Movement.boundary(
      {
        position: { x: 0, y: 0 },
        width: this.world.game.renderer.screenWidth,
        height: this.world.game.renderer.screenHeight,
      },
      this,
      this.destroy
    );

    Movement.useFrictionPhysics(this);

    this.colliders.forEach((it) => {
      Movement.useCollisionPhysics(this, it.objectSnapshot);
    });

    this.sprite.transform.setPosition({
      x: this.sprite.transform.position.x + this.attributes.velocity.x,
      y: this.sprite.transform.position.y + this.attributes.velocity.y,
    });

    this.shape.transform.setPosition({
      x: this.shape.transform.position.x + this.attributes.velocity.x,
      y: this.shape.transform.position.y + this.attributes.velocity.y,
    });
  };

  destroy = () => {
    this.world.removeObject(this.id);
  };
}
