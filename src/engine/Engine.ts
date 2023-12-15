import * as PIXI from 'pixi.js';
import { Keyable } from './types';

export interface EnginePayload {
  width?: number;
  height?: number;
}

export default class Engine {
  _counter: number;
  width: number;
  height: number;
  pixiApp: PIXI.Application;
  entities: Keyable;
  scenes: Keyable;
  layers: Keyable;

  constructor(payload?: EnginePayload) {
    this._counter = 1;
    this.entities = {};
    this.scenes = {};
    this.layers = {};
    this.width = payload?.width || 320;
    this.height = payload?.height || 180;
    this.pixiApp = new PIXI.Application({ width: this.width, height: this.height }) as PIXI.Application;
    // @ts-ignore-next-line
    window.engine = this.pixiApp;
  }

  mount(element: HTMLElement = document.body) {
    if (element) {
      element.appendChild(this.pixiApp.view as unknown as Node);
    }
  }

  addScene(scene: Scene) {
    if (!this.scenes.hasOwnProperty(scene.id)) {
      this.scenes[scene.id] = scene;
    }
  }

  addEntity(entity: Entity) {
    if (!this.entities.hasOwnProperty(entity.id)) {
      this.entities[entity.id] = entity;
    }
  }
}
