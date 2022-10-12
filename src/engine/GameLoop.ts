import type { Game } from "./Game";

export class GameLoop {
  private prevTimestamp: number;
  private secondsPassed: number;
  fps: number;

  constructor(private game: Game) {
    this.prevTimestamp = 0;
    this.secondsPassed = 0;
    this.fps = 0;
  }

  start = (timestamp: number): void => {
    const { renderer, world } = this.game;
    if (!world) {
      throw new Error("World is missing");
    }

    this.calcFps(timestamp);
    renderer.api.clearRect(0, 0, renderer.screenWidth, renderer.screenHeight);
    world.update();
    world.render(renderer);
    requestAnimationFrame(this.start);
  };

  stop = (): void => {
    //TODO:
  };

  private calcFps = (timestamp: number) => {
    this.secondsPassed = (timestamp - this.prevTimestamp) / 1000;
    this.prevTimestamp = timestamp;
    this.fps = Math.round(1 / this.secondsPassed);
  };
}
