import * as PIXI from 'pixi.js';
import { Keyable } from './types';
import Scene from './Scene';
import Layer from './Layer';
import Entity from './Entity';
import Loop from './Loop';

export interface EnginePayload {
  width?: number;
  height?: number;
}

export default class Engine {
  _counter: number;
  width: number;
  height: number;
  pixi: PIXI.Application;
  entities: Keyable<Entity>;
  scenes: Keyable<Scene>;
  layers: Keyable<Layer>;
  activeScene?: string;
  loop: Loop;

  constructor(payload?: EnginePayload) {
    this._counter = 1;
    this.entities = {};
    this.scenes = {};
    this.layers = {};
    this.width = payload?.width || 320;
    this.height = payload?.height || 180;
    this.pixi = new PIXI.Application({ width: this.width, height: this.height }) as PIXI.Application;
    this.loop = new Loop(this);
    // @ts-ignore-next-line
    window.engine = this.pixi;
  }

  mount(element: HTMLElement = document.body) {
    if (element) {
      element.appendChild(this.pixi.view as unknown as Node);
    }
  }

  addScene(scene: Scene) {
    if (!this.scenes.hasOwnProperty(scene.id)) {
      this.scenes[scene.id] = scene;
    }
  }

  setActiveScene(sceneId: string) {
    // find previously active scene
    if (this.activeScene && this.scenes.hasOwnProperty(this.activeScene)) {
      this.scenes[this.activeScene].pixi.visible = false;
    }
    // activate new scene
    this.activeScene = sceneId;
    if (this.scenes.hasOwnProperty(sceneId)) {
      this.scenes[sceneId].pixi.visible = true;
    }
  }

  addEntity(entity: Entity) {
    if (!this.entities.hasOwnProperty(entity.id)) {
      this.entities[entity.id] = entity;
    }
  }
}
