import { Game } from "../Game";

import { BaseActor, IBaseActorInput } from "./BaseActor";

interface IFirstActorInput extends IBaseActorInput {
  maxVelocity: number;
}

export class FirstActor extends BaseActor {
  maxVelocity: number;

  constructor(private _game: Game, props: IFirstActorInput) {
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
    ctx.fillStyle = this.shape?.isColliding ? "pink" : "grey";
    ctx.fillRect(this.positionX, this.positionY, 50, 50);
  };

  update = (): void => {
    super.update();

    this.setPosition(
      this.positionX + this.velocityX,
      this.positionY + this.velocityY
    );
  };
}
