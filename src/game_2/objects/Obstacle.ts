import { ITransformProperties } from "engine/components/Transform";
import { IAttributesProperties } from "engine/components/Attributes";
import { CircleShape } from "engine/components/shapes";
import { Sprite } from "engine/components/sprites";
import { BaseObject } from "engine/components/objects";
import { Movement } from "engine/components/Movement";
import { World } from "engine/World";

import spritePNG from "../../../assets/sprites/circle.png";

interface IObstacleProperties {
  attributes: IAttributesProperties;
  transform: ITransformProperties;
}

export class Obstacle extends BaseObject<Sprite> {
  constructor(world: World, properties: IObstacleProperties) {
    super(world, {
      attributes: properties.attributes,
      shape: new CircleShape({
        radius: 15,
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
        frameHeight: 30,
        frameWidth: 30,
        transform: {
          position: properties.transform.position,
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
      x: this.shape.transform.position.x + this.attributes.velocity.x,
      y: this.shape.transform.position.y + this.attributes.velocity.y,
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
