import { Game } from "../Game";
import { RectShape } from "../shapes";

import { BaseActor, IBaseActorInput } from "./BaseActor";

interface IFirstActorInput extends IBaseActorInput {
  maxVelocity: number;
}

export class FirstActor extends BaseActor {
  maxVelocity: number;

  constructor(private _game: Game, props: IFirstActorInput) {
    super({
      positionX: props.positionX,
      positionY: props.positionY,
      velocityX: props.velocityX,
      velocityY: props.velocityY,
    });

    this.maxVelocity = props.maxVelocity;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.shape?.isColliding ? "pink" : "grey";
    ctx.fillRect(this.positionX, this.positionY, 50, 50);
  }

  update(): void {
    this.setPosition(
      this.positionX + this.velocityX,
      this.positionY + this.velocityY
    );
  }
}

// moveLeft = (): void => {
//   this.velocityX = -this.maxVelocity;
// };

// moveRight = (): void => {
//   this.velocityX = this.maxVelocity;
// };

// stop = (): void => {
//   this.velocityX = 0;
// };

// private initKeyboardHandlers() {
//   document.addEventListener("keydown", (e) => {
//     switch (e.key) {
//       case "ArrowLeft": {
//         this.moveLeft();

//         break;
//       }
//       case "ArrowRight": {
//         this.moveRight();

//         break;
//       }
//     }
//   });

//   document.addEventListener("keyup", (e) => {
//     switch (e.key) {
//       case "ArrowLeft": {
//         if (this.velocityX < 0) {
//           this.stop();
//         }

//         break;
//       }
//       case "ArrowRight": {
//         if (this.velocityX > 0) {
//           this.stop();
//         }

//         break;
//       }
//     }
//   });
// }
