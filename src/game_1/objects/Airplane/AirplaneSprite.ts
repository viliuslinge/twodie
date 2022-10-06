import { AnimatedSprite } from "engine/components/sprites";
import { ITransformProperties } from "engine/components/Transform";

import spritePNG from "../../../../assets/sprites/airplane_1_v1.png";

type IAnimations = "left" | "right" | "straight";

interface IAirplaneSpriteProperties {
  transform: ITransformProperties;
}

const FRAME_WIDTH = 253;
const FRAME_HEIGHT = 206;

function genArray(length: number): number[] {
  return Array.from(Array(length).keys());
}

export class AirplaneSprite extends AnimatedSprite<IAnimations> {
  constructor(properties: IAirplaneSpriteProperties) {
    super({
      image: spritePNG,
      animationDuration: 1,
      frameHeight: FRAME_HEIGHT,
      frameWidth: FRAME_WIDTH,
      currentAnimationID: "straight",
      currentAnimationFrameIdx: 0,
      animations: {
        left: [[FRAME_WIDTH, 0]],
        right: [[FRAME_WIDTH * 25, 0]],
        straight: [[FRAME_WIDTH * 13, 0]],
      },
      transform: properties.transform,
    });
  }
}
