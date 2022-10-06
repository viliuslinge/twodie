import { Game } from "./Game";

export class GameLoop {
  constructor(private game: Game) {}

  start = (): void => {
    const { renderer, world } = this.game;

    if (!world) {
      throw new Error("World is missing");
    }

    renderer.api.clearRect(0, 0, renderer.screenWidth, renderer.screenHeight);
    world.update();
    world.render(renderer);

    requestAnimationFrame(this.start);
  };

  stop = (): void => {
    //TODO:
  };
}
