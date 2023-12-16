import * as PIXI from 'pixi.js';
import Engine from "./Engine";
import Layer from "./Layer";

export default class Scene {
  engine: Engine;
  id: string;
  pixi: PIXI.Container;
  layers: string[];
  
  constructor(engine: Engine) {
    this.engine = engine;
    this.id = `Scene_${engine._counter++}`;
    this.pixi = new PIXI.Container();
    this.pixi.visible = false;
    this.layers = [];
  }

  update(delta: number) {
    this.layers.forEach((layerId) => {
      this.engine.layers[layerId]?.update(delta);
    });
  }

  render(delta: number) {

  }

  addLayer(layer: Layer) {
    // Add to pixi context if possible
    if (layer.pixi) {
      this.pixi.addChild(layer.pixi);
    }
    // add to Engine context
    this.layers.push(layer.id);
    if (!this.engine.layers.hasOwnProperty(layer.id)) {
      this.engine.layers[layer.id] = layer;
    }
  }
}