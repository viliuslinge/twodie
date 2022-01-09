import { Game } from "./Game";
import { CircleObject, RectObject } from "./objects";
import { HeroActor } from "./HeroActor";

const GAME_WIDTH: number = 800;
const GAME_HEIGHT: number = 600;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.load([
  new CircleObject({
    radius: 10,
    posX: 250,
    posY: 50,
    speedX: 0,
    speedY: 1,
  }),
  new RectObject({
    width: 30,
    height: 50,
    posX: 250,
    posY: 300,
    speedX: 0,
    speedY: -1,
  }),
  new CircleObject({
    radius: 60,
    posX: 150,
    posY: 0,
    speedX: 1,
    speedY: 1,
  }),
  new RectObject({
    width: 100,
    height: 30,
    posX: 250,
    posY: 150,
    speedX: 1,
    speedY: 1,
  }),
  new CircleObject({
    radius: 50,
    posX: 350,
    posY: 75,
    speedX: -1,
    speedY: 1,
  }),
  new RectObject({
    width: 50,
    height: 50,
    posX: 300,
    posY: 300,
    speedX: 1,
    speedY: 0,
  }),
  new HeroActor(game),
]);
game.start();
