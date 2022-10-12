import { Game } from "engine/Game";
import { World } from "engine/World";

import { Airplane } from "./objects/Airplane";

import "./index.css";

const game = new Game({ rootElementID: "root" });
const world = new World(game);
const airplane = new Airplane(world, {
  transform: {
    position: {
      x: game.renderer.screenWidth / 2,
      y: game.renderer.screenHeight - 200,
    },
    scale: 1,
  },
  attributes: {
    velocity: { x: 0, y: 0 },
    maxVelocity: 8,
    mass: 2,
    friction: 1,
    restitution: 1,
  },
});

world.addObject(airplane);
game.setWorld(world);

export { game };
