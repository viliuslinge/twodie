import { Game } from "../Game";

import { BaseActor, IBaseActorInput } from "./BaseActor";

interface ISecondActorInput extends IBaseActorInput {
  maxVelocity: number;
}

export class SecondActor extends BaseActor {
  maxVelocity: number;

  constructor(private _game: Game, props: ISecondActorInput) {
    super({
      mass: props.mass,
      positionX: props.positionX,
      positionY: props.positionY,
      velocityX: props.velocityX,
      velocityY: props.velocityY,
    });

    this.maxVelocity = props.maxVelocity;
  }

  render = (ctx: CanvasRenderingContext2D): void => {
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = this.shape?.isColliding ? "pink" : "grey";
    ctx.fill();
  };

  update = (): void => {
    super.update();

    this.setPosition(
      this.positionX + this.velocityX,
      this.positionY + this.velocityY
    );
  };
}
