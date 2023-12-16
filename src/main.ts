import Entity from "./engine/Entity";
import Engine from "./engine/Engine";
import Layer from "./engine/Layer";
import Scene from "./engine/Scene";

const game = new Engine();
const app = document.getElementById('app');
game.mount(app as HTMLElement);

const Scene1 = new Scene(game);
const Layer1 = new Layer(game);

Scene1.addLayer(Layer1);
game.addScene(Scene1);
game.setActiveScene(Scene1.id);

const txt1 = new Entity(game, {
  x: 10, 
  y: 25 
});

game.loop.start();
