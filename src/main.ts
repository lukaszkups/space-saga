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
// await game.addFont('minimal', 'minimal5x7.otf', '16px minimal');
game.mount(app as HTMLElement);

await game.addFont('minimal', 'minimal5x7.otf');

(window as any).game = game;

const scene1 = new Scene(game, 'Scene1');
game.addScene(scene1);
game.activeScene = scene1.id;

const layer1 = new SceneLayer(game, {
  name: 'Layer1',
  visible: true,
});
scene1.addLayer(layer1);
const txt = new GameText(game, { 
  text: 'Hello world! This is an example of multiline text writing inside canvas!', 
  position: new Position(10, 0),
  fontSize: 64,
});
console.log(3, document.fonts.check('16px minimal'))
layer1.addEntity(txt);

await game.loop.start();

txt.drawText(10, true);
console.log(33, document.fonts.check('16px minimal'))
// await setTimeout(() => {
// }, 100)
