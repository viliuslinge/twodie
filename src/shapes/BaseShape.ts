import { Actor } from "../actors";

import { RectShape } from "./RectShape";
import { CircleShape } from "./CircleShape";

export type Shape = RectShape | CircleShape;

export interface IBaseShape {
  positionX: number;
  positionY: number;
  colliders: Shape[];
  isColliding: boolean;
  /**
   * allows or prevents other Shapes from entering the shape
   */
  isOverlapEnabled: boolean;
}

export interface IBaseShapeInput {
  positionX: number;
  positionY: number;
  /**
   * allows or prevents other Shapes from entering the shape
   */
  isOverlapEnabled: boolean;
}

export abstract class BaseShape implements IBaseShape {
  /**
   * relative to the position x of the actor
   */
  private _positionX: number;
  /**
   * relative to the position y of the actor
   */
  private _positionY: number;

  readonly isOverlapEnabled: IBaseShape["isOverlapEnabled"];
  colliders: IBaseShape["colliders"];

  constructor(public actor: Actor, props: IBaseShapeInput) {
    this._positionX = props.positionX;
    this._positionY = props.positionY;
    this.isOverlapEnabled = props.isOverlapEnabled;
    this.colliders = [];
  }

  get positionX(): IBaseShape["positionX"] {
    return this.actor.positionX + this._positionX;
  }

  get positionY(): IBaseShape["positionY"] {
    return this.actor.positionY + this._positionY;
  }

  get isColliding(): IBaseShape["isColliding"] {
    return this.colliders.length > 0;
  }

  addCollider = (shape: Shape): void => {
    this.colliders.push(shape);
  };

  resetColliders = (): void => {
    this.colliders = [];
  };

  abstract render(ctx: CanvasRenderingContext2D): void;
}
