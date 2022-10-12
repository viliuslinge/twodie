import { GameRenderer } from "./GameRenderer";
import { GameLoop } from "./GameLoop";
import type { World } from "./World";
import { EventObserver } from "./EventObserver";
import type { IGameEvents } from "./types";
import { Debugger } from "./Debugger";

interface IGameProperties {
  rootElementID: string;
}

export class Game {
  events: EventObserver<IGameEvents>;
  loop: GameLoop;
  renderer: GameRenderer;
  debugger: Debugger;
  world?: World;

  constructor(properties: IGameProperties) {
    this.events = new EventObserver();
    this.renderer = new GameRenderer({
      rootElementID: properties.rootElementID,
    });
    this.loop = new GameLoop(this);
    this.debugger = new Debugger(this);
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
}
