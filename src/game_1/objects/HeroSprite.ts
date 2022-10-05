import { AnimatedSprite } from "engine/components/sprites";
import { ITransformProperties } from "engine/components/Transform";

import spritePNG from "../../../../assets/sprites/sprite.png";

type IAnimations =
  | "idle-up"
  | "idle-down"
  | "idle-left"
  | "idle-right"
  | "walk-up"
  | "walk-down"
  | "walk-left"
  | "walk-right";

interface IHeroSpriteProperties {
  transform: ITransformProperties;
}

export class HeroSprite extends AnimatedSprite<IAnimations> {
  constructor(properties: IHeroSpriteProperties) {
    super({
      image: spritePNG,
      animationDuration: 16,
      frameHeight: 32,
      frameWidth: 32,
      currentAnimationID: "idle-down",
      currentAnimationFrameIdx: 0,
      animations: {
        "idle-down": [[32, 0]],
        "idle-left": [[32, 32]],
        "idle-right": [[32, 64]],
        "idle-up": [[32, 96]],
        "walk-down": [
          [0, 0],
          [64, 0],
        ],
        "walk-left": [
          [0, 32],
          [64, 32],
        ],
        "walk-right": [
          [0, 64],
          [64, 64],
        ],
        "walk-up": [
          [0, 96],
          [64, 96],
        ],
      },
      transform: properties.transform,
    });
  }
}
