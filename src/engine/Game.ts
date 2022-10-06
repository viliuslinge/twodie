import { GameRenderer } from "./GameRenderer";
import { GameLoop } from "./GameLoop";
import { World } from "./World";

interface IGameProperties {
  rootElementID: string;
}

export class Game {
  private loop: GameLoop;
  renderer: GameRenderer;
  world?: World;
  isDebugMode: boolean;

  constructor(properties: IGameProperties) {
    this.renderer = new GameRenderer({
      rootElementID: properties.rootElementID,
    });
    this.loop = new GameLoop(this);
    this.isDebugMode = false;
  }

  start = (): void => {
    requestAnimationFrame(this.loop.start);
  };

  stop = (): void => {
    //TODO:
  };

  setWorld = (world: World): void => {
    this.world = world;
  };

  setDebugMode = (value: boolean): void => {
    this.isDebugMode = value;
  };
}
