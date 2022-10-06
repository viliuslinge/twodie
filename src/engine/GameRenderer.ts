interface IGameRendererProperties {
  rootElementID: string;
}

export class GameRenderer {
  private canvas: HTMLCanvasElement;
  api: CanvasRenderingContext2D;

  constructor(properties: IGameRendererProperties) {
    const root = document.getElementById(properties.rootElementID);
    if (!root) {
      throw new Error("Missing root element");
    }

    const canvas = document.createElement("canvas");
    canvas.width = root.clientWidth;
    canvas.height = root.clientHeight;

    root.appendChild(canvas);

    const api = canvas.getContext("2d");
    if (!api) {
      throw new Error("Missing canvas element");
    }

    this.canvas = canvas;
    this.api = api;
  }

  get screenWidth(): number {
    return this.canvas.clientWidth;
  }

  get screenHeight(): number {
    return this.canvas.clientHeight;
  }
}
