// import { PaddleActor } from "./PaddleActor";

// export class InputHandler {
//   constructor(private paddle: PaddleActor) {
//     this.initKeyDown();
//     this.initKeyUp();
//   }

//   private initKeyDown() {
//     document.addEventListener("keydown", (e) => {
//       switch (e.key) {
//         case "ArrowLeft": {
//           this.paddle.moveLeft();

//           break;
//         }
//         case "ArrowRight": {
//           this.paddle.moveRight();

//           break;
//         }
//       }
//     });
//   }

//   private initKeyUp() {
//     document.addEventListener("keyup", (e) => {
//       switch (e.key) {
//         case "ArrowLeft": {
//           if (this.paddle.speed < 0) {
//             this.paddle.stop();
//           }

//           break;
//         }
//         case "ArrowRight": {
//           if (this.paddle.speed > 0) {
//             this.paddle.stop();
//           }

//           break;
//         }
//       }
//     });
//   }
// }
