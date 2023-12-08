import Engine from "./Engine";

export default class GameLoop {
  engine: Engine;
  canvas: Engine['canvas'];
  counter: number;
  lastRender: number;
  gameLoop?: any;

  constructor (engine: Engine) {
    this.engine = engine;
    this.canvas = engine.canvas;
    this.counter = 0;
    this.lastRender = 0;
  }

  update(progress: number) {
    // Update the state of the world for the elapsed time since last render
    const p = progress / 30;
    // console.log(progress, p);
    if (this.engine.activeScene && this.engine.scenes[this.engine.activeScene]) {
      this.engine.scenes[this.engine.activeScene].update(p);
    }
    // this.engine.events.handleEvents(p);
    // this.engine.activeScene.update(p);
    // this.engine.camera.updatePosition();
  }

  render() {
    // draw the state of the world
    if (this.engine.activeScene && this.engine.scenes[this.engine.activeScene]) {
      this.engine.scenes[this.engine.activeScene].render();
    }
  }

  clear() {
    this.engine?.ctx?.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
  }

  loop(timestamp: number) {
    const progress = timestamp - this.lastRender;
    this.update(progress);  
    this.clear();
    this.render();
    this.lastRender = timestamp;
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