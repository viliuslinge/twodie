import { Game } from "./Game";

export class GameLoop {
  constructor(private game: Game) {}

  start = (): void => {
    const { renderer, world, properties } = this.game;

    renderer.clearRect(0, 0, properties.width, properties.height);
    world.update();
    world.render(renderer);

    requestAnimationFrame(this.start);
  };

  stop = (): void => {
    //TODO:
  };
}
