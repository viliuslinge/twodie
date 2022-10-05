export type IGameRenderer = CanvasRenderingContext2D;

interface IGameRendererProperties {
  width: number;
  height: number;
}

export function createGameRenderer(
  input: IGameRendererProperties
): IGameRenderer {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Missing root element");
  }

  const canvas = document.createElement("canvas");
  canvas.width = input.width;
  canvas.height = input.height;

  root.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Missing canvas element");
  }

  return ctx;
}
