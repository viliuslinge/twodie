import { IObject, CircleObject, RectangularObject } from "./objects";

export class Game {
  objects: IObject[];

  constructor(public width: number, public height: number) {
    this.objects = [];
  }

  start(): void {
    this.objects = [
      new CircleObject(250, 50, 0, 1),
      new RectangularObject(250, 300, 0, -1),
      new CircleObject(150, 0, 1, 1),
      new RectangularObject(250, 150, 1, 1),
      new CircleObject(350, 75, -1, 1),
      new RectangularObject(300, 300, 1, 0),
    ];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.objects.forEach((a) => a.draw(ctx));
  }

  update(): void {
    this.objects.forEach((a) => a.update());
  }
}
