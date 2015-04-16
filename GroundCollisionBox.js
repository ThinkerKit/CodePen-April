function GroundCollisionBox(height, width) {
   // Init p2.js
	world = new p2.World();

	// Add a box
	boxShape = new p2.Rectangle(2,1);
	boxBody = new p2.Body({
	    mass:1,
	    position:[0,2],
	    angularVelocity:1
	});
	boxBody.addShape(boxShape);
	world.addBody(boxBody);

	// Add a plane
	planeShape = new p2.Plane();
	planeBody = new p2.Body({ position:[0,-1] });
	planeBody.addShape(planeShape);
	world.addBody(planeBody);
}