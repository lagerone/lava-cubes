import Entity from './Entity.js';

export default class Lava extends Entity {
  constructor({ startX, startY, width, height, canvasWidth, canvasHeight, movement }) {
    super(startX, startY, width, height, '#FF4136');
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.movement = movement;
    this.isStatic = false;
    this.maxY = canvasHeight - height;
  }
  moveDown() {
    if (this.isStatic) {
      return;
    }
    if (this.y < this.maxY) {
      this.y += this.movement;
      return;
    }
    this.isStatic = true;
  }
}
