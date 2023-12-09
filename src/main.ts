import Engine from './engine/Engine'
import GameText from './engine/GameText';
import Scene from './engine/Scene';
import SceneLayer from './engine/SceneLayer';
import Position from './engine/helpers/Position';
// import './assets/Minecraft.ttf';
import './style.css'


const game = new Engine({
  width: 640,
  height: 480,
  log: true,
});

const app = document.getElementById('app');
game.mount(app as HTMLElement);

game.addFont('minimal', 'minimal5x7.otf', '150px mimnimal');

window.game = game;

const scene1 = new Scene(game, 'Scene1');
game.addScene(scene1);
game.activeScene = scene1.id;

const layer1 = new SceneLayer(game, {
  name: 'Layer1',
  visible: true,
});
scene1.addLayer(layer1);

const txt = new GameText(game, { text: 'Hello world!' , position: new Position(0, 0) });
layer1.addEntity(txt);


game.loop.start();
setTimeout(() => {
  txt.drawText(2);
}, 1000)
