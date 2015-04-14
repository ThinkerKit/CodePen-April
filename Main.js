function Main() {
  this.stage = new PIXI.Stage(0x66FF99);
  this.renderer = new PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  this.loadSpriteSheet();
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

Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage);
  requestAnimFrame(this.update.bind(this));

  // this.pool = new WallSpritesPool();
  // this.wallSlices = [];
};

// Main.prototype.generateTestWallSpan = function() {
//   var lookupTable = [
//     this.pool.borrowFrontEdge,  // 1st slice
//     this.pool.borrowWindow,     // 2nd slice
//     this.pool.borrowDecoration, // 3rd slice
//     this.pool.borrowStep,       // 4th slice
//     this.pool.borrowWindow,     // 5th slice
//     this.pool.borrowBackEdge    // 6th slice
//   ];

//   var yPos = [
//     128, // 1st slice
//     128, // 2nd slice
//     128, // 3rd slice
//     192, // 4th slice
//     192, // 5th slice
//     192  // 6th slice
//   ];

//   for (var i = 0; i < lookupTable.length; i++)
//   {
//     var func = lookupTable[i];

//     var sprite = func.call(this.pool);
//     sprite.position.x = 64 + (i * 64);
//     sprite.position.y = yPos[i];

//     this.wallSlices.push(sprite);

//     this.stage.addChild(sprite);
//   }
// };

// Main.prototype.clearTestWallSpan = function() {
//   var lookupTable = [
//     this.pool.returnFrontEdge,  // 1st slice
//     this.pool.returnWindow,     // 2nd slice
//     this.pool.returnDecoration, // 3rd slice
//     this.pool.returnStep,       // 4th slice
//     this.pool.returnWindow,     // 5th slice
//     this.pool.returnBackEdge    // 6th slice
//   ];

//   for (var i = 0; i < lookupTable.length; i++)
//   {
//     var func = lookupTable[i];
//     var sprite = this.wallSlices[i];

//     this.stage.removeChild(sprite);
//     func.call(this.pool, sprite);
//   }

//   this.wallSlices = [];
// };