// import { Game } from "./Game";
// import { IBaseActor } from "./BaseObject";

// export class PaddleActor implements IBaseActor {
//   private maxSpeed: number;
//   width: number;
//   height: number;
//   position: { x: number; y: number };
//   speed: number;
//   isColliding: boolean;

//   constructor(private game: Game) {
//     this.width = 150;
//     this.height = 20;
//     this.speed = 0;
//     this.maxSpeed = 7;
//     this.position = {
//       x: this.game.width / 2 - this.width / 2,
//       y: this.game.height / 2 - this.height / 2,
//     };
//     this.isColliding = false;
//   }

//   draw(ctx: CanvasRenderingContext2D): void {
//     ctx.fillStyle = "#0ff";
//     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
//   }

//   update(): void {
//     this.position.x += this.speed;

//     if (this.position.x < 0) {
//       this.position.x = 0;
//     }

//     if (this.position.x + this.width > this.game.width) {
//       this.position.x = this.game.width - this.width;
//     }
//   }

//   moveLeft(): void {
//     this.speed = -this.maxSpeed;
//   }

//   moveRight(): void {
//     this.speed = this.maxSpeed;
//   }

//   stop(): void {
//     this.speed = 0;
//   }
// }
