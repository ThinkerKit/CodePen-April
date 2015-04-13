function Main() {
  this.stage = new PIXI.Stage(0x66FF99);
  this.renderer = new PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  this.scroller = new Scroller(this.stage);

  requestAnimFrame(this.update.bind(this));
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
  this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
  var assetsToLoad = ["resources/wall.json"];
  loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = this.spriteSheetLoaded.bind(this);
  loader.load();
};