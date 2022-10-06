import { Game } from "engine/Game";
import { World } from "engine/World";

import { Hero } from "./objects/Hero";
import { Obstacle } from "./objects/Obstacle";
import { genArray, getRandomCoord } from "./utils";

import "./index.css";

const game = new Game({ rootElementID: "root" });
const world = new World(game);
const hero = new Hero(world, {
  transform: {
    position: {
      x: game.renderer.screenWidth / 2 - 64,
      y: game.renderer.screenHeight / 2 - 64,
    },
    scale: 3,
  },
  attributes: {
    velocity: { x: 0, y: 0 },
    maxVelocity: 13,
    mass: 2,
    friction: 1,
    restitution: 1,
  },
});

world.addObject(hero);

genArray(2000).forEach(() => {
  world.addObject(
    new Obstacle(world, {
      transform: {
        position: getRandomCoord({
          maxX: game.renderer.screenWidth,
          maxY: game.renderer.screenHeight,
          except: {
            x: hero.shape.centerPosition.x - hero.shape.radius - 50,
            y: hero.shape.centerPosition.y - hero.shape.radius - 50,
            width: hero.shape.radius * 2 + 100,
            height: hero.shape.radius * 2 + 100,
          },
        }),
        scale: 1,
      },
      attributes: {
        velocity: { x: 0, y: 0 },
        maxVelocity: 5,
        mass: 5,
        friction: 0.996,
        restitution: 1,
      },
    })
  );
});

game.setWorld(world);
game.setDebugMode(true);

function renderButton() {
  const root = document.getElementById("root");
  if (!root) return;

  const button = document.createElement("button");
  button.classList.add("debugToggle");
  button.innerText = "TOGGLE DEBUGGER";
  button.onclick = () => {
    game.setDebugMode(!game.isDebugMode);
  };

  root.appendChild(button);
}

renderButton();

export { game };
