import { ITransformProperties } from "engine/components/Transform";
import { IAttributesProperties } from "engine/components/Attributes";
import { CircleShape } from "engine/components/shapes";
import { BaseObject } from "engine/components/objects";
import { Movement } from "engine/components/Movement";
import { World } from "engine/World";
import { IKeyboardHandler } from "engine/KeyboardHandler";

import { HeroSprite } from "./HeroSprite";
import { HeroKeyboardHandler } from "./HeroKeyboardHandler";

interface IHeroProperties {
  attributes: IAttributesProperties;
  transform: ITransformProperties;
}

export class Hero extends BaseObject<HeroSprite, CircleShape> {
  private keyboardHandler: IKeyboardHandler;

  constructor(world: World, properties: IHeroProperties) {
    super(world, {
      attributes: properties.attributes,
      shape: new CircleShape({
        radius: 16,
        transform: {
          position: {
            x: properties.transform.position.x,
            y: properties.transform.position.y,
          },
          scale: properties.transform.scale,
        },
      }),
      sprite: new HeroSprite({
        transform: {
          position: properties.transform.position,
          scale: properties.transform.scale,
        },
      }),
    });

    this.keyboardHandler = new HeroKeyboardHandler(this);
    this.keyboardHandler.enable();
  }

  update = (): void => {
    Movement.boundary(
      {
        position: { x: 0, y: 0 },
        width: this.world.game.renderer.screenWidth,
        height: this.world.game.renderer.screenHeight,
      },
      this
    );

    this.sprite.transform.setPosition({
      x: this.sprite.transform.position.x + this.attributes.velocity.x,
      y: this.sprite.transform.position.y + this.attributes.velocity.y,
    });

    this.shape.transform.setPosition({
      x: this.shape.transform.position.x + this.attributes.velocity.x,
      y: this.shape.transform.position.y + this.attributes.velocity.y,
    });
  };

  moveLeft = (): void => {
    this.sprite.setCurrentAnimationID("walk-left");
    this.attributes.setVelocity({
      x: -this.attributes.maxVelocity,
      y: this.attributes.velocity.y,
    });
  };

  moveRight = (): void => {
    this.sprite.setCurrentAnimationID("walk-right");
    this.attributes.setVelocity({
      x: this.attributes.maxVelocity,
      y: this.attributes.velocity.y,
    });
  };

  moveUp = (): void => {
    this.sprite.setCurrentAnimationID("walk-up");
    this.attributes.setVelocity({
      x: this.attributes.velocity.x,
      y: -this.attributes.maxVelocity,
    });
  };

  moveDown = (): void => {
    this.sprite.setCurrentAnimationID("walk-down");
    this.attributes.setVelocity({
      x: this.attributes.velocity.x,
      y: this.attributes.maxVelocity,
    });
  };

  stopLeft = (): void => {
    if (this.attributes.velocity.x <= 0) {
      this.sprite.setCurrentAnimationID("idle-left");
      this.stop();
    }
  };

  stopRight = (): void => {
    if (this.attributes.velocity.x >= 0) {
      this.sprite.setCurrentAnimationID("idle-right");
      this.stop();
    }
  };

  stopUp = (): void => {
    if (this.attributes.velocity.y <= 0) {
      this.sprite.setCurrentAnimationID("idle-up");
      this.stop();
    }
  };

  stopDown = (): void => {
    if (this.attributes.velocity.y >= 0) {
      this.sprite.setCurrentAnimationID("idle-down");
      this.stop();
    }
  };

  stop = (): void => {
    this.attributes.setVelocity({
      x: 0,
      y: 0,
    });
  };
}
