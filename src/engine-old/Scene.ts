import Engine from "./Engine";
import SceneLayer from "./SceneLayer";

export default class Scene {
  engine: Engine;
  id: number;
  name: string;
  layerOrder: number[];

  constructor(engine: Engine, name: string) {
    this.engine = engine;
    this.id = this.engine._counter++;
    this.name = name;
    this.layerOrder = [];
    if (this.engine.log) {
      console.info('Scene created:', this);
    }
  }

  addLayer(layer: SceneLayer) {
    this.engine.layers[layer.id] = layer;
    this.layerOrder.push(layer.id);
  }

  // removeLayer(layerName: string) {
  //   if (this.layers[layerName]) {
  //     // Remove all related entites from other places e.g. Engine
  //     this.layers[layerName].removeEntities();
  //     // Remove layerId from layerOrder array
  //     const layerOrderIndex = this.layerOrder.findIndex((id) => id === this.layers[layerName].id);
  //     if (layerOrderIndex > -1) {
  //       this.layerOrder.splice(layerOrderIndex, 1);
  //     }
  //     // Finally, remove layer
  //     if (this.engine.log) {
  //       console.info('Layer removed: ', layerName, this.layers[layerName]);
  //     }
  //     delete this.layers[layerName];
  //   }
  // }

  update(progress: number, timeElapsed: number) {
    this.layerOrder.forEach((layerId) => {
      this.engine.layers[layerId]?.update(progress, timeElapsed);
    });
  }
  
  render() {
    this.layerOrder.forEach((layerId) => {
      this.engine.layers[layerId]?.render();
    });
  }
}
