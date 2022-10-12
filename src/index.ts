import { createGame } from "./game_2";

const game = createGame({
  renderer: "2d",
  rootElementID: "root",
});
game.start();
