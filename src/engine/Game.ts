import { createGameRenderer, IGameRenderer } from "./GameRenderer";
import { GameLoop } from "./GameLoop";
import { World } from "./World";

interface IGameProperties {
  width: number;
  height: number;
}

export const DEBUG_MODE: boolean = true;

export class Game {
  private gameLoop: GameLoop;
  renderer: IGameRenderer;
  world?: World;

  constructor(public properties: IGameProperties) {
    this.properties = properties;
    this.renderer = createGameRenderer(
      this.properties.width,
      this.properties.height
    );
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
