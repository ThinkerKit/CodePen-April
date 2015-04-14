function Walls() {
  PIXI.DisplayObjectContainer.call(this);

  this.pool = new WallSpritesPool();
}

Walls.constructor = Walls;
Walls.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);