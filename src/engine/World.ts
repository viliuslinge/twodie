import type { BaseObject } from "./components/objects";
import type { GameRenderer } from "./GameRenderer";
import { CollisionDetector } from "./CollisionDetector";
import type { Game } from "./Game";

export class World<T extends BaseObject = BaseObject> {
  objects: Map<string, T>;
  game: Game;

  constructor(game: Game) {
    this.game = game;
    this.objects = new Map();
  }

  addObject = (object: T): void => {
    this.objects.set(object.id, object);
    this.fireObjectCountChangedEvent();
  };

  removeObject = (id: string): void => {
    this.objects.delete(id);
    this.fireObjectCountChangedEvent();
  };

  resetObjects = (objects?: Map<string, T>): void => {
    this.objects = objects ?? new Map();
  };

  update = (): void => {
    this.objects.forEach((it) => it.update());
    CollisionDetector.detect(Array.from(this.objects.values()));
  };

  render = (renderer: GameRenderer): void => {
    this.objects.forEach((it) => {
      it.render(renderer);
      this.game.debugger.renderObjectMarkers(it);
    });

    this.game.debugger.renderGameMarkers();
    this.game.events.fire("rendered", {});
  };

  private fireObjectCountChangedEvent = () => {
    this.game.events.fire("object-count-changed", {
      count: Array.from(this.objects.values()).length,
    });
  };
}
