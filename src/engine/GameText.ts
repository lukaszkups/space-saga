import Engine from "./Engine";
import Position from "./helpers/Position";

export interface TextPayload {
  text?: string;
  width?: number;
  position?: Position;
}

export default class GameText {
  id: number;
  engine: Engine;
  text: string;
  width: number;
  startTime: number;
  currentText: string;
  letterDuration: number;
  position: Position;
  finished: boolean;

  constructor(engine: Engine, { text, width, position }: TextPayload) {
    this.engine = engine;
    this.id = engine._counter++;
    this.text = text || '';
    this.width = width || this.engine.width;
    this.startTime = 0;
    this.currentText = '';
    this.letterDuration = 0;
    this.position = position || new Position(0, 0);
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
    this.engine?.ctx?.fillText(this.currentText, this.position.x, this.position.y);
  }
}