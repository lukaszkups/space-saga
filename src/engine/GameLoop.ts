import Engine from "./Engine";

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
    this.canvas = engine.canvas;
    this.fps = engine.fps;
    this.interval = Math.floor(1000 / this.fps);
    this.counter = 0;
    this.lastRender = 0;
    if (this.engine.log) {
      console.info('Created new game loop');
    }
  }

  update(progress: number) {
    // Update the state of the world for the elapsed time since last render
    const p = Math.floor(progress / 30 * 1000);
    const t = p/1000/this.fps
    // console.log(progress, p);
    if (this.engine.activeScene && this.engine.scenes[this.engine.activeScene]) {
      this.engine.scenes[this.engine.activeScene]?.update(p, t);
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
    // console.log('clear')
    this.engine?.ctx?.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
  }

  loop(timestamp: number) {
    const progress = Math.floor(timestamp - this.lastRender);
    // console.log(this.interval, progress)
    if (progress > this.interval) {
      this.update(progress);  
      this.clear();
      this.render();
      this.lastRender = Math.floor(timestamp - (progress % this.interval));
    }
    this.gameLoop = window.requestAnimationFrame((_timestamp) => this.loop(_timestamp));
  }

  start() {
    // we need to wait a bit for canvas to mount in Document's HTML DOM
    setTimeout(() => {
      this.lastRender = 0;
      this.gameLoop = window.requestAnimationFrame((_timestamp) => this.loop(_timestamp));
    }, 0);
  }

  stop() {
    window.cancelAnimationFrame(this.gameLoop);
  }
}