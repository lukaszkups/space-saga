import Engine from "./engine/Engine";

const game = new Engine();
const app = document.getElementById('app');
game.mount(app as HTMLElement);
