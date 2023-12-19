import * as PIXI from 'pixi.js';
import Entity from "./engine/Entity";
import Engine from "./engine/Engine";
import Layer from "./engine/Layer";
import Scene from "./engine/Scene";

const game = new Engine();
const app = document.getElementById('app');

// await game.assets.addFont('tmnt', 'tmnt.otf');
await game.assets.addAssets('tmnt', 'tmnt.otf');
await game.assets.loadAssets();
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

txt1.pixi = new PIXI.BitmapText('This is an example text', { fontSize: 7, fontName: 'tmnt', tint: '#fff' });
txt1.pixi.x = 10;
txt1.pixi.y = 10;
// txt1.pixi.scale.set(0.5, 0.5);
// txt1.pixi.scale.x = 0.75;
// txt1.pixi.scale.y = 0.75;
Layer1.addEntity(txt1);

game.loop.start();
