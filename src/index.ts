import { Game } from "./Game";
import { createCanvas } from "./canvasCreator";
import { detectCollisions } from "./collisionDetector";

const GAME_WIDTH: number = 800;
const GAME_HEIGHT: number = 600;
const game = new Game(GAME_WIDTH, GAME_HEIGHT);
const { ctx } = createCanvas(GAME_WIDTH, GAME_HEIGHT);

game.start();

requestAnimationFrame(gameLoop);

function gameLoop(): void {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update();
  detectCollisions(game.objects);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}
