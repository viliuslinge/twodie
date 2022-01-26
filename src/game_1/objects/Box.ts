import { RectShape } from "engine/components/shapes";
import { Sprite } from "engine/components/sprites";
import { BaseObject } from "engine/components/objects";
import { Movement } from "engine/components/Movement";
import { World } from "engine/World";

import spritePNG from "../../../assets/sprites/sprite.png";

export class Box extends BaseObject<Sprite> {
  constructor(world: World) {
    super(world, {
      shape: new RectShape({
        width: 300,
        height: 500,
        transform: {
          position: { x: 600, y: 250 },
          scale: 1,
        },
      }),
      sprite: new Sprite({
        image: spritePNG,
        frameHeight: 100,
        frameWidth: 200,
        transform: {
          position: { x: 600, y: 250 },
          scale: 1,
        },
      }),
      attributes: {
        velocity: { x: -1, y: -1 },
        maxVelocity: 5,
        mass: 5,
        friction: 0.996,
        restitution: 1,
      },
    });
  }

  update = (): void => {
    Movement.useFrictionPhysics(this);

    this.colliders.forEach((it) => {
      Movement.useCollisionPhysics(this, it.objectSnapshot);
    });

    this.shape.transform.setPosition({
      x: this.shape.transform.position.x + this.attributes.velocity.x,
      y: this.shape.transform.position.y + this.attributes.velocity.y,
    });
  };
}
