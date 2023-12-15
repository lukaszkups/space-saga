import Engine from "./Engine";
import Sprite from "./Sprite";
import Position from "./helpers/Position";
import arePolygonsIntersecting from "./helpers/axisTheorem";
import { Keyable, Polygon } from "./types";

export interface EntityPayload {
  name?: string;
  position?: Position;
  bindToLayer?: boolean;
  width?: number;
  height?: number;
  shape?: Polygon;
}

export default class Entity {
  engine: Engine;
  id: number;
  name: string;
  position: Position;
  props: Keyable;
  bindToLayer: boolean;
  width?: number;
  height?: number;
  shape?: Polygon;

  constructor(engine: Engine, entity: EntityPayload) {
    this.engine = engine;
    this.id = engine._counter++;
    this.name = entity.name || `Entity_${this.id}`;
    this.position = entity.position || new Position(0, 0);
    this.props = {};
    this.bindToLayer = entity.bindToLayer || false;
    this.width = entity.width;
    this.height = entity.height;
    this.shape = entity.shape;
    // if width && height is defined but no shape, then create polygon shape with relative points to Entity
    if (!this.shape && this.width && this.height) {
      this.shape = [
        [0, 0], // top-left point
        [this.width, 0], // top-right point
        [this.width, this.height], // bottom-right point (this and point below are in such order to have 4-point polygon look like square)
        [0, this.height] //bottom-left
      ];
    }
    if(this.engine.log) {
      console.info('New Entity Created:', this);
    }
  }

  collides(entityId: number) {
    const entity = this.engine.entities[entityId];
    if (this.shape && this.shape.length && entity && entity.shape?.length) {
      return arePolygonsIntersecting(this.shape, entity.shape)
    }
    return false;
  }

  update(progress: number, timeElapsed: number) {}

  render() {}
}
