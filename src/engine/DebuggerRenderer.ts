import { BaseObject } from "./components/objects";
import { IGameRenderer } from "./GameRenderer";

export function renderDebugger(renderer: IGameRenderer, object: BaseObject) {
  renderPositionDebugger(renderer, object);
  renderVelocityDebugger(renderer, object);
  renderShapeDebugger(renderer, object);
}

function renderVelocityDebugger(renderer: IGameRenderer, object: BaseObject) {
  renderer.beginPath();
  renderer.moveTo(
    object.shape.transform.position.x,
    object.shape.transform.position.y
  );
  renderer.lineTo(
    object.shape.transform.position.x + object.attributes.velocity.x * 5,
    object.shape.transform.position.y + object.attributes.velocity.y * 5
  );
  renderer.strokeStyle = "white";
  renderer.stroke();
}

function renderPositionDebugger(renderer: IGameRenderer, object: BaseObject) {
  renderer.beginPath();
  renderer.arc(
    object.shape.transform.position.x,
    object.shape.transform.position.y,
    3,
    0,
    2 * Math.PI
  );
  renderer.lineWidth = 1;
  renderer.strokeStyle = "white";
  renderer.stroke();

  renderer.font = "10px Arial";
  renderer.fillStyle = "#ffffff63";
  renderer.fillText(
    `${String(object.shape.transform.position.x).slice(0, 6)}, ${String(
      object.shape.transform.position.y
    ).slice(0, 6)}`,
    object.shape.transform.position.x + 10,
    object.shape.transform.position.y
  );
}

function renderShapeDebugger(renderer: IGameRenderer, object: BaseObject) {
  switch (object.shape.type) {
    case "circle": {
      renderer.beginPath();
      renderer.arc(
        object.shape.centerPosition.x,
        object.shape.centerPosition.y,
        object.shape.radius,
        0,
        2 * Math.PI
      );
      renderer.lineWidth = 1;
      renderer.strokeStyle = object.isColliding ? "#ff0000" : "white";
      renderer.stroke();

      break;
    }
    case "rect": {
      renderer.lineWidth = 1;
      renderer.strokeStyle = object.isColliding ? "#ff0000" : "white";
      renderer.strokeRect(
        object.shape.transform.position.x,
        object.shape.transform.position.y,
        object.shape.width,
        object.shape.height
      );
    }
  }
}
