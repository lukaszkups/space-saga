import Engine from "./Engine";
import Sprite from "./Sprite";
import Position from "./helpers/Position";
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
        [0, 0],
        [this.width, 0],
        [0, this.height],
        [this.width, this.height]
      ];
    }
    if(this.engine.log) {
      console.info('New Entity Created:', this);
    }
  }

  update(progress: number, timeElapsed: number) {
    // this.updateMovement(progress)
  }

  // updateMovement(progress: number) {

  // }

  render() {
    // console.log(999)
  }
}
