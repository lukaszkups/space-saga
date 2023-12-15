import Engine from "./Engine";
import Position from "./Position";

export interface EntityPayload {
  x?: number;
  y?: number;
}

export default class Entity {
  engine: Engine;
  id: number;
  position: Position;

  constructor(engine: Engine, payload?: EntityPayload) {
    this.engine = engine;
    this.id = engine.counter++;
    this.position = new Position(payload?.x || 0 , payload?.y || 0);
  }
}