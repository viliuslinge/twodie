import { Game } from "engine/Game";
import { World } from "engine/World";

import { Hero } from "./objects/Hero";
import { Enemy } from "./objects/Enemy";

const GAME_WIDTH: number = 1500;
const GAME_HEIGHT: number = 900;

const game = new Game({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

const world = new World();
const hero = new Hero();
const enemy = new Enemy();
world.addObject(hero);
world.addObject(enemy);
game.setWorld(world);

export { game };
// export function createCanvas(
//   width: number,
//   height: number
// ): { ctx: CanvasRenderingContext2D } {
//   const root = document.getElementById("root");
//   if (!root) {
//     throw new Error("Root element could not be found");
//   }

//   const canvas = document.createElement("canvas");
//   canvas.setAttribute("width", `${width}px`);
//   canvas.setAttribute("height", `${height}px`);
//   canvas.style.border = "1px solid black";

//   root.appendChild(canvas);

//   const ctx = canvas.getContext("2d");
//   if (!ctx) {
//     throw new Error("Canvas context could not be found");
//   }

//   return {
//     ctx,
//   };
// }

// const GAME_WIDTH: number = 800;
// const GAME_HEIGHT: number = 500;
// const GRAVITY = 980;

// class Vector {
//   x: number;
//   y: number;

//   constructor(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//   }

//   add(v: { x: number; y: number }) {
//     return new Vector(this.x + v.x, this.y + v.y);
//   }

//   substract(v: { x: number; y: number }) {
//     return new Vector(this.x - v.x, this.y - v.y);
//   }

//   multiply(s: number) {
//     return new Vector(this.x * s, this.y * s);
//   }
//   dot(v: { x: number; y: number }) {
//     return this.x * v.x + this.y * v.y;
//   }

//   normalize() {
//     let distance = Math.sqrt(this.x * this.x + this.y * this.y);
//     return new Vector(this.x / distance, this.y / distance);
//   }
// }

// class Circle {
//   context: CanvasRenderingContext2D;
//   x: number;
//   y: number;
//   r: number;
//   vx: number;
//   vy: number;
//   mass: number;
//   cor: number;
//   colliding: boolean;
//   color?: string;

//   constructor(
//     context: CanvasRenderingContext2D,
//     x: number,
//     y: number,
//     r: number,
//     vx: number,
//     vy: number,
//     mass?: number,
//     cor?: number,
//     color?: string
//   ) {
//     this.context = context;
//     this.x = x;
//     this.y = y;
//     this.r = r;
//     this.vx = vx;
//     this.vy = vy;
//     this.mass = mass ?? 1;
//     this.cor = cor ?? 1;
//     this.colliding = false;
//     this.color = color;
//   }

//   draw() {
//     this.context.fillStyle = this.colliding
//       ? "hsl(300, 100%, 70%)"
//       : this.color ?? "hsl(170, 100%, 50%)";
//     this.context.beginPath();
//     this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
//     this.context.fill();
//   }

//   checkCollideWith(other: Circle) {
//     if (this.isCircleCollided(other)) {
//       this.colliding = true;
//       other.colliding = true;
//       this.changeVelocityAndDirection(other);
//     }
//   }

//   isCircleCollided(other: Circle) {
//     let squareDistance =
//       (this.x - other.x) * (this.x - other.x) +
//       (this.y - other.y) * (this.y - other.y);
//     let squareRadius = (this.r + other.r) * (this.r + other.r);
//     return squareDistance <= squareRadius;
//   }

//   changeVelocityAndDirection(other: Circle) {
//     let velocity1 = new Vector(this.vx, this.vy);
//     let velocity2 = new Vector(other.vx, other.vy);

//     let vNorm = new Vector(this.x - other.x, this.y - other.y);

//     let unitVNorm = vNorm.normalize();
//     let unitVTan = new Vector(-unitVNorm.y, unitVNorm.x);

//     let v1n = velocity1.dot(unitVNorm);
//     let v1t = velocity1.dot(unitVTan);

//     let v2n = velocity2.dot(unitVNorm);
//     let v2t = velocity2.dot(unitVTan);

//     let cor = Math.min(this.cor, other.cor);

//     // let v1nAfter =
//     //   (v1n * (this.mass - other.mass) + 2 * other.mass * v2n) / (this.mass + other.mass);
//     let v1nAfter =
//       (this.mass * v1n + other.mass * v2n + cor * other.mass * (v2n - v1n)) /
//       (this.mass + other.mass);

//     // let v2nAfter =
//     //   (v2n * (other.mass - this.mass) + 2 * this.mass * v1n) / (this.mass + other.mass);
//     let v2nAfter =
//       (this.mass * v1n + other.mass * v2n + cor * this.mass * (v1n - v2n)) /
//       (this.mass + other.mass);

//     if (v1nAfter < v2nAfter) {
//       return;
//     }

//     let v1VectorNorm = unitVNorm.multiply(v1nAfter);
//     let v1VectorTan = unitVTan.multiply(v1t);

//     let v2VectorNorm = unitVNorm.multiply(v2nAfter);
//     let v2VectorTan = unitVTan.multiply(v2t);

//     let velocity1After = v1VectorNorm.add(v1VectorTan);
//     let velocity2After = v2VectorNorm.add(v2VectorTan);

//     this.vx = velocity1After.x;
//     this.vy = velocity1After.y;

//     other.vx = velocity2After.x;
//     other.vy = velocity2After.y;
//   }

//   update(seconds: number) {
//     this.vy += GRAVITY * seconds;
//     this.x += this.vx * seconds;
//     this.y += this.vy * seconds;
//   }
// }

// class Gameboard {
//   startTime: number;
//   circles: Circle[];
//   ctx: CanvasRenderingContext2D;

//   constructor() {
//     this.ctx = createCanvas(GAME_WIDTH, GAME_HEIGHT).ctx;
//     this.startTime = 0;
//     this.circles = [];
//     this.init();
//   }

//   init() {
//     this.circles = [
//       new Circle(this.ctx, 30, 50, 30, -100, 390, 1, 0, "#000000"),
//       // new Circle(this.ctx, 60, 180, 20, 180, -275, 1, 1),
//       // new Circle(this.ctx, 120, 100, 60, 120, 262, 1, 1),
//       // new Circle(this.ctx, 150, 180, 10, -130, 138, 1, 1),
//       // new Circle(this.ctx, 190, 210, 10, 138, -280, 1, 1),
//       // new Circle(this.ctx, 220, 240, 10, 142, 350, 1, 1),
//       // new Circle(this.ctx, 100, 260, 10, 135, -460, 1, 1),
//       // new Circle(this.ctx, 120, 285, 10, -165, 370, 1, 1),
//       // new Circle(this.ctx, 140, 290, 10, 125, 230, 1, 1),
//       // new Circle(this.ctx, 160, 380, 10, -175, -180, 1, 1),
//       // new Circle(this.ctx, 180, 310, 10, 115, 440, 1, 1),
//       // new Circle(this.ctx, 100, 310, 10, -195, -325, 1, 1),
//       // new Circle(this.ctx, 60, 150, 10, -138, 420, 1, 1),
//       // new Circle(this.ctx, 70, 430, 45, 135, -230, 1, 1),
//       // new Circle(this.ctx, 250, 290, 40, -140, 335, 1, 1),
//       // new Circle(this.ctx, 30, 50, 30, -100, 390, 10, 1, "#000000"),
//       // new Circle(this.ctx, 60, 180, 20, 180, -275, 20, 1),
//       // new Circle(this.ctx, 120, 100, 60, 120, 262, 100, 1),
//       // new Circle(this.ctx, 150, 180, 10, -130, 138, 10, 1),
//       // new Circle(this.ctx, 190, 210, 10, 138, -280, 10, 1),
//       // new Circle(this.ctx, 220, 240, 10, 142, 350, 10, 1),
//       // new Circle(this.ctx, 100, 260, 10, 135, -460, 10, 1),
//       // new Circle(this.ctx, 120, 285, 10, -165, 370, 10, 1),
//       // new Circle(this.ctx, 140, 290, 10, 125, 230, 10, 1),
//       // new Circle(this.ctx, 160, 380, 10, -175, -180, 10, 1),
//       // new Circle(this.ctx, 180, 310, 10, 115, 440, 10, 1),
//       // new Circle(this.ctx, 100, 310, 10, -195, -325, 10, 1),
//       // new Circle(this.ctx, 60, 150, 10, -138, 420, 10, 1),
//       // new Circle(this.ctx, 70, 430, 45, 135, -230, 45, 1),
//       // new Circle(this.ctx, 250, 290, 40, -140, 335, 40, 1),

//       // new Circle(this.ctx, 30, 50, 30, -100, 390, 10, 0.6, "#000000"),
//       // new Circle(this.ctx, 60, 180, 20, 180, -275, 20, 0.5),
//       // new Circle(this.ctx, 120, 100, 60, 120, 262, 100, 0.3),
//       // new Circle(this.ctx, 150, 180, 10, -130, 138, 10, 0.7),
//       // new Circle(this.ctx, 190, 210, 10, 138, -280, 10, 0.7),
//       // new Circle(this.ctx, 220, 240, 10, 142, 350, 10, 0.7),
//       // new Circle(this.ctx, 100, 260, 10, 135, -460, 10, 0.7),
//       // new Circle(this.ctx, 120, 285, 10, -165, 370, 10, 0.7),
//       // new Circle(this.ctx, 140, 290, 10, 125, 230, 10, 0.7),
//       // new Circle(this.ctx, 160, 380, 10, -175, -180, 10, 0.7),
//       // new Circle(this.ctx, 180, 310, 10, 115, 440, 10, 0.7),
//       // new Circle(this.ctx, 100, 310, 10, -195, -325, 10, 0.7),
//       // new Circle(this.ctx, 60, 150, 10, -138, 420, 10, 0.7),
//       // new Circle(this.ctx, 70, 430, 45, 135, -230, 45, 0.3),
//       // new Circle(this.ctx, 250, 290, 40, -140, 335, 40, 0.4),
//     ];

//     window.requestAnimationFrame(this.process.bind(this));
//   }

//   checkCollision() {
//     this.circles.forEach((circle) => (circle.colliding = false));

//     for (let i = 0; i < this.circles.length; i++) {
//       for (let j = i + 1; j < this.circles.length; j++) {
//         this.circles[i].checkCollideWith(this.circles[j]);
//       }
//     }
//   }

//   checkEdgeCollision() {
//     const cor = 0.8;
//     this.circles.forEach((circle) => {
//       if (circle.x < circle.r) {
//         circle.vx = -circle.vx * cor;
//         circle.x = circle.r;
//       } else if (circle.x > GAME_WIDTH - circle.r) {
//         circle.vx = -circle.vx * cor;
//         circle.x = GAME_WIDTH - circle.r;
//       }

//       if (circle.y < circle.r) {
//         circle.vy = -circle.vy * cor;
//         circle.y = circle.r;
//       } else if (circle.y > GAME_HEIGHT - circle.r) {
//         circle.vy = -circle.vy * cor;
//         circle.y = GAME_HEIGHT - circle.r;
//       }
//     });
//   }

//   process(now: number) {
//     if (!this.startTime) {
//       this.startTime = now;
//     }
//     let seconds = (now - this.startTime) / 1000;
//     this.startTime = now;

//     for (let i = 0; i < this.circles.length; i++) {
//       this.circles[i].update(seconds);
//     }

//     this.checkEdgeCollision();
//     this.checkCollision();

//     this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

//     for (let i = 0; i < this.circles.length; i++) {
//       this.circles[i].draw();
//     }

//     window.requestAnimationFrame(this.process.bind(this));
//   }
// }

// const game = new Gameboard();
