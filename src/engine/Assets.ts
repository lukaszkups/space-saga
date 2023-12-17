import { Assets as PIXIAssets } from 'pixi.js';
import Engine from "./Engine";

export default class Assets {
  engine: Engine;
  assetsList: string[];

  constructor(engine: Engine) {
    this.engine = engine;
    this.assetsList = [];
  }

  // images, music etc. except fonts (?)
  addAssets(assetName: string, assetUrl: string) {
    PIXIAssets.add({ alias: assetName, src: assetUrl });
    this.assetsList.push(assetName);
  }

  async addFont(fontName: string, fontUrl: string) {
    const myFont = new FontFace(fontName, `url(${fontUrl})`);
    await myFont.load();
    document.fonts.add(myFont);
  }

  async loadAssets(assetsList: string[] = this.assetsList): Promise<void> {
    return new Promise(async (resolve) => {
      await PIXIAssets.load(assetsList);
      resolve();
    });
  }
}