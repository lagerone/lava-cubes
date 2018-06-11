export const KEY_ARROW_LEFT = 37;
export const KEY_ARROW_RIGHT = 39;
export const KEY_ARROW_DOWN = 40;
export const KEY_ARROW_UP = 38;

let pressedKeys = {};

export default class GameControl {
  constructor() {
    this.keyIsDown = false;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  reset() {
    pressedKeys = {};
  }
  onKeyDown({ keyCode }) {
    pressedKeys[keyCode] = keyCode;
    this.keyIsDown = true;
  }
  onKeyUp({ keyCode }) {
    delete pressedKeys[keyCode];
    this.keyIsDown = false;
  }
  isUp() {
    return this.keyIsDown && pressedKeys[KEY_ARROW_UP];
  }
  isDown() {
    return this.keyIsDown && pressedKeys[KEY_ARROW_DOWN];
  }
  isRight() {
    return this.keyIsDown && pressedKeys[KEY_ARROW_RIGHT];
  }
  isLeft() {
    return this.keyIsDown && pressedKeys[KEY_ARROW_LEFT];
  }
}
