import Engine from "./Engine";
import Entity, { EntityPayload } from "./Entity";
import { fontTypes } from "./helpers/enums";
import { delay } from "./helpers/timing";

export interface TextPayload extends EntityPayload {
  text?: string;
  width?: number;
  fontSize?: number;
  fontFamily?: string;
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
    this.fontFamily = payload.fontFamily || 'minimal';
  }

  drawText(duration: number) {
    this.elapsed = 0;
    this.finished = false;
    this.startTime = performance.now();
    this.letterDuration = (duration / this.text.length);
  }

  update(delta: number, timeElapsed: number) {
    if (this.startTime && !this.finished) {
      this.elapsed += timeElapsed;
      const currentLetterIndex = Math.ceil((this.elapsed / this.letterDuration) % this.text.length);
      if (currentLetterIndex < this.text.length) {
        this.currentText = this.text.substring(0, currentLetterIndex);
      } else if (!this.finished) {
        this.currentText = this.text;
        this.finished = true;
        console.info('finished')
        // TODO
        // this.engine.events.emit('textComplete', this.id);
      }
    }
  }

  render() {
    if (this.engine.ctx) {
      this.engine.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    }
    this.engine?.ctx?.fillText(this.currentText, this.position.x, this.position.y);
  }

  async addFont(fontName: string, fontUrl: string, fontConfig: string) {
    const styleTxt = `
      @font-face {
        font-family: '${fontName}';
        font-style: normal;
        font-weight: normal;
        src: local('${fontName}'), url(${fontUrl}) format('${(fontTypes as Keyable)[fontUrl.split('.').pop() as string]}');
      }`
    const tag = document.createElement('style');
    tag.innerHTML = styleTxt;
    document.body.appendChild(tag);
    if (this.engine.ctx) {
      this.engine.ctx.font = fontConfig;
    }
    // await delay(1000);
    return document.fonts.ready;
    // console.log(1, document.fonts.check(`${this.fontSize}px ${this.fontFamily}`))
    // do {
    //   await delay(1000);
    // } while (!document.fonts.check(`${this.fontSize}px ${this.fontFamily}`));
  }
}