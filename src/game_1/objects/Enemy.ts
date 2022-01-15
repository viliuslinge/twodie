import { IGameRenderer } from "engine/GameRenderer";
import { RectShape } from "engine/components/shapes";
import { Sprite } from "engine/components/sprites";
import { BaseObject } from "engine/components/objects";

import spritePNG from "../../../assets/sprites/sprite.png";

export class Enemy extends BaseObject<Sprite> {
  constructor() {
    super({
      shape: new RectShape({
        width: 32,
        height: 32,
        transform: {
          position: { x: 50, y: 50 },
          scale: 1,
        },
      }),
      sprite: new Sprite({
        image: spritePNG,
        frameHeight: 50,
        frameWidth: 50,
        transform: {
          position: { x: 50, y: 50 },
          scale: 1,
        },
      }),
      attributes: {
        velocity: { x: 0, y: 0 },
        maxVelocity: 5,
        mass: 1,
        friction: 1,
        restitution: 1,
      },
    });
  }

  update = (): void => {
    this.sprite.transform.setPosition({
      x: this.sprite.transform.position.x + this.attributes.velocity.x,
      y: this.sprite.transform.position.y + this.attributes.velocity.y,
    });

    this.shape.transform.setPosition({
      x: this.shape.transform.position.x + this.attributes.velocity.x,
      y: this.shape.transform.position.y + this.attributes.velocity.y,
    });
  };

  render(renderer: IGameRenderer): void {
    super.render(renderer);
  }
}
