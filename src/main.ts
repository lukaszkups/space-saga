import Engine from './engine/Engine'
import GameText from './engine/GameText';
import Scene from './engine/Scene';
import SceneLayer from './engine/SceneLayer';
import './style.css'


const game = new Engine({
  width: 640,
  height: 480,
});

const app = document.getElementById('app');
game.mount(app as HTMLElement);


const scene1 = new Scene(game, 'Scene1');
game.addScene(scene1);
game.activeScene = scene1.id;

const layer1 = new SceneLayer(game, {
  name: 'Layer1',
  visible: true,
});
scene1.addLayer(layer1);

const txt = new GameText(game, { text: 'Hello world!' });
layer1.addEntity(txt);

txt.drawText(1000);

game.loop.start();
