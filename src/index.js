import MainLoop from 'mainloop.js';
import Game from './Game.js';
import GameControl, {
  KEY_ARROW_UP,
  KEY_ARROW_DOWN,
  KEY_ARROW_LEFT,
  KEY_ARROW_RIGHT,
} from './GameControl.js';

const KEYCODE_SPACE = 32;

let loop;
let intervalId;
let isGameOver = true;
const gameControl = new GameControl();

window.addEventListener('keydown', event => {
  gameControl.onKeyDown(event);
  if (isGameOver && event.keyCode === KEYCODE_SPACE) {
    loop = startGameLoop();
  }
});
window.addEventListener('keyup', event => {
  gameControl.onKeyUp(event);
});

const controlNode = document.querySelector('.control');
controlNode.addEventListener('touchstart', (event) => {
  const { target } = event;
  event.preventDefault();
  if (target.classList.contains('control__button__up')) {
    gameControl.onKeyDown({ keyCode: KEY_ARROW_UP });
  }
  if (target.classList.contains('control__button__down')) {
    gameControl.onKeyDown({ keyCode: KEY_ARROW_DOWN });
  }
  if (target.classList.contains('control__button__right')) {
    gameControl.onKeyDown({ keyCode: KEY_ARROW_RIGHT });
  }
  if (target.classList.contains('control__button__left')) {
    gameControl.onKeyDown({ keyCode: KEY_ARROW_LEFT });
  }
});
controlNode.addEventListener('touchend', (event) => {
  const { target } = event;
  event.preventDefault();
  if (target.classList.contains('control__button__up')) {
    gameControl.onKeyUp({ keyCode: KEY_ARROW_UP });
  }
  if (target.classList.contains('control__button__down')) {
    gameControl.onKeyUp({ keyCode: KEY_ARROW_DOWN });
  }
  if (target.classList.contains('control__button__right')) {
    gameControl.onKeyUp({ keyCode: KEY_ARROW_RIGHT });
  }
  if (target.classList.contains('control__button__left')) {
    gameControl.onKeyUp({ keyCode: KEY_ARROW_LEFT });
  }
});
document.querySelector('.game-over').addEventListener('click', event => {
  event.preventDefault();
  if (isGameOver) {
    loop = startGameLoop();
  }
});

document.querySelector('.start-game').addEventListener('click', event => {
  event.preventDefault();
  if (isGameOver) {
    loop = startGameLoop();
  }
});

function startGameLoop() {
  isGameOver = false;
  document.querySelector('.game-over').classList.remove('canvas-overlay--show');
  document.querySelector('.start-game').classList.remove('canvas-overlay--show');
  gameControl.reset();
  document.getElementById('level').innerText = 'Level 1';
  document.getElementById('score').innerText = 0;

  const game = new Game(
    document.getElementById('game-canvas'),
    document.getElementById('score'),
    gameControl,
    gameOver
  );

  intervalId = setInterval(() => {
    game.recalculate();
  }, 200);

  return MainLoop.setUpdate(game.onUpdate)
    .setDraw(game.draw)
    .start();
}

function gameOver(success) {
  loop.stop();
  clearInterval(intervalId);
  document.querySelector('.game-over').classList.add('canvas-overlay--show');
  isGameOver = true;
}
