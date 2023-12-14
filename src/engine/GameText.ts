import Engine from "./Engine";
import Entity, { EntityPayload } from "./Entity";

export interface TextPayload extends EntityPayload {
  text?: string;
  width?: number;
  fontSize?: number;
  lineHeight?: number;
  fontFamily?: string;
  multiline?: boolean;
}

export default class GameText extends Entity {
  text: string;
  width: number;
  startTime: number;
  elapsed: number;
  currentText: string;
  letterDuration: number;
  finished: boolean;
  fontSize: number;
  multiline: boolean;
  lineHeight: number;
  fontFamily: string;

  constructor(engine: Engine, payload: TextPayload) {
    super(engine, payload);
    this.text = payload.text || '';
    this.width = payload.width || this.engine.width;
    this.currentText = '';
    this.letterDuration = 0;
    this.startTime = 0;
    this.elapsed = 0;
    this.finished = false;
    this.fontSize = payload.fontSize || 160;
    this.multiline = payload.multiline || false;
    this.lineHeight = payload.lineHeight || this.fontSize;
    this.fontFamily = payload.fontFamily || 'minimal';
  }

  drawText(duration: number, multiline?: boolean) {
    this.multiline = multiline || false;
    this.elapsed = 0;
    this.finished = false;
    this.startTime = performance.now();
    this.letterDuration = ((duration*10000) / this.text.length);
  }

  update(progress: number) {
    if (this.startTime && !this.finished) {
      this.elapsed += progress;
      const currentLetterIndex = Math.ceil((this.elapsed / this.letterDuration) % this.text.length);
      if (currentLetterIndex < this.text.length) {
        this.currentText = this.text.substring(0, currentLetterIndex);
      } else if (!this.finished) {
        this.currentText = this.text;
        this.finished = true;
        this.startTime = 0;
        console.info('finished', this.elapsed)
        // TODO
        // this.engine.events.emit('textComplete', this.id);
      }
    }
  }

  render() {
    if (this.engine.ctx) {
      this.engine.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    }
    if (this.multiline) {
      this.renderMultiline();
    } else {
      this.engine?.ctx?.fillText(this.currentText, this.position.x, this.position.y);
    }
  }

  renderMultiline() {
    let { x, y } = this.position;
    const notLineBreakingCharacters = '!?;:,. )]}/\\|';
    for (let i = 0; i < this.currentText.length; i++) {
      const letter = this.currentText[i];

      // Measure the width of the letter
      const letterWidth = this.engine?.ctx?.measureText(letter).width as number;

      // Check if adding the letter exceeds the maxWidth (5 is just an extra overflow margin)
      if (x + letterWidth+5 > this.width) {
        // write word-wrap symbol
        if (!notLineBreakingCharacters.includes(letter) && !notLineBreakingCharacters.includes(this.currentText[i - 1]) && !notLineBreakingCharacters.includes(this.currentText[i + 1])) {
          this.engine?.ctx?.fillText('-', x, y);
        }
        // Move to the next line
        x = 10;
        y += this.lineHeight;
      }
      // if (x + letterWidth > this.width) {
      //   // Move to the next line
      //   x = 10;
      //   y += this.lineHeight;
      // }

      // Draw the letter at the current position
      this.engine?.ctx?.fillText(letter, x, y);

      // Move x to the next position
      x += letterWidth;
    }
  }
}