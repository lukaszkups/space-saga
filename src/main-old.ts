import Engine from './engine-old/Engine';
import GameText from './engine-old/GameText';
import Collider from './engine-old/Collider';
import Scene from './engine-old/Scene';
import SceneLayer from './engine-old/SceneLayer';
import Position from './engine-old/helpers/Position';
import './style.css'


const game = new Engine({
  width: 320,
  height: 180,
  log: true,
  resizable: true,
});

const app = document.getElementById('app');
game.mount(app as HTMLElement);

await game.addFont('Minecraft', 'Minecraft.ttf');
await game.addFont('minimal', 'minimal5x7.otf');
await game.addFont('tmnt', 'tmnt.otf');

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
  fontSize: 12,
  fontFamily: 'tmnt',
  color: '#ff0000'
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
