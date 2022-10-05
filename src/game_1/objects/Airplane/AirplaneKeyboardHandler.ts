import { IKeyboardHandler } from "engine/KeyboardHandler";

import { Airplane } from "./Airplane";

export class AirplaneKeyboardHandler implements IKeyboardHandler {
  constructor(private object: Airplane) {}

  enable = (): void => {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  };

  disable = (): void => {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    switch (e.key) {
      case "ArrowLeft": {
        this.object.moveLeft();
        break;
      }
      case "ArrowRight": {
        this.object.moveRight();
        break;
      }
      case " ": {
        this.object.shot();
        break;
      }
    }
  };

  private handleKeyUp = (e: KeyboardEvent): void => {
    switch (e.key) {
      case "ArrowLeft": {
        this.object.stopLeft();
        break;
      }
      case "ArrowRight": {
        this.object.stopRight();
        break;
      }
    }
  };
}
