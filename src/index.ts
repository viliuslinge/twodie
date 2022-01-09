import { Game } from "./Game";
import { CircleObject, RectObject } from "./objects";

const GAME_WIDTH: number = 800;
const GAME_HEIGHT: number = 600;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.load([
  new CircleObject(250, 50, 0, 1),
  new RectObject(250, 300, 0, -1),
  new CircleObject(150, 0, 1, 1),
  new RectObject(250, 150, 1, 1),
  new CircleObject(350, 75, -1, 1),
  new RectObject(300, 300, 1, 0),
]);
game.start();
