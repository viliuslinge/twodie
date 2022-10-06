import { BaseObject } from "./components/objects";
import { GameRenderer } from "./GameRenderer";
import { CollisionDetector } from "./CollisionDetector";
import { Game } from "./Game";
import { renderDebugger } from "./DebuggerRenderer";

export class World<T extends BaseObject = BaseObject> {
  private _objects: Map<string, T>;
  game: Game;

  constructor(game: Game) {
    this.game = game;
    this._objects = new Map();
  }

  addObject = (object: T): void => {
    this._objects.set(object.id, object);
    this.fireObjectCountChangedEvent();
  };

  removeObject = (id: string): void => {
    this._objects.delete(id);
    this.fireObjectCountChangedEvent();
  };

  update = (): void => {
    this.objects.forEach((it) => it.update());
    CollisionDetector.detect(this.objects);
  };

  render = (renderer: GameRenderer): void => {
    this.objects.forEach((it) => {
      it.render(renderer);

      if (this.game.isDebugMode) {
        renderDebugger(renderer, it);
      }
    });
  };

  get objects(): T[] {
    return Array.from(this._objects.values());
  }

  private fireObjectCountChangedEvent = () => {
    this.game.events.fire("object-count-changed", {
      count: this.objects.length,
    });
  };
}
