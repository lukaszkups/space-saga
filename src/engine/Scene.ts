import Engine from "./Engine";
import Layer from "./Layer";
import { KeyableLayer } from "./types";

export interface SceneConfig {
  id: number;
  name: string;
}

export default class Scene {
  engine: Engine;
  id: number;
  name: string;
  layers: KeyableLayer;
  layerOrder: number[];

  constructor(engine: Engine, config: SceneConfig) {
    this.engine = engine;
    this.id = this.engine._counter++;
    this.name = config.name;
    this.layers = {};
    this.layerOrder = [];
    if (this.engine.log) {
      console.info('Scene created:', this);
    }
  }

  addLayer(layer: Layer) {
    this.layers[layer.name] = layer;
    this.layerOrder.push(layer.id);
  }

  removeLayer(layerName: string) {
    if (this.layers[layerName]) {
      // Remove all related entites from other places e.g. Engine
      this.layers[layerName].removeEntities();
      // Remove layerId from layerOrder array
      const layerOrderIndex = this.layerOrder.findIndex((id) => id === this.layers[layerName].id);
      if (layerOrderIndex > -1) {
        this.layerOrder.splice(layerOrderIndex, 1);
      }
      // Finally, remove layer
      if (this.engine.log) {
        console.info('Layer removed: ', layerName, this.layers[layerName]);
      }
      delete this.layers[layerName];
    }
  }
}
