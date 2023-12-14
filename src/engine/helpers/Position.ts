import { Polygon } from "../types";

export default class Position {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

export const getRelativePolygon = (position: Position, polygon: Polygon): Polygon => {
  return polygon.map((point: [number, number]) => ([ position.x + point[0], position.y + point[1] ]));
}
