import Engine from "./Engine";
import Entity, { EntityPayload } from "./Entity";

export interface SpritePayload extends EntityPayload {
  img: string;
}

export default class Sprite extends Entity {
  image: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  angle: number;
  opacity: number;
  mirrored: boolean;

  constructor(engine: Engine, payload: SpritePayload) {
    super(engine, payload);

    this.ctx = this.engine.ctx as CanvasRenderingContext2D;
    this.image = new Image();
    this.image.src = payload.img;
    this.angle = 0;
    this.opacity = 100;
    this.mirrored = false;
  }

  draw() {
    // when camera is ready
    // const x = this.position.x - this.engine.camera.position.x;
    // const y = this.position.y - this.engine.camera.position.y;
    const { x, y } = this.position;

    // save current context
    this.ctx.save();
    // check for alpha/opacity
    if (this.opacity !== 100) {
      this.ctx.globalAlpha = this.opacity/100;
    }
    // check for rotation (independent from camera)
    if (this.angle !== 0) {
      this.ctx.translate(x, y);
      this.ctx.rotate(this.angle * Math.PI/180);
      this.ctx.translate(-x, -y);
    }

    // finally, draw the image
    // this.ctx.drawImage(this.image, sx, sy, sprite.width, sprite.height, x, y, dWidth, dHeight);
  }
}
