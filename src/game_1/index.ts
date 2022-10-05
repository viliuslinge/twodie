import { Game } from "engine/Game";
import { World } from "engine/World";

import { Airplane } from "./objects/Airplane";

const GAME_WIDTH: number = 1200;
const GAME_HEIGHT: number = 900;

const game = new Game({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

const world = new World(game);
const airplane = new Airplane(world, {
  transform: {
    position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 200 },
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
