import { IObject } from "./objects";
import { createCanvas } from "./canvasCreator";
import { detectCollisions } from "./collisionDetector";

export class Game {
  private ctx: CanvasRenderingContext2D;
  objects: IObject[];

  constructor(public width: number, public height: number) {
    this.ctx = createCanvas(this.width, this.height).ctx;
    this.objects = [];
  }

  load = (objects: IObject[]): void => {
    this.objects = objects;
  };

  start = (): void => {
    requestAnimationFrame(this.gameLoop);
  };

  private draw = (ctx: CanvasRenderingContext2D): void => {
    this.objects.forEach((a) => a.draw(ctx));
  };

  private update = (): void => {
    this.objects.forEach((a) => a.update());
  };

  private gameLoop = (): void => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.update();
    detectCollisions(this.objects);
    this.draw(this.ctx);

    requestAnimationFrame(this.gameLoop);
  };
}
