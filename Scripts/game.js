function setup()
{
 
  draw();
}
 
 
// set the scene size
var WIDTH = 640,
HEIGHT = 360;

// scene object variables
var renderer, scene, camera, pointLight, spotLight;

// field variables
var fieldWidth = 400, fieldHeight = 200;
 
// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
 
// start the renderer
renderer.setSize(WIDTH, HEIGHT);
 
// attach the render-supplied DOM element (the gameCanvas)
var c = document.getElementById("gameCanvas");
c.appendChild(renderer.domElement);
 

 // set up the playing surface plane 
    var planeWidth = fieldWidth,
            planeHeight = fieldHeight,
            planeQuality = 10;
                
        // create the paddle1's material
    var paddle1Material =
      new THREE.MeshLambertMaterial(
            {
              color: 0x1B32C0
            });
        // create the paddle2's material
        var paddle2Material =
          new THREE.MeshLambertMaterial(
                {
                  color: 0xFF4045
                });
        // create the plane's material        
        var planeMaterial =
          new THREE.MeshLambertMaterial(
                {
                  color: 0x4BD121
                });
        // create the table's material
        var tableMaterial =
          new THREE.MeshLambertMaterial(
                {
                  color: 0x111111
                });
        // create the pillar's material
        var pillarMaterial =
          new THREE.MeshLambertMaterial(
                {
                  color: 0x534d0d
                });
        // create the ground's material
        var groundMaterial =
          new THREE.MeshLambertMaterial(
                {
                  color: 0x888888
                });

// // create a point light
pointLight = new THREE.PointLight(0xF8D898);
 
// set its position
pointLight.position.x = -1000;
pointLight.position.y = 0;
pointLight.position.z = 1000;
pointLight.intensity = 2.9;
pointLight.distance = 10000;
 

 // create the plane's material	
var planeMaterial =
new THREE.MeshLambertMaterial(
{
    color: 0x4BD121
});
 
// create the playing surface plane
var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(
    planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
    planeHeight,
    planeQuality,
    planeQuality),
    planeMaterial);


 // ---------------------------------
// Based on Aerotwist's cool tutorial - http://www.aerotwist.com/tutorials/getting-started-with-three-js/ 
// ---------------------------------
 
// set up the sphere vars
// lower 'segment' and 'ring' values will increase performance
var radius = 5,
segments = 6,
rings = 6;
 


// create the sphere's material
var sphereMaterial =
new THREE.MeshLambertMaterial(
{
color: 0xD43001
});
 
// Create a ball with sphere geometry
var ball = new THREE.Mesh(
    new THREE.SphereGeometry(radius,
    segments,
    rings),
    sphereMaterial);
 


 // set the scene size
 var WIDTH = 640,
  HEIGHT = 360;

 // set some camera attributes
var VIEW_ANGLE = 15,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;



var camera = new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);

// create a point light
var pointLight = new THREE.PointLight(0xF8D898);

// set its position
pointLight.position.x = -1000;
pointLight.position.y = 0;
pointLight.position.z = 1000;
pointLight.intensity - 2.9;
pointLight.distance = 10000;

// set a default position for the camera
camera.position.z = 1000;



// set up the paddle vars
paddleWidth = 10;
paddleHeight = 30;
paddleDepth = 10;
paddleQuality = 1;
 
// set up paddle 1
paddle1 = new THREE.Mesh(
  new THREE.CubeGeometry(
    paddleWidth,
    paddleHeight,
    paddleDepth,
    paddleQuality,
    paddleQuality,
    paddleQuality),
  paddle1Material);
 

 
// Set up the second paddle
paddle2 = new THREE.Mesh(
  new THREE.CubeGeometry(
    paddleWidth,
    paddleHeight,
    paddleDepth,
    paddleQuality,
    paddleQuality,
    paddleQuality),
  paddle2Material);
 

 
// set paddles on each side of the table
paddle1.position.x = -fieldWidth/2 + paddleWidth;
paddle2.position.x = fieldWidth/2 - paddleWidth;
 
// lift paddles over playing surface
paddle1.position.z = paddleDepth;
paddle2.position.z = paddleDepth;


// create scene
var scene = new THREE.Scene();
 
 // add the sphere to the scene
scene.add(ball);
// add the camera to the scene
scene.add(camera);
// add to the scene
scene.add(pointLight);
// add plane to the scene
scene.add(plane);
// add pointLight to the scene
scene.add(pointLight);

// add the paddle to the scene
scene.add(paddle1);

// Add the second paddle to the scene
scene.add(paddle2);




 
function draw()
{  
    // draw THREE.JS scene
    renderer.render(scene, camera);
 
    // loop the draw() function
    requestAnimationFrame(draw);
 
    // process game logic
}