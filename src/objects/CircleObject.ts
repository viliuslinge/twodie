import { BaseObject, IObjectSpeed, IObjectPosition } from "./BaseObject";

export class CircleObject extends BaseObject {
  type: "circle";
  size: number;
  speed: IObjectSpeed;
  position: IObjectPosition;
  isColliding: boolean;

  constructor(x: number, y: number, speedX: number, speedY: number) {
    super();
    this.type = "circle";
    this.size = 40;
    this.speed = { x: speedX, y: speedY };
    this.position = { x: x, y: y };
    this.isColliding = false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = this.isColliding ? "pink" : "grey";
    ctx.fill();
  }

  update(): void {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
