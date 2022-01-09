import { BaseObject, IObjectSpeed, IObjectPosition } from "./BaseObject";

export class RectObject extends BaseObject {
  type: "rect";
  width: number;
  height: number;
  speed: IObjectSpeed;
  position: IObjectPosition;
  isColliding: boolean;

  constructor(x: number, y: number, speedX: number, speedY: number) {
    super();
    this.type = "rect";
    this.width = 40;
    this.height = 40;
    this.speed = { x: speedX, y: speedY };
    this.position = { x: x, y: y };
    this.isColliding = false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.isColliding ? "pink" : "grey";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(): void {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
