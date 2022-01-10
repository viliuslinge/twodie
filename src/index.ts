import { Game } from "./Game";
import { FirstActor, SecondActor } from "./actors";
import { RectShape, CircleShape } from "./shapes";

const GAME_WIDTH: number = 800;
const GAME_HEIGHT: number = 600;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);

const actor1 = new FirstActor(game, {
  maxVelocity: 5,
  positionX: 250,
  positionY: 300,
  velocityX: 0,
  velocityY: -1,
});

actor1.setShape(
  new RectShape(actor1, {
    positionX: 0,
    positionY: 0,
    width: 50,
    height: 50,
    isOverlapEnabled: false,
  })
);

const actor2 = new FirstActor(game, {
  maxVelocity: 5,
  positionX: 150,
  positionY: 0,
  velocityX: 1,
  velocityY: 1,
});

actor2.setShape(
  new RectShape(actor2, {
    positionX: 0,
    positionY: 0,
    width: 50,
    height: 50,
    isOverlapEnabled: false,
  })
);

const actor3 = new FirstActor(game, {
  maxVelocity: 5,
  positionX: 250,
  positionY: 150,
  velocityX: 1,
  velocityY: 1,
});

actor3.setShape(
  new RectShape(actor3, {
    positionX: -25,
    positionY: -25,
    width: 100,
    height: 100,
    isOverlapEnabled: false,
  })
);

const actor4 = new FirstActor(game, {
  maxVelocity: 5,
  positionX: 350,
  positionY: 75,
  velocityX: -1,
  velocityY: 1,
});

actor4.setShape(
  new RectShape(actor4, {
    positionX: 0,
    positionY: 0,
    width: 100,
    height: 100,
    isOverlapEnabled: false,
  })
);

const actor5 = new SecondActor(game, {
  maxVelocity: 5,
  positionX: 10,
  positionY: 10,
  velocityX: 2,
  velocityY: 2,
});

actor5.setShape(
  new CircleShape(actor5, {
    positionX: 0,
    positionY: 0,
    radius: 50,
    isOverlapEnabled: false,
  })
);

game.loadActors([actor1, actor2, actor3, actor4, actor5]);
game.start();
