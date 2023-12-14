import Engine from "./Engine";
import Entity, { EntityPayload } from "./Entity";
import { getRelativePolygon } from "./helpers/Position";

export interface ColliderPayload extends EntityPayload {
  color?: string | CanvasGradient | CanvasPattern;
}

export default class Collider extends Entity {
  color: string | CanvasGradient | CanvasPattern;

  constructor(engine: Engine, payload: ColliderPayload) {
    super(engine, payload);

    this.color = payload.color || '#ff0000';
  }

  render() {
    if (this.engine.ctx && this.shape) {
      this.engine.ctx.save();
      this.engine.ctx.globalAlpha = 0.5; // so that Collider will have transparency
      const projectedShape = getRelativePolygon(this.position, this.shape); // update polygon position relatively to its position property
      this.engine.ctx.fillStyle = this.color;
      this.engine.ctx.beginPath();
      projectedShape.forEach((point, index) => {
        if (index === 0) {
          this.engine.ctx?.moveTo(point[0], point[1]);
        } else {
          this.engine.ctx?.lineTo(point[0], point[1]);
        }
      });
      this.engine.ctx.closePath();
      this.engine.ctx.fill();
      this.engine.ctx.restore();
    }
  }
}
