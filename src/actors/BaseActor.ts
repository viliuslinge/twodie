import { Shape } from "../shapes";
import { applyCollisionPhysics, applyFrictionPhysics } from "../physics";
import { ENVIRONMENTAL_FRICTION } from "../index";

import { FirstActor } from "./FirstActor";
import { SecondActor } from "./SecondActor";

export type Actor = FirstActor | SecondActor;

export interface IBaseActor {
  shape?: Shape;
  mass: number;
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
}

export interface IBaseActorInput {
  mass: number;
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
}

export abstract class BaseActor implements IBaseActor {
  shape?: IBaseActor["shape"];
  mass: IBaseActor["mass"];
  positionX: IBaseActor["positionX"];
  positionY: IBaseActor["positionY"];
  velocityX: IBaseActor["velocityX"];
  velocityY: IBaseActor["velocityY"];

  constructor(props: IBaseActorInput) {
    this.shape = undefined;
    this.mass = props.mass;
    this.positionX = props.positionX;
    this.positionY = props.positionY;
    this.velocityX = props.velocityX;
    this.velocityY = props.velocityY;
  }

  setShape = (shape: Shape): void => {
    this.shape = shape;
  };

  setPosition = (
    x: IBaseActor["positionX"],
    y: IBaseActor["positionY"]
  ): void => {
    this.positionX = x;
    this.positionY = y;
  };

  setVelocity = (
    x: IBaseActor["velocityX"],
    y: IBaseActor["velocityY"]
  ): void => {
    this.velocityX = x;
    this.velocityY = y;
  };

  update(): void {
    if (
      this.shape &&
      this.shape.isOverlapEnabled &&
      this.shape.colliders[0] &&
      this.shape.colliders[0].isOverlapEnabled
    ) {
      applyCollisionPhysics(this, this.shape.colliders[0].actor);
    }

    applyFrictionPhysics(this, ENVIRONMENTAL_FRICTION);
  }

  abstract render(ctx: CanvasRenderingContext2D): void;
}
