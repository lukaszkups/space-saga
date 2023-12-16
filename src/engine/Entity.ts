import * as PIXI from 'pixi.js';
import Engine from "./Engine";
import Position from "./Position";

export interface EntityPayload {
  x?: number;
  y?: number;
}

export default class Entity {
  engine: Engine;
  id: string;
  position: Position;
  // pixi: PIXI.Texture;

  constructor(engine: Engine, payload?: EntityPayload) {
    this.engine = engine;
    this.id = `Entity_${engine._counter++}`;
    this.position = new Position(payload?.x || 0 , payload?.y || 0);
  }
}