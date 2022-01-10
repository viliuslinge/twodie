import { Shape } from "../shapes";

import { FirstActor } from "./FirstActor";
import { SecondActor } from "./SecondActor";

export type Actor = FirstActor | SecondActor;

export interface IBaseActor {
  shape?: Shape;
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
}

export interface IBaseActorInput {
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
}

export abstract class BaseActor implements IBaseActor {
  shape?: IBaseActor["shape"];
  positionX: IBaseActor["positionX"];
  positionY: IBaseActor["positionY"];
  velocityX: IBaseActor["velocityX"];
  velocityY: IBaseActor["velocityY"];

  constructor(props: IBaseActorInput) {
    this.shape = undefined;
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

  abstract render(ctx: CanvasRenderingContext2D): void;

  abstract update(): void;
}
