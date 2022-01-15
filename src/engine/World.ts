import { IGameRenderer } from "./GameRenderer";
import { BaseObject } from "./components/objects";

export class World<T extends BaseObject = BaseObject> {
  objects: Map<string, T>;

  constructor() {
    this.objects = new Map();
  }

  addObject = (object: T): void => {
    this.objects.set(object.id, object);
  };

  removeObject = (id: string): void => {
    this.objects.delete(id);
  };

  update = (): void => {
    this.objects.forEach((a) => a.update());
    // detectCollisions(this.objects);
  };

  render = (renderer: IGameRenderer): void => {
    this.objects.forEach((a) => {
      a.render(renderer);
      a.shape.render(renderer);
    });
  };
}
