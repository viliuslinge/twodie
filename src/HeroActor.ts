import { Game } from "./Game";
import { RectObject } from "./objects";

export class HeroActor extends RectObject {
  private maxSpeed: number;

  constructor(game: Game) {
    super({
      width: 30,
      height: 100,
      posX: 50,
      posY: game.height - 100,
      speedX: 0,
      speedY: 0,
    });

    this.maxSpeed = 10;

    this.initKeyDown();
    this.initKeyUp();
  }

  moveLeft = (): void => {
    this.speed.x = -this.maxSpeed;
  };

  moveRight = (): void => {
    this.speed.x = this.maxSpeed;
  };

  stop = (): void => {
    this.speed.x = 0;
  };

  private initKeyDown() {
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
      }
    });
  }

  private initKeyUp() {
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft": {
          if (this.speed.x < 0) {
            this.stop();
          }

          break;
        }
        case "ArrowRight": {
          if (this.speed.x > 0) {
            this.stop();
          }

          break;
        }
      }
    });
  }
}
