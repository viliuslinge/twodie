import { BaseObject, IObjectSpeed, IObjectPosition } from "./BaseObject";

export class CircleObject extends BaseObject {
  type: "circle";
  radius: number;
  speed: IObjectSpeed;
  position: IObjectPosition;
  isColliding: boolean;

  constructor(props: {
    radius: number;
    posX: number;
    posY: number;
    speedX: number;
    speedY: number;
  }) {
    super();
    this.type = "circle";
    this.radius = props.radius;
    this.speed = { x: props.speedX, y: props.speedY };
    this.position = { x: props.posX, y: props.posY };
    this.isColliding = false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.isColliding ? "pink" : "grey";
    ctx.fill();
  }

  update(): void {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
