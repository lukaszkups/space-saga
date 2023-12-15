import Engine from "./Engine";

export default class Scene {
  constructor(engine: Engine, payload) {
    this.engine = engine;
    this.id = engine.counter++;
  }
}