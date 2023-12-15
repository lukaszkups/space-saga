import Engine from "./Engine";
import Position from "./helpers/Position";

export default class Camera2D {
  engine: Engine;
  _id: number;
  position: Position;
  scale: number;

  constructor(engine: Engine, initialPosition = { x: 0, y: 0 }) {
    this.engine = engine;
    this._id = this.engine._counter++;

    // this.canvas = this.engine.canvas;
    this.position = new Position(initialPosition.x, initialPosition.y);
    this.scale = 1;
  }

  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    this.updateTransform();
  }

  setScale(scale: number) {
    this.scale = scale;
    this.updateTransform();
  }

  updateTransform() {
    const { position, scale } = this;
    const context = this.engine.ctx;

    // Clear previous transformations
    context?.setTransform(1, 0, 0, 1, 0, 0);

    // Apply translation and scale
    context?.translate(-position.x, -position.y);
    context?.scale(scale, scale);
  }

  // Call this method before rendering
  begin() {
    this.updateTransform();
  }

  // Call this method after rendering
  end() {
    // Optionally, reset transformations if needed
    this.engine.ctx?.setTransform(1, 0, 0, 1, 0, 0);
  }
}

// // Example usage:
// const canvas = document.getElementById('myCanvas');
// const camera = new Camera2D(canvas);

// // Set camera position and scale as needed
// camera.setPosition(100, 100);
// camera.setScale(2);

// // Render your scene
// function render() {
//   camera.begin();

//   // Draw your objects using canvas context

//   camera.end();
// }

// // Call render function when needed
// render();
