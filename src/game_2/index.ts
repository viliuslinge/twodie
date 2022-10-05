import { Game } from "engine/Game";
import { World } from "engine/World";

import { Hero } from "./objects/Hero";
import { Box } from "./objects/Box";

const game = new Game();
const world = new World(game);
const hero = new Hero(world, {
  transform: {
    position: { x: game.properties.width / 2, y: game.properties.height - 200 },
    scale: 4,
  },
  attributes: {
    velocity: { x: 0, y: 0 },
    maxVelocity: 13,
    mass: 2,
    friction: 1,
    restitution: 1,
  },
});

const box = new Box(world);

world.addObject(hero);
world.addObject(box);
game.setWorld(world);

export { game };
