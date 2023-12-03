import Entity from "./Entity";

export interface EngineConfig {
  log: boolean;
  width: number;
  height: number;
}

export default class Engine {
  _counter: number;
  log: boolean;
  entities: Entity[];
  canvas?: HTMLCanvasElement;
  ctx?: CanvasRenderingContext2D | null;
  width: number;
  height: number;

  constructor(config: EngineConfig) {
    this._counter = 1;
    this.log = config.log || false;
    this.entities = [];
    this.width = config.width || 320;
    this.height = config.height || 180;
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
      }, 0);
    } catch(err) {
      throw new Error(`There was a problem when mounting engine: ${err}`);
    }
  }
}
