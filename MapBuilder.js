function MapBuilder(walls, boxWorld) {
   this.walls = walls;
   this.createMap(boxWorld);
   this.floor;
}

MapBuilder.WALL_HEIGHTS = [
  256, // Lowest slice
  224,
  192,
  160,
  128  // Highest slice
];

MapBuilder.prototype.createMap = function(boxWorld) {
	this.createWallSpan(2, 25, true);

	const polyFixture = new Box2D.Dynamics.b2FixtureDef();
    polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    polyFixture.density = 1;
    polyFixture.restitution = 1.0;

    const bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

    polyFixture.shape.SetAsBox((1000), 1);
    bodyDef.position.Set((250), 192);
    this.floor = boxWorld.CreateBody(bodyDef).CreateFixture(polyFixture);

	// this.createWallSpan(2, 18);
	// this.createGap(1);
	// this.createSteppedWallSpan(2, 5, 28);
	// this.createGap(1);
	// this.createWallSpan(1, 10);
	// this.createGap(1);
	// this.createWallSpan(2, 6); 
	// this.createGap(1);
	// this.createWallSpan(1, 8);
	// this.createGap(1);
	// this.createWallSpan(2, 6);
	// this.createGap(1);
	// this.createWallSpan(1, 8);
	// this.createGap(1)
	// this.createWallSpan(2, 7);
	// this.createGap(1);
	// this.createWallSpan(1, 16);
	// this.createGap(1);
	// this.createWallSpan(2, 6);
	// this.createGap(1);
	// this.createWallSpan(1, 22);
	// this.createGap(2);
	// this.createWallSpan(2, 14);
	// this.createGap(2);
	// this.createWallSpan(3, 8);
	// this.createGap(2);
	// this.createSteppedWallSpan(3, 5, 12);
	// this.createGap(3);
	// this.createWallSpan(0, 8);
	// this.createGap(3);
	// this.createWallSpan(1, 50);
	// this.createGap(20);
};

MapBuilder.prototype.createGap = function(spanLength) {
  for (var i = 0; i < spanLength; i++)
  {
    this.walls.addSlice(SliceType.GAP);
  }
};

MapBuilder.prototype.addWallFront = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.walls.addSlice(SliceType.FRONT, y);
};

MapBuilder.prototype.addWallBack = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.walls.addSlice(SliceType.BACK, y);
};

MapBuilder.prototype.addWallMid = function(heightIndex, spanLength) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  for (var i = 0; i < spanLength; i++)
  {
    if (i % 2 == 0)
    {
      this.walls.addSlice(SliceType.WINDOW, y);
    }
    else
    {
      this.walls.addSlice(SliceType.DECORATION, y);
    }
  }
};

MapBuilder.prototype.addWallStep = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.walls.addSlice(SliceType.STEP, y);
};

MapBuilder.prototype.createWallSpan = function(
  heightIndex, spanLength, noFront, noBack
) {
  noFront = noFront || false;
  noBack = noBack || false;

  if (noFront == false && spanLength > 0)
  {
    this.addWallFront(heightIndex);
    spanLength--;
  }

  var midSpanLength = spanLength - (noBack ? 0 : 1);
  if (midSpanLength > 0)
  {
     this.addWallMid(heightIndex, midSpanLength);
     spanLength -= midSpanLength;
  }

  if (noBack == false && spanLength > 0)
  {
    this.addWallBack(heightIndex);
  }
};

MapBuilder.prototype.createSteppedWallSpan = function(
   heightIndex, spanALength, spanBLength
) {
  if (heightIndex < 2)
  {
    heightIndex = 2;
  }

  this.createWallSpan(heightIndex, spanALength, false, true);
  this.addWallStep(heightIndex - 2);
  this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false);
};

MapBuilder.prototype.generateNextWall = function(boxWorld) {

	// const polyFixture = new Box2D.Dynamics.b2FixtureDef();
 //    polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
 //    polyFixture.density = 1;

 //    const bodyDef = new Box2D.Dynamics.b2BodyDef();
 //    bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

 //    polyFixture.shape.SetAsBox(10, 1);
 //    bodyDef.position.Set(9, STAGE_HEIGHT / METER + 1);
 //    boxWorld.CreateBody(bodyDef).CreateFixture(polyFixture);


	var height = Math.floor((Math.random() * 3));
	var width = Math.floor((Math.random() * 25) + 5);
	var width2 = Math.floor((Math.random() * 25) + 5);
	var gap = Math.floor((Math.random() * 2) + 1);

	var front = false;
	var stepped = false;

	if ( Math.floor((Math.random() * 2)) == 0 ) {
		front = false;
	}
	else {
		front = true;
	}

	if ( Math.floor((Math.random() * 2)) == 0 ) {
		stepped = false;
	}
	else {
		stepped = true;
	}

	// this.floor.m_body.m_xf.position.y = 500;

	// this.floor.m_body.SetTransform(new Box2D.Common.Math.b2Vec2(0, 400), 0);
	// this.floor.m_body.SetTransform(this.floor.m_body.GetPosition(), 0);
	var transform = new Box2D.Common.Math.b2Transform;
	transform.position.y = MapBuilder.WALL_HEIGHTS[height];
	this.floor.GetBody().SetTransform(transform);
	// console.log(this.floor.GetBody().GetPosition());

	if(stepped) {
		this.createGap(gap);
		this.createSteppedWallSpan(0, width, width2);
		return width + width2;
	}
	else {
		this.createGap(gap);
		this.createWallSpan(height, width, front);
		return width;
	}
	
};
