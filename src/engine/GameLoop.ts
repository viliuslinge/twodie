import { Game } from "./Game";

export class GameLoop {
  constructor(private game: Game) {}

  start = (): void => {
    const { renderer, world, properties } = this.game;

    if (!world) {
      console.error("World is missing");
      return;
    }

    renderer.clearRect(0, 0, properties.width, properties.height);
    world.update();
    world.render(renderer);

    requestAnimationFrame(this.start);
  };

  stop = (): void => {
    //TODO:
  };
}
