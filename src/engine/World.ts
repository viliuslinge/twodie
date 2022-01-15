import { BaseObject } from "./components/objects";
import { IGameRenderer } from "./GameRenderer";
import { CollisionDetector } from "./CollisionDetector";
import { DEBUG_MODE } from "./Game";

export class World<T extends BaseObject = BaseObject> {
  private _objects: Map<string, T>;

  constructor() {
    this._objects = new Map();
  }

  addObject = (object: T): void => {
    this._objects.set(object.id, object);
  };

  removeObject = (id: string): void => {
    this._objects.delete(id);
  };

  update = (): void => {
    this.objects.forEach((a) => a.update());
    CollisionDetector.detect(this.objects);
  };

  render = (renderer: IGameRenderer): void => {
    this.objects.forEach((a) => {
      a.render(renderer);

      if (DEBUG_MODE) {
        a.renderDebug(renderer);
        a.shape.renderDebug(renderer, { isColliding: a.isColliding });
      }
    });
  };

  get objects(): T[] {
    return Array.from(this._objects.values());
  }
}
