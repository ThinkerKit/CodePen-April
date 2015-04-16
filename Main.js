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
  this.canJump = false;

  this.scrollSpeed = Main.MIN_SCROLL_SPEED;

  this.loadSpriteSheet();
}

Main.MIN_SCROLL_SPEED = 5;
Main.MAX_SCROLL_SPEED = 10;
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
        // body.ApplyForce(new Box2D.Common.Math.b2Vec2(0, 100), position);
        // console.log(body.GetInertia());
        if(position !== undefined) {
          actor.position.x = position.x;
          actor.position.y = position.y;
          actor.rotation = body.GetAngle();
        }
      }
  }

  if(this.world.GetContactList() != null) {
    if(this.world.GetContactList().GetFixtureA().GetRestitution() == 1 || this.world.GetContactList().GetFixtureB().GetRestitution() == 1) {
      this.canJump = true;
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

  this.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 100),  false);

  const circleFixture = new Box2D.Dynamics.b2FixtureDef();
  circleFixture.shape = new Box2D.Collision.Shapes.b2CircleShape();
  circleFixture.density = 50;
  circleFixture.restitution = 0.7;

  const bodyDef = new Box2D.Dynamics.b2BodyDef();
  // bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
  bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  // bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
  bodyDef.position.Set(200, 50);
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

  body.ApplyForce(new Box2D.Common.Math.b2Vec2(0, 100000), body.GetPosition());
  console.log(body.GetInertia());

  console.log(body);
  
  this.actors[this.actors.length] = ball;

  const polyFixture = new Box2D.Dynamics.b2FixtureDef();
  polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
  polyFixture.density = 1;

  const ceilingBodyDef = new Box2D.Dynamics.b2BodyDef();
  ceilingBodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

  polyFixture.shape.SetAsBox((1000), 1);
  ceilingBodyDef.position.Set((250), 0);
  var ceiling = this.world.CreateBody(ceilingBodyDef).CreateFixture(polyFixture);


  this.scroller = new Scroller(this.stage, this.world);
  this.stage.addChild(ball);
  requestAnimFrame(this.update.bind(this));

  // document.addEventListener("keypress", this.jump(), false);

  document.addEventListener("keypress", function(event) {
    var keyCode = event.keyCode;
    if(keyCode == 32){
        main.jump();
    }
  }, false);
};

Main.prototype.jump = function() {
  var jumpBody  = this.bodies[0];
  var jumpPos = jumpBody.GetPosition();
  if(this.canJump) {
    jumpBody.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, -9999999), jumpBody.GetPosition());
    this.canJump = false;    
  }
};





//     document.addEventListener("keyPress", myEventHandler, false);
// });

// function myEventHandler(e){
//     var keyCode = e.keyCode;
//     if(keyCode == 88){
//         console.log("You pressed W!");
//         alert("You pressed W!");
//     }
// };