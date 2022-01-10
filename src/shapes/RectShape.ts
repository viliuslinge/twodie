import { Actor } from "../actors";

import { BaseShape, IBaseShapeInput } from "./BaseShape";

interface IRectShapeInput extends IBaseShapeInput {
  width: number;
  height: number;
}

export class RectShape extends BaseShape {
  readonly type: "rect";
  readonly width: number;
  readonly height: number;

  constructor(actor: Actor, props: IRectShapeInput) {
    super(actor, {
      positionX: props.positionX,
      positionY: props.positionY,
      isOverlapEnabled: props.isOverlapEnabled,
    });
    this.type = "rect";
    this.width = props.width;
    this.height = props.height;
  }

  render = (ctx: CanvasRenderingContext2D): void => {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "orange";
    ctx.strokeRect(this.positionX, this.positionY, this.width, this.height);
  };
}
