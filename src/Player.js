import Entity from './Entity.js';

export default class Player extends Entity {
  constructor(startX, startY, width, height, canvasWidth, canvasHeight, movement) {
    super(startX, startY, width, height, '#2ECC40');
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.movement = movement;
    this.moveIsValid = false;
  }
  moveUp() {
    if (this.y > 0) {
      this.y -= this.movement;
      this.moveIsValid = true;
      return;
    }
    this.moveIsValid = false;
  }
  moveDown() {
    if (this.y < this.canvasHeight - this.height) {
      this.y += this.movement;
      this.moveIsValid = true;
      return;
    }
    this.moveIsValid = false;
  }
  moveRight() {
    if (this.x < (this.canvasWidth - this.width)) {
      this.x += this.movement;
      this.moveIsValid = true;
      return;
    }
    this.moveIsValid = false;
  }
  moveLeft() {
    if (this.x > 0) {
      this.x -= this.movement;
      this.moveIsValid = true;
      return;
    }
    this.moveIsValid = false;
  }
}
