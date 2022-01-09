// import imagePNG from "../assets/images/ball.png";

// import { Game } from "./Game";
// import { IBaseActor } from "./BaseObject";

// export class BallObject implements IBaseObject {
//   private image: HTMLImageElement;
//   private size: number;
//   private speed: { x: number; y: number };
//   position: { x: number; y: number };
//   isColliding: boolean;

//   constructor(private game: Game) {
//     this.image = document.createElement("img");
//     this.image.src = imagePNG;
//     this.size = 16;
//     this.speed = { x: 5, y: 5 };
//     this.position = { x: 10, y: 10 };
//     this.isColliding = false;
//   }

//   draw(ctx: CanvasRenderingContext2D): void {
//     ctx.drawImage(
//       this.image,
//       this.position.x,
//       this.position.y,
//       this.size,
//       this.size
//     );
//   }

//   update(): void {
//     this.position.x += this.speed.x;
//     this.position.y += this.speed.y;

//     // wall on left or right
//     if (this.position.x + this.size > this.game.width || this.position.x < 0) {
//       this.speed.x = -this.speed.x;
//     }

//     // wall on top or bottom
//     if (this.position.y + this.size > this.game.height || this.position.y < 0) {
//       this.speed.y = -this.speed.y;
//     }

//     // // paddle
//     // const ballLeft = this.position.x;
//     // const ballRight = this.position.x + this.size;
//     // const ballTop = this.position.y;
//     // const ballTopCenter = ballRight / 2;
//     // const ballBottom = this.position.y + this.size;
//     // const ballBottomCenter = ballRight / 2;

//     // const paddleLeft = this.game.paddle.position.x;
//     // const paddleRight = this.game.paddle.position.x + this.game.paddle.width;
//     // const paddleTop = this.game.paddle.position.y;
//     // const paddleBottom = this.game.paddle.position.y + this.game.paddle.height;

//     // if (ballBottomCenter >= paddleLeft && ballBottomCenter <= paddleRight) {
//     //   if (ballBottom > paddleTop) {
//     //     this.speed.y = -this.speed.y;
//     //   }

//     //   if (ballTop > paddleBottom) {
//     //     this.speed.y = -this.speed.y;
//     //   }
//     // }

//     // // if (ballBottom > paddleTop) {
//     // //   if (ballRight > paddleLeft || ballLeft < paddleRight) {
//     // //     this.speed.x = -this.speed.x;
//     // //   }
//     // // }
//   }
// }
