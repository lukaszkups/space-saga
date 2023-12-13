# Introduction

## Game mounting

```
import Engine from './engine/Engine';

const game = new Engine({
  width: 640,
  height: 480,
  log: true,
  resizable: true,
});

const app = document.getElementById('app');
game.mount(app as HTMLElement);

(window as any).game = game; // handy for debugging

await game.loop.start(); // start the game
```

## Loading local custom fonts (before game loop start!)

Best to put font files inside `public` folder

```
await game.addFont('Minecraft', 'Minecraft.ttf');
await game.addFont('minimal', 'minimal5x7.otf');
```

## Create, add and set an active Scene

```
import Scene from './engine/Scene';

const scene1 = new Scene(game, 'Scene1');
game.addScene(scene1);
game.activeScene = scene1.id;
```

## Create and add layer to the Scene

```
import SceneLayer from './engine/SceneLayer';

const layer1 = new SceneLayer(game, {
  name: 'Layer1',
  visible: true,
});
scene1.addLayer(layer1);
```

## Draw text, letter by letter, with multiline support

```
import GameText from './engine/GameText';

const txt = new GameText(game, { 
  text: 'Hello world! This is an example of multiline text writing inside canvas!', 
  position: new Position(10, 0),
  fontSize: 64,
});
layer1.addEntity(txt);
txt.drawText(10, true);
```
