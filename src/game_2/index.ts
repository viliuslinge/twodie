import { Game } from "engine/Game";
import { World } from "engine/World";
import type { BaseObject } from "engine/components/objects";
import type { ICoord } from "engine/shared";
import { CollisionDetector } from "engine/CollisionDetector";

import { Hero } from "./objects/Hero";
import { Ball } from "./objects/Ball";
import { getCoord } from "./utils";

import "./index.css";

export type IGameRenderer = "2d" | "webgl";
export interface IGameSettings {
  renderer: IGameRenderer;
  rootElementID: string;
}

function createHero(game: Game) {
  return new Hero(game.world!, {
    transform: {
      position: {
        x: game.renderer.screenWidth / 2 - 100,
        y: game.renderer.screenHeight / 2 - 100,
      },
      scale: 1,
    },
    attributes: {
      velocity: { x: 0, y: 0 },
      maxVelocity: 13,
      mass: 1,
      friction: 1,
      restitution: 1,
    },
  });
}

function createBall(game: Game) {
  return new Ball(game.world!, {
    transform: {
      position: {
        x: 0,
        y: 0,
      },
      scale: 1,
    },
    attributes: {
      velocity: { x: 0, y: 0 },
      maxVelocity: 1,
      mass: 2,
      friction: 0.97,
      restitution: 1,
    },
  });
}

function populateBalls(game: Game, hero: BaseObject) {
  const balls = [createBall(game)];
  let coord: ICoord | undefined = {
    x: 0,
    y: 0,
  };

  while (coord) {
    const ball = createBall(game);
    const prevBall = balls[balls.length - 1];
    coord = getCoord(
      {
        width: game.renderer.screenWidth,
        height: game.renderer.screenHeight,
      },
      hero,
      ball,
      prevBall
    );

    if (!coord) break;

    const delta = {
      x: ball.shape.transform.position.x - ball.sprite.transform.position.x,
      y: ball.shape.transform.position.y - ball.sprite.transform.position.y,
    };

    ball.shape.transform.setPosition({
      x: coord.x,
      y: coord.y,
    });

    ball.sprite.transform.setPosition({
      x: coord.x - delta.x,
      y: coord.y - delta.y,
    });

    balls.push(ball);
  }

  return balls;
}

export function createGame(input: IGameSettings): Game {
  const game = new Game({ rootElementID: input.rootElementID });
  const world = new World(game);

  game.setWorld(world);
  game.debugger.updateProperties({
    ...game.debugger.properties,
    showGameStats: true,
  });

  const hero = createHero(game);
  const balls = populateBalls(game, hero);

  world.addObject(hero);
  balls.forEach((it) => {
    if (!CollisionDetector.checkIntersection(it.shape, hero.shape)) {
      world.addObject(it);
    }
  });

  return game;
}
