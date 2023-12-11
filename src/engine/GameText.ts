import { resolve } from "path";
import Engine from "./Engine";
import Entity, { EntityPayload } from "./Entity";
import { fontTypes } from "./helpers/enums";
import { delay } from "./helpers/timing";
import { Keyable } from "./types";

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
    this.letterDuration = ((duration*10000) / this.text.length);
  }

  update(timestamp: number) {
    if (this.startTime && !this.finished) {
      this.elapsed += timestamp;
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
      this.engine.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    }
    // await delay(1000);
    // const checkForFontsReady = async (): Promise<void> => {
    //   console.log(123, document.fonts.check(`${this.fontSize}px ${this.fontFamily}`), document.readyState);
    //   // if (document.fonts.check(`${this.fontSize}px ${this.fontFamily}`)) {
    //   //   Promise.resolve();
    //   // } else {
    //   //   setTimeout(() => {
    //   //     checkForFontsReady();
    //   //   }, 100);
    //   // }
    //   return new Promise((resolve) => {
    //     while (document.readyState === 'interactive') {
    //     // while (!document.fonts.check(`${this.fontSize}px ${this.fontFamily}`)) {
    //       await new Promise(() => setTimeout(async () => {
    //         await checkForFontsReady();
    //       }, 1000));
    //     }
    //     console.log(1);
    //     resolve();
    //     console.log(2);
    //   });
    // }
    const checkForFontsReady = async (): Promise<void> => {
      
      return new Promise((resolve) => {
        const checkFontsAndResolve = () => {
          console.log(123, document.fonts.check(`${this.fontSize}px ${this.fontFamily}`), document.readyState);
          if (document.readyState === 'complete' || document.fonts.check(`${this.fontSize}px ${this.fontFamily}`)) {
            console.log(1);
            resolve();
            console.log(2);
          } else {
            setTimeout(checkFontsAndResolve, 0);
          }
          // if (document.readyState === 'interactive' && document.fonts.check(`${this.fontSize}px ${this.fontFamily}`)) {
          //   console.log(1);
          //   resolve();
          //   console.log(2);
          // } else {
          //   setTimeout(checkFontsAndResolve, 1000);
          // }
        };
    
        checkFontsAndResolve();
      });
    };
    await checkForFontsReady();
    await delay(1000);
    console.log(12);
    // console.log(1, document.fonts.check(`${this.fontSize}px ${this.fontFamily}`))
    // return document.fonts.ready;
    // do {
    //   await delay(1000);
    // } while (!document.fonts.check(`${this.fontSize}px ${this.fontFamily}`));
  }
}