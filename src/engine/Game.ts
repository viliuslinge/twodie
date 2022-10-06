import { GameRenderer } from "./GameRenderer";
import { GameLoop } from "./GameLoop";
import { World } from "./World";
import { EventObserver } from "./EventObserver";
import { IGameEvents } from "./types";

interface IGameProperties {
  rootElementID: string;
}

export class Game {
  private loop: GameLoop;
  events: EventObserver<IGameEvents>;
  renderer: GameRenderer;
  world?: World;
  isDebugMode: boolean;

  constructor(properties: IGameProperties) {
    this.events = new EventObserver();
    this.loop = new GameLoop(this);
    this.renderer = new GameRenderer({
      rootElementID: properties.rootElementID,
    });
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
