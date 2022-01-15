// import { Shape } from "./shapes";
// import { BaseActor } from "./actors";

// export function applyFrictionPhysics(o: BaseActor, friction: number): void {
//   o.setVelocity(o.velocityX * friction, o.velocityY * friction);
// }

// export function applyCollisionPhysics(obj1: Shape, obj2: Shape): void {
//   const o1 = getParams(obj1);
//   const o2 = getParams(obj2);

//   if (!o1 || !o2) return;

//   const vCollision = {
//     x: o2.positionX - o1.positionX,
//     y: o2.positionY - o1.positionY,
//   };

//   const distance = Math.sqrt(
//     (o2.positionX - o1.positionX) * (o2.positionX - o1.positionX) +
//       (o2.positionY - o1.positionY) * (o2.positionY - o1.positionY)
//   );

//   const vCollisionNorm = {
//     x: vCollision.x / distance,
//     y: vCollision.y / distance,
//   };

//   const vRelativeVelocity = {
//     x: o1.velocityX - o2.velocityX,
//     y: o1.velocityY - o2.velocityY,
//   };

//   let speed =
//     vRelativeVelocity.x * vCollisionNorm.x +
//     vRelativeVelocity.y * vCollisionNorm.y;

//   if (speed < 0) return;

//   const impulse = (2 * speed) / (o1.mass + o2.mass);

//   obj1.actor.setVelocity(
//     o1.velocityX - impulse * o2.mass * vCollisionNorm.x,
//     o1.velocityY - impulse * o2.mass * vCollisionNorm.y
//   );

//   obj2.actor.setVelocity(
//     o2.velocityX + impulse * o1.mass * vCollisionNorm.x,
//     o2.velocityY + impulse * o1.mass * vCollisionNorm.y
//   );
// }

// function getParams(shape: Shape):
//   | {
//       positionX: number;
//       positionY: number;
//       velocityX: number;
//       velocityY: number;
//       mass: number;
//     }
//   | undefined {
//   switch (shape.type) {
//     case "rect": {
//       return {
//         positionX: shape.positionX + shape.width / 2,
//         positionY: shape.positionY + shape.height / 2,
//         velocityX: shape.actor.velocityX,
//         velocityY: shape.actor.velocityY,
//         mass: shape.actor.mass,
//       };
//     }
//     case "circle": {
//       return {
//         positionX: shape.positionX,
//         positionY: shape.positionY,
//         velocityX: shape.actor.velocityX,
//         velocityY: shape.actor.velocityY,
//         mass: shape.actor.mass,
//       };
//     }
//   }
// }
