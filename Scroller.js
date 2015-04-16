function Scroller(stage, boxWorld) {
	this.far = new Far();
	stage.addChild(this.far);

	this.mid = new Mid();
	stage.addChild(this.mid);

	this.front = new Walls();
  	stage.addChild(this.front);

  	this.mapBuilder = new MapBuilder(this.front, boxWorld);

	this.viewportX = 0;
	this.distance = 25 * 64;
}

Scroller.prototype.setViewportX = function(viewportX, boxWorld) {
	this.viewportX = viewportX;
	this.far.setViewportX(viewportX);
	this.mid.setViewportX(viewportX);
	this.front.setViewportX(viewportX);

	if((this.distance) < viewportX) {		
		var newWallDistance = this.mapBuilder.generateNextWall(boxWorld);
		this.distance += newWallDistance * 64;
	}
};

Scroller.prototype.getViewportX = function() {
	return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units, boxWorld) {
	var newViewportX = this.viewportX + units;
	this.setViewportX(newViewportX, boxWorld);
};