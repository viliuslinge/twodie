import { BaseObject, IObjectSpeed, IObjectPosition } from "./BaseObject";

export class RectObject extends BaseObject {
  type: "rect";
  width: number;
  height: number;
  speed: IObjectSpeed;
  position: IObjectPosition;
  isColliding: boolean;

  constructor(props: {
    height: number;
    width: number;
    posX: number;
    posY: number;
    speedX: number;
    speedY: number;
  }) {
    super();
    this.type = "rect";
    this.width = props.width;
    this.height = props.height;
    this.speed = { x: props.speedX, y: props.speedY };
    this.position = { x: props.posX, y: props.posY };
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
