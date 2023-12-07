import Position from "./Position";

export const getRandomCoordinates = (canvasWidth: number, canvasHeight: number, radius: number, minDistance: number, existingCoords: Position[]): Position => {
  try {
    let x: number, y: number;
    do {
      x = Math.random() * (canvasWidth - 2 * radius) + radius;
      y = Math.random() * (canvasHeight - 2 * radius) + radius;
    } while (existingCoords.some(circle => Math.hypot(circle.x - x, circle.y - y) < minDistance));

    return { x, y };
  } catch (err) {
    throw new Error('Couldn\'t get random coordinates');
  }
}
