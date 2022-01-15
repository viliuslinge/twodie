export type IGameRenderer = CanvasRenderingContext2D;

export function createGameRenderer(
  width: number,
  height: number
): IGameRenderer {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Missing root element");
  }

  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", `${width}px`);
  canvas.setAttribute("height", `${height}px`);
  canvas.style.border = "1px solid black";

  root.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Missing canvas element");
  }

  return ctx;
}
