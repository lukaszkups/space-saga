import Engine from "./Engine";
import Entity from "./Entity";

export interface LayerDetails {
  name: string;
  visible?: boolean;
}

export default class SceneLayer {
  engine: Engine;
  id: number;
  name: string;
  visible: boolean;
  entities: number[];
  // scene: Scene;

  constructor(engine: Engine, layerDetails: LayerDetails) {
    this.engine = engine;
    this.id = engine._counter++;
    this.name = layerDetails.name;
    this.visible = layerDetails.visible || false;
    this.entities = []
    // this.tiledBg = layerDetails.tiledBg || '';
    // this.scene = engine.scenes[layerDetails.parentSceneId];
    // this.scene.layerOrder.unshift(this.id);
    if (this.engine.log) {
      console.info('Created new Layer with config:', layerDetails);
    }
  }

  // destroy(layerName) {
  //   delete this.scene.layers[layerName];
  //   const layerIndex = this.scene.layerOrder.findIndex((layer) => layer.name === layerName);
  //   if (layerIndex > -1) {
  //     this.scene.layerOrder.splice(layerIndex, 1);
  //   }
  // }

  update(progress: number, timeElapsed: number) {
    this.entities.forEach((entityId: number) => this.engine.entities[entityId as number]?.update(progress, timeElapsed));
  }

  render() {
    // render entities of the layer
    this.entities.forEach((entityId) => {
      const entity = this.engine.entities[entityId];
      entity?.render();
    });
  }

  addEntity(entity: Entity) {
    this.engine.addEntity(entity);
    this.entities.push(entity.id);
  }
}