import { ITransformProperties } from "engine/components/Transform";
import { IAttributesProperties } from "engine/components/Attributes";
import { RectShape } from "engine/components/shapes";
import { AnimatedSprite } from "engine/components/sprites";
import { BaseObject } from "engine/components/objects";
import { World } from "engine/World";
import { outOfBoundary } from "engine/utils";

import spritePNG from "../assets/missle.png";

interface IBulletProperties {
  attributes: IAttributesProperties;
  transform: ITransformProperties;
}

const FRAME_WIDTH = 51;
const FRAME_HEIGHT = 75;
const TOTAL_FRAME_COUNT = 15;

export class Bullet extends BaseObject<AnimatedSprite<"rotate">, RectShape> {
  constructor(world: World, properties: IBulletProperties) {
    super(world, {
      attributes: properties.attributes,
      shape: new RectShape({
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        transform: {
          position: properties.transform.position,
          scale: properties.transform.scale,
        },
      }),
      sprite: new AnimatedSprite<"rotate">({
        image: spritePNG,
        animationDuration: 2,
        frameHeight: FRAME_HEIGHT,
        frameWidth: FRAME_WIDTH,
        currentAnimationID: "rotate",
        currentAnimationFrameIdx: 0,
        animations: {
          rotate: Array.from(Array(TOTAL_FRAME_COUNT - 1).keys()).map((idx) => [
            FRAME_WIDTH * (idx + 1),
            0,
          ]),
        },
        transform: properties.transform,
      }),
    });
  }

  update = (): void => {
    if (
      outOfBoundary(this, {
        position: { x: 0, y: 0 },
        width: this.world.game.renderer.screenWidth,
        height: this.world.game.renderer.screenHeight,
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
