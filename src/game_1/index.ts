import { Game } from "engine/Game";
import { World } from "engine/World";

import { Airplane } from "./objects/Airplane";

const game = new Game();
const world = new World(game);
const airplane = new Airplane(world, {
  transform: {
    position: { x: game.properties.width / 2, y: game.properties.height - 200 },
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
