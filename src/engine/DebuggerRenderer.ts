import { BaseObject } from "./components/objects";
import { GameRenderer } from "./GameRenderer";

export function renderDebugger(renderer: GameRenderer, object: BaseObject) {
  renderPositionDebugger(renderer, object);
  renderVelocityDebugger(renderer, object);
  renderShapeDebugger(renderer, object);
}

function renderVelocityDebugger(renderer: GameRenderer, object: BaseObject) {
  renderer.api.beginPath();
  renderer.api.moveTo(
    object.shape.transform.position.x,
    object.shape.transform.position.y
  );
  renderer.api.lineTo(
    object.shape.transform.position.x + object.attributes.velocity.x * 5,
    object.shape.transform.position.y + object.attributes.velocity.y * 5
  );
  renderer.api.strokeStyle = "white";
  renderer.api.stroke();
}

function renderPositionDebugger(renderer: GameRenderer, object: BaseObject) {
  renderer.api.beginPath();
  renderer.api.arc(
    object.shape.transform.position.x,
    object.shape.transform.position.y,
    3,
    0,
    2 * Math.PI
  );
  renderer.api.lineWidth = 1;
  renderer.api.strokeStyle = "white";
  renderer.api.stroke();

  renderer.api.font = "10px Arial";
  renderer.api.fillStyle = "#ffffff63";
  renderer.api.fillText(
    `${String(object.shape.transform.position.x).slice(0, 6)}, ${String(
      object.shape.transform.position.y
    ).slice(0, 6)}`,
    object.shape.transform.position.x + 10,
    object.shape.transform.position.y
  );
}

function renderShapeDebugger(renderer: GameRenderer, object: BaseObject) {
  switch (object.shape.type) {
    case "circle": {
      renderer.api.beginPath();
      renderer.api.arc(
        object.shape.centerPosition.x,
        object.shape.centerPosition.y,
        object.shape.radius,
        0,
        2 * Math.PI
      );
      renderer.api.lineWidth = 1;
      renderer.api.strokeStyle = object.isColliding ? "#ff0000" : "white";
      renderer.api.stroke();

      break;
    }
    case "rect": {
      renderer.api.lineWidth = 1;
      renderer.api.strokeStyle = object.isColliding ? "#ff0000" : "white";
      renderer.api.strokeRect(
        object.shape.transform.position.x,
        object.shape.transform.position.y,
        object.shape.width,
        object.shape.height
      );
    }
  }
}
