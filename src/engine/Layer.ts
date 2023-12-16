import * as PIXI from 'pixi.js';
import Engine from "./Engine";
import Entity from './Entity';

export default class Layer {
  engine: Engine;
  id: string;
  pixi: PIXI.Container;
  entities: string[];

  constructor(engine: Engine) {
    this.engine = engine;
    this.id = `Layer_${engine._counter++}`;
    this.pixi = new PIXI.Container();
    this.entities = [];
  }

  update(delta: number) {
    this.entities.forEach((entityId: string) => this.engine.entities[entityId]?.update(delta));
  }

  render(delta: number) {

  }

  addEntity(entity: Entity) {
    // Add to pixi context if possible
    if (entity.pixi) {
      this.pixi.addChild(entity.pixi);
    }
    // add to Engine context
    this.entities.push(entity.id);
    if (!this.engine.entities.hasOwnProperty(entity.id)) {
      this.engine.entities[entity.id] = entity;
    }
  }
}