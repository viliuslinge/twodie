export function createCanvas(
  width: number,
  height: number
): { ctx: CanvasRenderingContext2D } {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Root element could not be found");
  }

  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", `${width}px`);
  canvas.setAttribute("height", `${height}px`);
  canvas.style.border = "1px solid black";

  root.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context could not be found");
  }

  return {
    ctx,
  };
}
