interface IVelocity {
  x: number;
  y: number;
}

export interface IAttributesProperties {
  velocity: IVelocity;
  maxVelocity: number;
  mass: number;
  friction: number;
  /**
   * Coefficient of the elasticity.
   * If 1 it is a complete elastic collision.
   * If 0 it is a complete inelastic collision
   */
  restitution: number;
}

export class Attributes {
  readonly maxVelocity: number;
  readonly mass: number;
  readonly friction: number;
  readonly restitution: number;
  velocity: IVelocity;

  constructor(properties: IAttributesProperties) {
    this.velocity = properties.velocity;
    this.maxVelocity = properties.maxVelocity;
    this.mass = properties.mass;
    this.friction = properties.friction;
    this.restitution = properties.restitution;
  }

  setVelocity = (velocity: IVelocity): void => {
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
  };
}