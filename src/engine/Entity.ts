import Engine from "./Engine";
import Sprite from "./Sprite";
import { Keyable, Pin, Polygon } from "./types";

export default class Entity {
  engine: Engine;
  id: number;
  name: string;
  x: number;
  y: number;
  props: Keyable;
  pins: Pin;
  bindToLayer: boolean;

  constructor(engine: Engine, entity: Entity) {
    this.engine = engine;
    this.id = engine._counter++;
    this.name = entity.name;
    this.x = entity.x || 0;
    this.y = entity.y || 0;
    this.props = {};
    this.pins = entity.pins || [];
    this.bindToLayer = entity.bindToLayer || false;
    if(this.engine.log) {
      console.info('New Entity Created:', this);
    }
  }

  addPin (pinName: string, pin: Polygon | Entity | Sprite) {
    this.pins[pinName] = pin;
    if(this.engine.log) {
      console.info(`Pin added to: ${this.name}: ${pinName}:`, pin);
    }
  }
  removePin (pinName: string) {
    if(this.engine.log) {
      console.info(`Pin removed from: ${this.name}: ${pinName}:`, this.pins[pinName]);
    }
    delete this.pins[pinName];
  }

  update(progress: number) {
    // this.updateMovement(progress)
  }

  // updateMovement(progress: number) {

  // }

  render() {

  }
}
