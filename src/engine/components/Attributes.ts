interface IVelocity {
  x: number;
  y: number;
}

export interface IAttributesSerialized {
  velocity: IVelocity;
  maxVelocity: number;
  mass: number;
  friction: number;
  restitution: number;
}

export interface IAttributesProperties {
  velocity: IVelocity;
  maxVelocity: number;
  mass: number;
  friction: number;
  restitution: number;
}

export class Attributes {
  readonly maxVelocity: number;
  readonly mass: number;
  readonly friction: number;
  /**
   * Coefficient of the elasticity.
   * If 1 it is a complete elastic collision.
   * If 0 it is a complete inelastic collision
   */
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

  serialize = (): IAttributesSerialized => {
    return {
      velocity: { ...this.velocity },
      maxVelocity: this.maxVelocity,
      mass: this.mass,
      friction: this.friction,
      restitution: this.restitution,
    };
  };
}
