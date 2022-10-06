import { AnimatedSprite } from "engine/components/sprites";
import { ITransformProperties } from "engine/components/Transform";

import spritePNG from "../../assets/hero.png";

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

const FRAME_SIDE = 32;

export class HeroSprite extends AnimatedSprite<IAnimations> {
  constructor(properties: IHeroSpriteProperties) {
    super({
      image: spritePNG,
      animationDuration: 16,
      frameHeight: FRAME_SIDE,
      frameWidth: FRAME_SIDE,
      currentAnimationID: "idle-down",
      currentAnimationFrameIdx: 0,
      animations: {
        "idle-down": [[FRAME_SIDE, 0]],
        "idle-left": [[FRAME_SIDE, FRAME_SIDE]],
        "idle-right": [[FRAME_SIDE, FRAME_SIDE * 2]],
        "idle-up": [[FRAME_SIDE, FRAME_SIDE * 3]],
        "walk-down": [
          [0, 0],
          [FRAME_SIDE * 2, 0],
        ],
        "walk-left": [
          [0, FRAME_SIDE],
          [FRAME_SIDE * 2, FRAME_SIDE],
        ],
        "walk-right": [
          [0, FRAME_SIDE * 2],
          [FRAME_SIDE * 2, FRAME_SIDE * 2],
        ],
        "walk-up": [
          [0, FRAME_SIDE * 3],
          [FRAME_SIDE * 2, FRAME_SIDE * 3],
        ],
      },
      transform: properties.transform,
    });
  }
}
