import { Assets as PIXIAssets } from 'pixi.js';
import Engine from "./Engine";

export default class Assets {
  engine: Engine;
  assetsList: string[];

  constructor(engine: Engine) {
    this.engine = engine;
    this.assetsList = [];
  }

  addAssets(assetName: string, assetUrl: string) {
    PIXIAssets.add({ alias: assetName, src: assetUrl });
    this.assetsList.push(assetName);
  }

  async loadAssets(assetsList: string[] = this.assetsList): Promise<void> {
    return new Promise(async (resolve) => {
      await PIXIAssets.load(assetsList);
      resolve();
    });
  }
}