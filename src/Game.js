import Player from './Player.js';
import Entity from './Entity.js';
import Lava from './Lava.js';

const MOVE_INCREMENT = 2;
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
const HERO_WIDTH = 30;
const HERO_HEIGHT = 30;

export default class Game {
  constructor(canvas, scoreElement, gameControl, gameOver) {
    this.canvas = canvas;
    this.scoreElement = scoreElement;
    this.gameControl = gameControl;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.ctx = canvas.getContext('2d');
    this.hero = new Player(
      100,
      100,
      HERO_WIDTH,
      HERO_HEIGHT,
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      MOVE_INCREMENT
    );
    this.level = 1;
    this.lavaThreshold = 150;
    this.simultaniousLavasAboveThreshold = 3;
    this.lavaSpeedMin = 0.5;
    this.lavaSpeedMax = 1.5;
    this.score = 0;
    this.gameOver = gameOver;
    this.foods = this.generateFoods(8);
    this.lavas = this.generateLavas(this.simultaniousLavasAboveThreshold);
    
    this.onUpdate = this.onUpdate.bind(this);
    this.draw = this.draw.bind(this);
    this.recalculate = this.recalculate.bind(this);
  }
  addScore() {
    this.score += 1;
    this.scoreElement.innerText = this.score;
  }
  entitiesAreColliding(entity1, entity2) {
    return hitX(entity1, entity2) && hitY(entity1, entity2);

    function hitX(e1, e2) {
      return (
        (e1.xEnd > e2.x && e1.x < e2.x) || (e1.x < e2.xEnd && e1.xEnd > e2.xEnd)
      );
    }

    function hitY(e1, e2) {
      return (
        (e1.yEnd > e2.y && e1.y < e2.y) || (e1.y < e2.yEnd && e1.yEnd > e2.yEnd)
      );
    }
  }
  levelUp() {
    this.lavaThreshold = this.lavaThreshold - 5;
    this.lavaSpeedMin = this.lavaSpeedMin * 1.1;
    this.lavaSpeedMax = this.lavaSpeedMax * 1.1;
    this.foods = this.generateFoods(8);
    this.lavas = this.generateLavas(this.simultaniousLavasAboveThreshold);
    this.level += 1;
    if (this.level % 5 === 0) {
      this.simultaniousLavasAboveThreshold += 1;
    }
    document.getElementById('level').innerText = `Level ${this.level}`;
  }
  onUpdate() {
    if (!this.foods.length) {
      this.levelUp();
      return;
    }
    if (this.gameControl.isUp()) {
      this.hero.moveUp();
    }
    if (this.gameControl.isDown()) {
      this.hero.moveDown();
    }
    if (this.gameControl.isRight()) {
      this.hero.moveRight();
    }
    if (this.gameControl.isLeft()) {
      this.hero.moveLeft();
    }
    if (this.hero.moveIsValid) {
      this.foods.forEach(food => {
        if (this.entitiesAreColliding(this.hero, food)) {
          this.foods = this.foods.filter(f => f !== food);
          this.addScore();
        }
      });
    }
    this.lavas.forEach(lava => {
      if (!lava.isStatic) {
        lava.moveDown();
      }
      if (this.entitiesAreColliding(this.hero, lava)) {
        this.gameOver();
      }
    });
  }
  recalculate() {
    const aboveThresholdLavas = this.lavas.filter(lava => {
      return !lava.isStatic && lava.y < 150;
    }).length;
    if (aboveThresholdLavas < this.simultaniousLavasAboveThreshold) {
      const newLavas = this.generateLavas(this.simultaniousLavasAboveThreshold - aboveThresholdLavas);
      this.lavas = [...this.lavas, ...newLavas];
    }
  }
  generateFoods(num) {
    const foods = [];
    for (let i = 0; i < num; i++) {
      foods.push(
        new Entity(
          getRandomInt(50, CANVAS_HEIGHT - 50),
          getRandomInt(50, CANVAS_WIDTH - 50),
          15,
          15,
          '#0074D9'
        )
      );
    }
    return foods;
  }
  generateLavas(num) {
    const lavas = [];
    for (let i = 0; i < num; i++) {
      lavas.push(
        new Lava({
          startX: getRandomInt(0, CANVAS_WIDTH - 10),
          startY: 0,
          width: 10,
          height: 10,
          canvasWidth: CANVAS_WIDTH,
          canvasHeight: CANVAS_HEIGHT,
          movement: getRandomArbitrary(0.5, 1.5),
        })
      );
    }
    return lavas;
  }
  draw(interpolationPercentage) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    [...this.foods, this.hero, ...this.lavas].forEach(e => this.drawEntity(e));
  }
  drawEntity(entity) {
    this.ctx.fillStyle = entity.color;
    this.ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
