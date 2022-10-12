import type { IKeyboardHandler } from "engine/KeyboardHandler";

import type { Hero } from "./Hero";

type IKeys = "down" | "up" | "left" | "right";

export class HeroKeyboardHandler implements IKeyboardHandler {
  private keys: Record<IKeys, boolean>;

  constructor(private object: Hero) {
    this.keys = {
      down: false,
      up: false,
      left: false,
      right: false,
    };
  }

  enable = (): void => {
    document.addEventListener("keydown", this.registerKeyDown);
    document.addEventListener("keyup", this.registerKeyUp);
  };

  disable = (): void => {
    document.removeEventListener("keydown", this.registerKeyDown);
    document.removeEventListener("keyup", this.registerKeyUp);
  };

  private registerKeyDown = (e: KeyboardEvent): void => {
    switch (e.key) {
      case "ArrowLeft": {
        this.keys.left = true;
        break;
      }
      case "ArrowRight": {
        this.keys.right = true;
        break;
      }
      case "ArrowUp": {
        this.keys.up = true;
        break;
      }
      case "ArrowDown": {
        this.keys.down = true;
        break;
      }
    }

    this.handleKeyDown();
  };

  private registerKeyUp = (e: KeyboardEvent): void => {
    this.handleKeyUp();

    switch (e.key) {
      case "ArrowLeft": {
        this.keys.left = false;
        break;
      }
      case "ArrowRight": {
        this.keys.right = false;
        break;
      }
      case "ArrowUp": {
        this.keys.up = false;
        break;
      }
      case "ArrowDown": {
        this.keys.down = false;
        break;
      }
    }
  };

  private handleKeyDown = (): void => {
    if (this.keys.down) {
      this.object.moveS();
    }

    if (this.keys.up) {
      this.object.moveN();
    }

    if (this.keys.left) {
      this.object.moveW();
    }

    if (this.keys.right) {
      this.object.moveE();
    }

    if (this.keys.down && this.keys.right) {
      this.object.moveSE();
    }

    if (this.keys.down && this.keys.left) {
      this.object.moveSW();
    }

    if (this.keys.up && this.keys.right) {
      this.object.moveNE();
    }

    if (this.keys.up && this.keys.left) {
      this.object.moveNW();
    }
  };

  private handleKeyUp = (): void => {
    if (this.keys.down) {
      this.object.stopS();
    }

    if (this.keys.up) {
      this.object.stopN();
    }

    if (this.keys.left) {
      this.object.stopW();
    }

    if (this.keys.right) {
      this.object.stopE();
    }

    if (this.keys.down && this.keys.right) {
      this.object.stopSE();
    }

    if (this.keys.down && this.keys.left) {
      this.object.stopSW();
    }

    if (this.keys.up && this.keys.right) {
      this.object.stopNE();
    }

    if (this.keys.up && this.keys.left) {
      this.object.stopNW();
    }
  };
}
