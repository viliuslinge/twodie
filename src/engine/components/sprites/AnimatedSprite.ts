import { IGameRenderer } from "../../GameRenderer";

import { Sprite, ISpriteProperties } from "./Sprite";

interface IAnimatedSpriteProperties<T extends string = string>
  extends ISpriteProperties {
  animations: IAnimations<T>;
  animationDuration: number;
  currentAnimationID: T;
  currentAnimationFrameIdx: number;
}

type IAnimations<T extends string = string> = Record<
  T,
  IAnimationFrameCoordinates[]
>;
type IAnimationFrameCoordinates = [number, number];

export class AnimatedSprite<T extends string = string> extends Sprite {
  private animationProgress: number;
  private animationDuration: number;
  private currentAnimationFrameIdx: number;
  animations: IAnimations<T>;
  currentAnimationID: T;

  constructor(properties: IAnimatedSpriteProperties<T>) {
    super({
      image: properties.image,
      frameHeight: properties.frameHeight,
      frameWidth: properties.frameWidth,
      transform: properties.transform,
    });

    this.animations = properties.animations;
    this.animationProgress = properties.animationDuration;
    this.animationDuration = properties.animationDuration;
    this.currentAnimationID = properties.currentAnimationID;
    this.currentAnimationFrameIdx = properties.currentAnimationFrameIdx;
  }

  setCurrentAnimationID = (id: T): void => {
    if (this.currentAnimationID !== id) {
      this.currentAnimationFrameIdx = 0;
      this.currentAnimationID = id;
    }
  };

  render = (renderer: IGameRenderer): void => {
    this.updateAnimationProgress();

    if (this.currentFrameCoordinates) {
      const [x, y] = this.currentFrameCoordinates;

      renderer.drawImage(
        this.image,
        x,
        y,
        this.frameWidth,
        this.frameHeight,
        this.transform.position.x,
        this.transform.position.y,
        this.frameWidth * this.transform.scale,
        this.frameHeight * this.transform.scale
      );
    }
  };

  private updateAnimationFrame = (): void => {
    if (this.currentAnimationFrameIdx === this.frames.length - 1) {
      this.currentAnimationFrameIdx = 0;
    } else {
      this.currentAnimationFrameIdx += 1;
    }
  };

  private updateAnimationProgress = (): void => {
    if (this.animationProgress > 0) {
      this.animationProgress -= 1;
    } else {
      this.animationProgress = this.animationDuration;
      this.updateAnimationFrame();
    }
  };

  private get currentFrameCoordinates():
    | IAnimationFrameCoordinates
    | undefined {
    return this.frames[this.currentAnimationFrameIdx];
  }

  private get frames(): IAnimationFrameCoordinates[] {
    return this.animations[this.currentAnimationID];
  }
}
