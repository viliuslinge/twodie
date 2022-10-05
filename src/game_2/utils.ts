export function genArray(length: number): number[] {
  return Array.from(Array(length).keys());
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomCoord(input: {
  maxX: number;
  maxY: number;
  except: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}): { x: number; y: number } {
  let result = { x: getRandomInt(input.maxX), y: getRandomInt(input.maxY) };

  if (
    result.x > input.except.x &&
    result.x < input.except.x + input.except.width &&
    result.y > input.except.y &&
    result.y < input.except.y + input.except.height
  ) {
    result = getRandomCoord(input);
  }

  return result;
}
