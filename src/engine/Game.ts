import { createGameRenderer, IGameRenderer } from "./GameRenderer";
import { GameLoop } from "./GameLoop";
import { World } from "./World";

interface IGameProperties {
  width: number;
  height: number;
}

export class Game {
  private gameLoop: GameLoop;
  renderer: IGameRenderer;

  constructor(public world: World, public properties: IGameProperties) {
    this.properties = properties;
    this.renderer = createGameRenderer(
      this.properties.width,
      this.properties.height
    );
    this.world = world;
    this.gameLoop = new GameLoop(this);
  }

  start = (): void => {
    requestAnimationFrame(this.gameLoop.start);
  };

  stop = (): void => {
    //TODO:
  };
}
