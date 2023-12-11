import { resolve } from "path";
import Engine from "./Engine";
import Entity, { EntityPayload } from "./Entity";
import { fontTypes } from "./helpers/enums";
import { delay } from "./helpers/timing";
import { Keyable } from "./types";
import { timingSafeEqual } from "crypto";

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