import type { ITransformProperties } from "engine/components/Transform";
import type { IAttributesProperties } from "engine/components/Attributes";
import { CircleShape } from "engine/components/shapes";
import { BaseObject } from "engine/components/objects";
import { Movement } from "engine/components/Movement";
import type { World } from "engine/World";
import type { IKeyboardHandler } from "engine/KeyboardHandler";

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
        radius: 80,
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
          position: {
            x:
              properties.transform.position.x + 30 * properties.transform.scale,
            y:
              properties.transform.position.y + 30 * properties.transform.scale,
          },
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

  moveW = (): void => {
    this.sprite.setCurrentAnimationID("run-w");
    this.attributes.setVelocity({
      x: -this.attributes.maxVelocity,
      y: this.attributes.velocity.y,
    });
  };

  moveE = (): void => {
    this.sprite.setCurrentAnimationID("run-e");
    this.attributes.setVelocity({
      x: this.attributes.maxVelocity,
      y: this.attributes.velocity.y,
    });
  };

  moveN = (): void => {
    this.sprite.setCurrentAnimationID("run-n");
    this.attributes.setVelocity({
      x: this.attributes.velocity.x,
      y: -this.attributes.maxVelocity,
    });
  };

  moveS = (): void => {
    this.sprite.setCurrentAnimationID("run-s");
    this.attributes.setVelocity({
      x: this.attributes.velocity.x,
      y: this.attributes.maxVelocity,
    });
  };

  moveNW = (): void => {
    this.sprite.setCurrentAnimationID("run-nw");
    this.attributes.setVelocity({
      x: -this.attributes.maxVelocity,
      y: -this.attributes.maxVelocity,
    });
  };

  moveNE = (): void => {
    this.sprite.setCurrentAnimationID("run-ne");
    this.attributes.setVelocity({
      x: this.attributes.maxVelocity,
      y: -this.attributes.maxVelocity,
    });
  };

  moveSW = (): void => {
    this.sprite.setCurrentAnimationID("run-sw");
    this.attributes.setVelocity({
      x: -this.attributes.maxVelocity,
      y: this.attributes.maxVelocity,
    });
  };

  moveSE = (): void => {
    this.sprite.setCurrentAnimationID("run-se");
    this.attributes.setVelocity({
      x: this.attributes.maxVelocity,
      y: this.attributes.maxVelocity,
    });
  };

  stopW = (): void => {
    if (this.attributes.velocity.x <= 0) {
      this.sprite.setCurrentAnimationID("idle-w");
      this.stop();
    }
  };

  stopE = (): void => {
    if (this.attributes.velocity.x >= 0) {
      this.sprite.setCurrentAnimationID("idle-e");
      this.stop();
    }
  };

  stopN = (): void => {
    if (this.attributes.velocity.y <= 0) {
      this.sprite.setCurrentAnimationID("idle-n");
      this.stop();
    }
  };

  stopS = (): void => {
    if (this.attributes.velocity.y >= 0) {
      this.sprite.setCurrentAnimationID("idle-s");
      this.stop();
    }
  };

  stopNW = (): void => {
    this.sprite.setCurrentAnimationID("idle-nw");
    this.stop();
  };

  stopNE = (): void => {
    this.sprite.setCurrentAnimationID("idle-ne");
    this.stop();
  };

  stopSW = (): void => {
    this.sprite.setCurrentAnimationID("idle-sw");
    this.stop();
  };

  stopSE = (): void => {
    this.sprite.setCurrentAnimationID("idle-se");
    this.stop();
  };

  stop = (): void => {
    this.attributes.setVelocity({
      x: 0,
      y: 0,
    });
  };
}
