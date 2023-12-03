import Engine from "./Engine";
import Entity from "./Entity";

export interface LayerConfig {
  name: string;
}

export default class Layer {
  engine: Engine;
  id: number;
  name: string;
  entities: Entity[];

  constructor(engine: Engine, config: LayerConfig) {
    this.engine = engine;
    this.id = this.engine._counter++;
    this.name = config.name;
    this.entities = [];
    if (this.engine.log) {
      console.info('Layer created:', this);
    }
  }

  removeEntities() {
    this.entities.forEach((entity: Entity) => {
      if (entity.bindToLayer) {
        if (this.engine.log) {
          console.info('Entity removed from layer: ', this.name, entity);
        }
        delete this.engine.entities[entity.id];
      }
    });
  }
}