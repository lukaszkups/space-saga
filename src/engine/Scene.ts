import * as PIXI from 'pixi.js';
import Engine from "./Engine";

export default class Scene {
  engine: Engine;
  id: string;
  pixi: PIXI.Container;
  layers: [];
  
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
}