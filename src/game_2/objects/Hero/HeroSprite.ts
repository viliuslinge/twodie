import { AnimatedSprite } from "engine/components/sprites";
import type { ITransformProperties } from "engine/components/Transform";

import spritePNG from "../../assets/hero.png";

type IAnimations =
  | "idle-n"
  | "idle-s"
  | "idle-w"
  | "idle-e"
  | "idle-nw"
  | "idle-ne"
  | "idle-sw"
  | "idle-se"
  | "run-n"
  | "run-s"
  | "run-w"
  | "run-e"
  | "run-nw"
  | "run-ne"
  | "run-sw"
  | "run-se";

interface IHeroSpriteProperties {
  transform: ITransformProperties;
}

const FRAME = 100;

export class HeroSprite extends AnimatedSprite<IAnimations> {
  constructor(properties: IHeroSpriteProperties) {
    super({
      image: spritePNG,
      animationDuration: 4,
      frameHeight: FRAME,
      frameWidth: FRAME,
      currentAnimationID: "idle-s",
      currentAnimationFrameIdx: 0,
      animations: {
        "idle-s": [[FRAME * 4, FRAME]],
        "idle-w": [[FRAME * 4, FRAME * 6]],
        "idle-e": [[FRAME * 4, FRAME * 3]],
        "idle-n": [[FRAME * 4, 0]],
        "idle-nw": [[FRAME * 4, FRAME * 7]],
        "idle-ne": [[FRAME * 4, FRAME * 4]],
        "idle-sw": [[FRAME * 4, FRAME * 5]],
        "idle-se": [[FRAME * 4, FRAME * 2]],
        "run-s": [
          [0, FRAME],
          [FRAME, FRAME],
          [FRAME * 2, FRAME],
          [FRAME * 3, FRAME],
        ],
        "run-w": [
          [0, FRAME * 6],
          [FRAME, FRAME * 6],
          [FRAME * 2, FRAME * 6],
          [FRAME * 3, FRAME * 6],
        ],
        "run-e": [
          [0, FRAME * 3],
          [FRAME, FRAME * 3],
          [FRAME * 2, FRAME * 3],
          [FRAME * 3, FRAME * 3],
        ],
        "run-n": [
          [0, 0],
          [FRAME, 0],
          [FRAME * 2, 0],
          [FRAME * 3, 0],
        ],
        "run-nw": [
          [0, FRAME * 7],
          [FRAME, FRAME * 7],
          [FRAME * 2, FRAME * 7],
          [FRAME * 3, FRAME * 7],
        ],
        "run-ne": [
          [0, FRAME * 4],
          [FRAME, FRAME * 4],
          [FRAME * 2, FRAME * 4],
          [FRAME * 3, FRAME * 4],
        ],
        "run-sw": [
          [0, FRAME * 5],
          [FRAME, FRAME * 5],
          [FRAME * 2, FRAME * 5],
          [FRAME * 3, FRAME * 5],
        ],
        "run-se": [
          [0, FRAME * 2],
          [FRAME, FRAME * 2],
          [FRAME * 2, FRAME * 2],
          [FRAME * 3, FRAME * 2],
        ],
      },
      transform: properties.transform,
    });
  }
}
