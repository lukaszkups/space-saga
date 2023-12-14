import Engine from './engine/Engine';
import GameText from './engine/GameText';
import Collider from './engine/Collider';
import Scene from './engine/Scene';
import SceneLayer from './engine/SceneLayer';
import Position from './engine/helpers/Position';
import './style.css'


const game = new Engine({
  width: 640,
  height: 480,
  log: true,
  resizable: true,
});

const app = document.getElementById('app');
game.mount(app as HTMLElement);

await game.addFont('Minecraft', 'Minecraft.ttf');
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
layer1.addEntity(txt);
txt.drawText(10, true);

const col1 = new Collider(game, {
  position: new Position(10, 20),
  width: 75,
  height: 50,
});

col1.update = ((progress: number, timeElapsed: number) => {
  col1.position.x++
});

layer1.addEntity(col1);


await game.loop.start();
