import { Actor } from "./actors";
import { createCanvas } from "./canvasCreator";
import { detectCollisions } from "./collisionDetector";

export class Game {
  private ctx: CanvasRenderingContext2D;
  actors: Actor[];

  constructor(public width: number, public height: number) {
    this.ctx = createCanvas(this.width, this.height).ctx;
    this.actors = [];
  }

  loadActors = (actors: Actor[]): void => {
    this.actors = actors;
  };

  start = (): void => {
    requestAnimationFrame(this.gameLoop);
  };

  private render = (ctx: CanvasRenderingContext2D): void => {
    this.actors.forEach((a) => {
      a.render(ctx);
      a.shape?.render(ctx);
    });
  };

  private update = (): void => {
    this.actors.forEach((a) => a.update());
  };

  private gameLoop = (): void => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.update();
    detectCollisions(this.actors);
    this.render(this.ctx);

    requestAnimationFrame(this.gameLoop);
  };
}
