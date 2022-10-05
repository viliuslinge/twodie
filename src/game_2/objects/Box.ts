import { CircleShape } from "engine/components/shapes";
import { Sprite } from "engine/components/sprites";
import { BaseObject } from "engine/components/objects";
import { Movement } from "engine/components/Movement";
import { World } from "engine/World";

import spritePNG from "../../../assets/sprites/sprite.png";

export class Box extends BaseObject<Sprite> {
  constructor(world: World) {
    super(world, {
      shape: new CircleShape({
        radius: 16,
        transform: {
          position: { x: 600, y: 250 },
          scale: 1,
        },
      }),
      sprite: new Sprite({
        image: spritePNG,
        frameHeight: 32,
        frameWidth: 32,
        transform: {
          position: { x: 600, y: 250 },
          scale: 1,
        },
      }),
      attributes: {
        velocity: { x: 0, y: 0 },
        maxVelocity: 5,
        mass: 5,
        friction: 0.996,
        restitution: 1,
      },
    });
  }

  update = (): void => {
    Movement.boundary(this, {
      position: { x: 0, y: 0 },
      width: this.world.game.properties.width,
      height: this.world.game.properties.height,
    });

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
}
