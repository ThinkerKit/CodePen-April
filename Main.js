function Main() {
  this.stage = new PIXI.Stage(0x66FF99);
  this.renderer = new PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  this.bodies = [];
  this.actors = [];
  this.world;

  this.scrollSpeed = Main.MIN_SCROLL_SPEED;

  this.loadSpriteSheet();
}

Main.MIN_SCROLL_SPEED = 5;
Main.MAX_SCROLL_SPEED = 15;
Main.SCROLL_ACCELERATION = 0.005;

Main.prototype.update = function() {
  this.scroller.moveViewportXBy(this.scrollSpeed, this.world);
  this.scrollSpeed += Main.SCROLL_ACCELERATION;
  if (this.scrollSpeed > Main.MAX_SCROLL_SPEED)
  {
    this.scrollSpeed = Main.MAX_SCROLL_SPEED;
  }

  this.world.Step(1 / 60,  3,  3);
  this.world.ClearForces();
  
  const n = this.actors.length;
  for (var i = 0; i < n; i++)
  {
      var body  = this.bodies[i];
      var actor = this.actors[i];
      if(body !== undefined) {
        var position = body.GetPosition();
        // body.ApplyForce(new Box2D.Common.Math.b2Vec2(10, 0), position);
        if(position !== undefined) {
          actor.position.x = position.x;
          actor.position.y = position.y;
          actor.rotation = body.GetAngle();
        }
      }
  }

  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
  var assetsToLoad = ["resources/wall.json", "assets/ball.png"];
  loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = this.assetsLoaded.bind(this);
  loader.load();
};

Main.prototype.assetsLoaded = function() {

  const METER = 100;

  this.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 30),  false);

  const circleFixture = new Box2D.Dynamics.b2FixtureDef();
  circleFixture.shape = new Box2D.Collision.Shapes.b2CircleShape();
  circleFixture.density = 1;
  circleFixture.mass = 50;
  circleFixture.restitution = 1;

  const bodyDef = new Box2D.Dynamics.b2BodyDef();
  // bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
  bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  // bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
  bodyDef.position.Set(200, 0);
  var body = this.world.CreateBody(bodyDef);

  circleFixture.shape.SetRadius(80 / 2 / METER);
  body.CreateFixture(circleFixture);
  this.bodies.push(body);
  
  var ball = new PIXI.Sprite(PIXI.Texture.fromFrame("assets/ball.png"));
  ball.position.x = body.GetPosition().x;
  ball.position.y = body.GetPosition().y;
  
  // ball.i = i;
  ball.anchor.x = ball.anchor.y = 0.5;
  ball.scale.x = ball.scale.y = 80 / 100;
  
  this.actors[this.actors.length] = ball;

  console.log(this.bodies[0].GetPosition());
  console.log(this.actors[0].position);
  console.log(this.stage);

  this.scroller = new Scroller(this.stage, this.world);
  this.stage.addChild(ball);
  requestAnimFrame(this.update.bind(this));
};
