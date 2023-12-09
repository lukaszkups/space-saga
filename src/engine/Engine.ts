import Entity from "./Entity";
import GameLoop from "./GameLoop";
import Scene from "./Scene";
import { Keyable, KeyableEntity, KeyableLayer, KeyableScene } from "./types";
import { fontTypes } from './helpers/enums';

export interface EngineConfig {
  log?: boolean;
  width?: number;
  height?: number;
  fps?: number;
}

export interface CustomCanvasCtx extends CanvasRenderingContext2D {
  letterSpacing: string;
}

export default class Engine {
  _counter: number;
  log: boolean;
  entities: KeyableEntity;
  scenes: KeyableScene;
  layers: KeyableLayer;
  canvas?: HTMLCanvasElement;
  ctx?: CanvasRenderingContext2D | null;
  fps: number;
  width: number;
  height: number;
  activeScene?: number;
  loop: GameLoop;

  constructor(config: EngineConfig) {
    this._counter = 1;
    this.log = config.log || false;
    this.entities = {};
    this.scenes = {};
    this.layers = {};
    this.width = config.width || 320;
    this.height = config.height || 180;
    this.fps = config.fps || 30;
    this.loop = new GameLoop(this);

    if (this.log) {
      console.info('Created new Engine with config:', config)
    }
  }

  async mount(element: HTMLElement) {
    try {
      const c = document.createElement('canvas');
      c.width = this.width;
      c.height = this.height;
      c.id = `engine-${this._counter++}`;
      element.append(c);
      await setTimeout(() => {
        const cnvs = document.getElementById(c.id) as HTMLCanvasElement;
        this.canvas = cnvs;
        this.ctx = cnvs.getContext('2d');
        if (this.ctx) {
          (this.ctx as CustomCanvasCtx).letterSpacing = '1px';
          this.ctx.textBaseline = 'top';
        }
      }, 0);
    } catch(err) {
      throw new Error(`There was a problem when mounting engine: ${err}`);
    }
  }

  async addFont(fontName: string, fontUrl: string, fontConfig: string) {
    const styleTxt = `
      @font-face {
        font-family: '${fontName}';
        font-style: normal;
        font-weight: normal;
        src: local('${fontName}'), url(${fontUrl}) format('${(fontTypes as Keyable)[fontUrl.split('.').pop() as string]}');
      }`
    const tag = document.createElement('style');
    tag.innerHTML = styleTxt;
    document.body.appendChild(tag);
    await setTimeout(() => {
      if (this.ctx) {
        this.ctx.font = fontConfig;
      }
    }, 0);
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
