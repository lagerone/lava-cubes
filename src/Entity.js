export default class Entity {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  get xEnd() {
    return this.x +  this.width;
  }
  get yEnd() {
    return this.y + this.height;
  }
}
