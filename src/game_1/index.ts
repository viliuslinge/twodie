import { Game } from "engine/Game";
import { World } from "engine/World";

import { Hero } from "./objects/Hero";
import { Box } from "./objects/Box";

const GAME_WIDTH: number = 1200;
const GAME_HEIGHT: number = 900;

const game = new Game({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

const world = new World();
const hero = new Hero();
const box = new Box();

world.addObject(hero);
world.addObject(box);

game.setWorld(world);

export { game };
