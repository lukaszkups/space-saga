import Entity from "./Entity";
import GameLoop from "./GameLoop";
import Scene from "./Scene";
import { KeyableEntity, KeyableLayer, KeyableScene } from "./types";

export interface EngineConfig {
  log?: boolean;
  width?: number;
  height?: number;
  fps?: number;
  resizable?: boolean;
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
  resizable: boolean;

  constructor(config: EngineConfig) {
    this._counter = 1;
    this.log = config.log || false;
    this.entities = {};
    this.scenes = {};
    this.layers = {};
    this.resizable = config.resizable || false;
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
      if (this.resizable) {
        this.addResizableStyles(element);
      }
      await setTimeout(() => {
        const cnvs = document.getElementById(c.id) as HTMLCanvasElement;
        this.canvas = cnvs;
        this.ctx = cnvs.getContext('2d');          
        if (this.ctx) {
          // override some default values
          (this.ctx as CustomCanvasCtx).letterSpacing = '1px';
          this.ctx.textBaseline = 'top';
          this.ctx.imageSmoothingEnabled = false;
        }
        this.addEvents();
      }, 0);
    } catch(err) {
      throw new Error(`There was a problem when mounting engine: ${err}`);
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

  async addFont(fontName: string, fontUrl: string) {
    const myFont = new FontFace(fontName, `url(${fontUrl})`);
    await myFont.load();
    document.fonts.add(myFont);
  }

  addEvents() {
    if (this.resizable) {
      this.addResizeEvent();
    }
  }

  addResizeEvent() {
    this.canvas?.classList.add('resizable');
    // those doesn't work anyway (but fortunately styles applied via `.resizable` class do!) - but it's worth to keep for legacy browsers maybe?
    if (this.ctx) {
      this.ctx.imageSmoothingEnabled  = false;
      // @ts-ignore-next-line
      this.ctx.webkitImageSmoothingEnabled = false;
    }

    const resize = () => {
      const canvasRatio = this.height / this.width;
      const windowRatio = window.innerHeight / window.innerWidth;
      let width = 0;
      let height = 0;

      if (windowRatio < canvasRatio) {
        height = window.innerHeight;
        width = height / canvasRatio;
      } else {
        width = window.innerWidth;
        height = (width * canvasRatio);
      }
      if (this.canvas) {
        this.canvas.style.width = `${Math.floor(width)}px`;
        this.canvas.style.height = `${Math.floor(height)}px`;
      }
    };
    window.addEventListener('resize', resize, false);
    resize();
  }

  addResizableStyles(element: HTMLElement) {
    const s = document.createElement('style');
    s.innerHTML = `
    .resizable {
      width: 100%;
      height: auto;
      // source: https://itch.io/jam/lowrezjam2016/topic/19730/solved-html5-canvas-scaling-nearest-neighbor-no-blur
      image-rendering: optimizeSpeed;             /* Older versions of FF          */
      image-rendering: -moz-crisp-edges;          /* FF 6.0+                       */
      image-rendering: -webkit-optimize-contrast; /* Safari                        */
      image-rendering: -o-crisp-edges;            /* OS X & Windows Opera (12.02+) */
      image-rendering: pixelated;                 /* Awesome future-browsers       */
      -ms-interpolation-mode: nearest-neighbor;   /* IE                            */
    }`;
    element.append(s);
  }
}
