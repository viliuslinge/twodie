import { IGameRenderer } from "engine/GameRenderer";
import { RectShape } from "engine/components/shapes";
import { AnimatedSprite } from "engine/components/sprites";
import { BaseObject } from "engine/components/objects";

import spritePNG from "../../../assets/sprites/sprite.png";

export class Hero extends BaseObject<AnimatedSprite<"walk" | "dance">> {
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
      sprite: new AnimatedSprite<"walk" | "dance">({
        image: spritePNG,
        animationDuration: 16,
        frameHeight: 32,
        frameWidth: 32,
        currentAnimationID: "walk",
        currentAnimationFrameIdx: 0,
        animations: {
          walk: [
            [0, 0],
            [64, 0],
          ],
          dance: [],
        },
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

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft": {
          this.moveLeft();
          break;
        }
        case "ArrowRight": {
          this.moveRight();
          break;
        }
        case "ArrowUp": {
          this.moveUp();
          break;
        }
        case "ArrowDown": {
          this.moveDown();
          break;
        }
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft": {
          if (this.attributes.velocity.x < 0) {
            this.stop();
          }
          break;
        }
        case "ArrowRight": {
          if (this.attributes.velocity.x > 0) {
            this.stop();
          }
          break;
        }
        case "ArrowUp": {
          if (this.attributes.velocity.y < 0) {
            this.stop();
          }
          break;
        }
        case "ArrowDown": {
          if (this.attributes.velocity.y > 0) {
            this.stop();
          }
          break;
        }
      }
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
    this.sprite.render(renderer);
  }

  private moveLeft = (): void => {
    this.attributes.setVelocity({
      x: -this.attributes.maxVelocity,
      y: this.attributes.velocity.y,
    });
  };

  private moveRight = (): void => {
    this.attributes.setVelocity({
      x: this.attributes.maxVelocity,
      y: this.attributes.velocity.y,
    });
  };

  private moveUp = (): void => {
    this.attributes.setVelocity({
      x: this.attributes.velocity.x,
      y: -this.attributes.maxVelocity,
    });
  };

  private moveDown = (): void => {
    this.attributes.setVelocity({
      x: this.attributes.velocity.x,
      y: this.attributes.maxVelocity,
    });
  };

  private stop = (): void => {
    this.attributes.setVelocity({
      x: 0,
      y: 0,
    });
  };
}
