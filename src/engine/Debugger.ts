import type { BaseObject } from "./components/objects";
import type { GameRenderer } from "./GameRenderer";
import type { Game } from "./Game";

interface IDebuggerProperties {
  showGameStats: boolean;
  showObjectVelocity: boolean;
  showObjectPosition: boolean;
  showObjectCollision: boolean;
  showObjectShape: boolean;
}

export class Debugger {
  properties: IDebuggerProperties;

  constructor(private game: Game) {
    this.properties = {
      showGameStats: false,
      showObjectVelocity: false,
      showObjectPosition: false,
      showObjectCollision: false,
      showObjectShape: false,
    };
  }

  updateProperties = (properties: IDebuggerProperties): void => {
    this.properties = properties;
  };

  renderObjectMarkers = (object: BaseObject) => {
    if (this.properties.showObjectVelocity) {
      drawObjectVelocityMarker(this.game.renderer, object);
    }

    if (this.properties.showObjectPosition) {
      drawObjectPositionMarker(this.game.renderer, object);
    }

    if (this.properties.showObjectShape) {
      drawObjectShapeMarker(this.game.renderer, object);
    }

    if (this.properties.showObjectCollision) {
      drawObjectCollisionMarker(this.game.renderer, object);
    }
  };

  renderGameMarkers = () => {
    if (this.properties.showGameStats) {
      drawGameStatsMarker(this.game);
    }
  };
}

function drawGameStatsMarker(game: Game) {
  function drawText(text: string, x: number, y: number) {
    game.renderer.api.font = "20px Sans-serif";
    game.renderer.api.strokeStyle = "white";
    game.renderer.api.lineWidth = 8;
    game.renderer.api.strokeText(text, x, y);
    game.renderer.api.fillStyle = "black";
    game.renderer.api.fillText(text, x, y);
  }

  drawText(
    `object count: ${Array.from(game.world!.objects.values()).length}`,
    20,
    30
  );
  drawText(`fps: ${game.loop.fps}`, 20, 55);
}

function drawObjectPositionMarker(renderer: GameRenderer, object: BaseObject) {
  renderer.api.font = "10px Arial";
  renderer.api.fillStyle = "#00000063";
  renderer.api.fillText(
    `${String(object.shape.transform.position.x).slice(0, 6)}, ${String(
      object.shape.transform.position.y
    ).slice(0, 6)}`,
    object.shape.transform.position.x + 10,
    object.shape.transform.position.y
  );
}

function drawObjectVelocityMarker(renderer: GameRenderer, object: BaseObject) {
  renderer.api.beginPath();
  renderer.api.arc(
    object.shape.transform.position.x,
    object.shape.transform.position.y,
    3,
    0,
    2 * Math.PI
  );
  renderer.api.lineWidth = 1;
  renderer.api.strokeStyle = "black";
  renderer.api.stroke();

  renderer.api.beginPath();
  renderer.api.moveTo(
    object.shape.transform.position.x,
    object.shape.transform.position.y
  );
  renderer.api.lineTo(
    object.shape.transform.position.x + object.attributes.velocity.x * 5,
    object.shape.transform.position.y + object.attributes.velocity.y * 5
  );
  renderer.api.strokeStyle = "black";
  renderer.api.lineWidth = 1;
  renderer.api.stroke();
}

function drawObjectCollisionMarker(renderer: GameRenderer, object: BaseObject) {
  if (object.isColliding) {
    drawObjectShapeMarker(renderer, object, "#ff0000");
  }
}

function drawObjectShapeMarker(
  renderer: GameRenderer,
  object: BaseObject,
  color?: string
) {
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
      renderer.api.strokeStyle = color ?? "#21f328";
      renderer.api.stroke();

      break;
    }
    case "rect": {
      renderer.api.lineWidth = 1;
      renderer.api.strokeStyle = color ?? "#21f328";
      renderer.api.strokeRect(
        object.shape.transform.position.x,
        object.shape.transform.position.y,
        object.shape.width,
        object.shape.height
      );
    }
  }
}
