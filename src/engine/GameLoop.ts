import Engine from "./Engine";
import { delay } from "./helpers/timing";

export default class GameLoop {
  engine: Engine;
  canvas: Engine['canvas'];
  fps: number;
  interval: number;
  counter: number;
  lastRender: number;
  gameLoop?: any;

  constructor (engine: Engine) {
    this.engine = engine;
    this.fps = engine.fps;
    this.interval = 1000 / this.fps;
    this.counter = 0;
    this.lastRender = 0;
    if (this.engine.log) {
      console.info('Created new game loop');
    }
  }

  update(timestamp: number, progress: number) {
    // Update the state of the world for the elapsed time since last render
    const p = progress / 30 * 1000;
    // TODO: check if still needed?
    // const t = p/1000/this.fps;
    // console.log(timestamp, progress, p, t);
    if (this.engine.activeScene && this.engine.scenes[this.engine.activeScene]) {
      this.engine.scenes[this.engine.activeScene]?.update(timestamp, p);
    }
    // this.engine.events.handleEvents(p);
    // this.engine.activeScene.update(p);
    // this.engine.camera.updatePosition();
  }

  render() {
    // draw the state of the world
    if (this.engine.activeScene && this.engine.scenes[this.engine.activeScene]) {
      this.engine.scenes[this.engine.activeScene]?.render();
    }
  }

  clear() {
    this.engine?.ctx?.clearRect(0, 0, this.engine?.ctx.canvas?.width || 0, this.engine?.ctx.canvas?.height || 0);
  }

  loop(timestamp: number) {
    const progress = timestamp - this.lastRender;
    // console.log(this.interval, progress)
    // TODO: commented out because timings were going out of place (multiline text takes 14s to render instead of 10s)
    // if (progress > this.interval) {
      this.clear();
      this.update(timestamp, progress);  
      this.render();
      this.lastRender = timestamp - (progress % this.interval);
    // }
    this.gameLoop = window.requestAnimationFrame((_timestamp) => this.loop(_timestamp));
  }

  async start() {
    // we need to wait a bit for canvas to mount in Document's HTML DOM
    await delay(100);
    this.lastRender = 0;
    this.gameLoop = window.requestAnimationFrame((_timestamp) => this.loop(_timestamp));
  }

  stop() {
    window.cancelAnimationFrame(this.gameLoop);
  }
}