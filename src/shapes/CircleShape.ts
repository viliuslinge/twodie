import { Actor } from "../actors";

import { BaseShape, IBaseShapeInput } from "./BaseShape";

interface ICircleShapeInput extends IBaseShapeInput {
  radius: number;
}

export class CircleShape extends BaseShape {
  readonly type: "circle";
  readonly radius: number;

  constructor(actor: Actor, props: ICircleShapeInput) {
    super(actor, {
      positionX: props.positionX,
      positionY: props.positionY,
      isOverlapEnabled: props.isOverlapEnabled,
    });
    this.type = "circle";
    this.radius = props.radius;
  }

  render = (ctx: CanvasRenderingContext2D): void => {
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "orange";
    ctx.stroke();
  };
}
