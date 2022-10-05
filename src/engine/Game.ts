import { createGameRenderer, IGameRenderer } from "./GameRenderer";
import { GameLoop } from "./GameLoop";
import { World } from "./World";

import "./index.css";

interface IGameProperties {
  width: number;
  height: number;
}

export const DEBUG_MODE: boolean = false;

export class Game {
  private gameLoop: GameLoop;
  properties: IGameProperties;
  renderer: IGameRenderer;
  world?: World;

  constructor(properties?: Partial<IGameProperties>) {
    this.properties = {
      width: properties?.width ?? window.innerWidth,
      height: properties?.height ?? window.innerHeight,
    };
    this.renderer = createGameRenderer({
      width: this.properties.width,
      height: this.properties.height,
    });
    this.gameLoop = new GameLoop(this);
  }

  start = (): void => {
    requestAnimationFrame(this.gameLoop.start);
  };

  stop = (): void => {
    //TODO:
  };

  setWorld = (world: World): void => {
    this.world = world;
  };
}
