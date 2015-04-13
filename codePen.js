function init() {
  stage = new PIXI.Stage(0x66FF99);
  renderer = PIXI.autoDetectRenderer(
  	512,
  	384,
  	{view:document.getElementById("game-canvas")}
  );
  renderer.render(stage);
}