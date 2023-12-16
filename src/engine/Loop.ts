// import * as PIXI from 'pixi.js';
import Engine from './Engine';
import Scene from './Scene';

export default class Loop {
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  start() {
    this.engine.pixi.ticker.add((delta) => {
      this.update(delta);
      this.render(delta);
    });
  }

  update(delta: number) {
    if (this.engine.activeScene && this.engine.scenes[this.engine.activeScene]) {
      (this.engine.scenes[this.engine.activeScene] as Scene).update(delta);
    }
  }

  render(delta: number) {
    if (this.engine.activeScene && this.engine.scenes[this.engine.activeScene]) {
      (this.engine.scenes[this.engine.activeScene] as Scene).render(delta);
    }
  }
}
