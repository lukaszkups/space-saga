import Engine from "./Engine";
import Entity, { EntityConfig } from "./Entity";

export interface TextPayload extends EntityConfig {
  text?: string;
  width?: number;
}

export default class GameText extends Entity {
  text: string;
  width: number;
  startTime: number;
  currentText: string;
  letterDuration: number;
  finished: boolean;

  constructor(engine: Engine, payload: TextPayload) {
    super(engine, payload);
    this.text = payload.text || '';
    this.width = payload.width || this.engine.width;
    this.currentText = '';
    this.letterDuration = 0;
    this.startTime = 0;
    this.finished = false;
  }

  drawText(duration: number) {
    this.finished = false;
    this.startTime = performance.now();
    this.letterDuration = duration / this.text.length;
  }

  update(delta: number) {
    const elapsed = this.startTime + delta;
    const currentLetterIndex = Math.floor((elapsed / this.letterDuration) % this.text.length);

    if (currentLetterIndex < this.text.length) {
      this.currentText = this.text.substring(0, currentLetterIndex + 1);
    } else if (!this.finished) {
      this.currentText = this.text;
      this.finished = true;
      // TODO
      // this.engine.events.emit('textComplete', this.id);
    }
  }

  render() {
    this.engine.ctx.font = "50px serif";
    console.log(11);
    this.engine?.ctx?.fillText(this.currentText, this.position.x, this.position.y);
  }
}