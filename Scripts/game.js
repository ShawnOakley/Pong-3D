function setup()
{
 
  draw();
}
 
 


// game-related variables
var score1 = 0, score2 = 0;
 
// you can change this to any positive whole number
var maxScore = 7;

// checks if either player or opponent has reached 7 points
function matchScoreCheck()
{
    // if player has 7 points
    if (score1 >= maxScore)
    {
        // stop the ball
        ballSpeed = 0;
        // write to the banner
        document.getElementById("scores").innerHTML = "Player wins!";       
        document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
    }
    // else if opponent has 7 points
    else if (score2 >= maxScore)
    {
        // stop the ball
        ballSpeed = 0;
        // write to the banner
        document.getElementById("scores").innerHTML = "CPU wins!";
        document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
    }
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

// Game Logic for ball

// ball's x-direction, y-direction and speed per frame
var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

// update ball position over time
ball.position.x += ballDirX * ballSpeed;
ball.position.y += ballDirY * ballSpeed;

// limit ball's y-speed to 2x the x-speed
// this is so the ball doesn't speed from left to right super fast
// keeps game playable for humans
if (ballDirY > ballSpeed * 2)
{
    ballDirY = ballSpeed * 2;
}
else if (ballDirY < -ballSpeed * 2)
{
    ballDirY = -ballSpeed * 2;
}
 
// if ball goes off the top side (side of table)
if (ball.position.y <= -fieldHeight/2)
{
    ballDirY = -ballDirY;
}   
 
// if ball goes off the bottom side (side of table)
if (ball.position.y >= fieldHeight/2)
{
    ballDirY = -ballDirY;
}
 

 // resets the ball's position to the centre of the play area
// also sets the ball direction speed towards the last point winner
 
function resetBall(loser)
{
    // position the ball in the center of the table
    ball.position.x = 0;
    ball.position.y = 0;
    
    // if player lost the last point, we send the ball to opponent
    if (loser == 1)
    {
        ballDirX = -1;
    }
    // else if opponent lost, we send ball to player
    else
    {
        ballDirX = 1;
    }
    
    // set the ball to move +ve in y plane (towards left from the camera)
    ballDirY = 1;
}
 
// if ball goes off the 'left' side (Player's side)
if (ball.position.x <= -fieldWidth/2)
{    
    // CPU scores
    score2++;
    
    // update scoreboard HTML
    document.getElementById("scores").innerHTML = score1 + "-" + score2;
    
    // reset ball to center
    resetBall(1);
    
    // check if match over (someone scored maxScore points)
    matchScoreCheck();
}
 
// if ball goes off the 'right' side (CPU's side)
if (ball.position.x >= fieldWidth/2)
{
    // player scores a point
    score1++;

    // update scoreboard
    document.getElementById("scores").innerHTML = score1 + "-" + score2;

    // and reset ball
    matchScoreCheck();
    resetBall(2);
}



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
var paddleWidth = 10;
var paddleHeight = 30;
var paddleDepth = 10;
var paddleQuality = 1;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;
 
// set up paddle 1
var paddle1 = new THREE.Mesh(
  new THREE.CubeGeometry(
    paddleWidth,
    paddleHeight,
    paddleDepth,
    paddleQuality,
    paddleQuality,
    paddleQuality),
  paddle1Material);
 

 
// Set up the second paddle
var paddle2 = new THREE.Mesh(
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


// Game logic for paddles.  Note that Key is defined in keyboard.js

 
// move left
if (Key.isDown(Key.A))      
{
    console.log('click')
    // if paddle is not touching the side of table
    // we move
    if (paddle1.position.y < fieldHeight * 0.45)
    {
        paddle1DirY = paddleSpeed * 0.5;
    }
    // else we don't move and stretch the paddle
    // to indicate we can't move
    else
    {
        paddle1DirY = 0;
        paddle1.scale.z += (10 - paddle1.scale.z) * 0.2;
    }
}

// opponent A.I.

var difficulty = 1;
paddle2DirY = (ball.position.y - paddle2.position.y) * difficulty;

// in case the Lerp function produces a value above max paddle speed, we clamp it
if (Math.abs(paddle2DirY) <= paddleSpeed)
{   
    paddle2.position.y += paddle2DirY;
}
// if the lerp value is too high, we have to limit speed to paddleSpeed
else
{
    // if paddle is lerping in +ve direction
    if (paddle2DirY > paddleSpeed)
    {
        paddle2.position.y += paddleSpeed;
    }
    // if paddle is lerping in -ve direction
    else if (paddle2DirY < -paddleSpeed)
    {
        paddle2.position.y -= paddleSpeed;
    }
}

// We lerp the scale back to 1
// this is done because we stretch the paddle at some points
// stretching is done when paddle touches side of table and when paddle hits ball
// by doing this here, we ensure paddle always comes back to default size
 
paddle2.scale.y += (1 - paddle2.scale.y) * 0.2; 

// if ball is aligned with paddle1 on x plane
// remember the position is the CENTER of the object
// we only check between the front and the middle of the paddle (one-way collision)
 
if (ball.position.x <= paddle1.position.x + paddleWidth
&&  ball.position.x >= paddle1.position.x)
{
    // and if ball is aligned with paddle1 on y plane
 
    if (ball.position.y <= paddle1.position.y + paddleHeight/2
    &&  ball.position.y >= paddle1.position.y - paddleHeight/2)
    {
        // ball is intersecting with the front half of the paddle
    }   
}   

// and if ball is travelling towards player (-ve direction)
if (ballDirX < 0)
{
    // stretch the paddle to indicate a hit
    paddle1.scale.y = 15;
 
    // switch direction of ball travel to create bounce
    ballDirX = -ballDirX;
 
    // we impact ball angle when hitting it
    // this is not realistic physics, just spices up the gameplay
    // allows you to 'slice' the ball to beat the opponent
    ballDirY -= paddle1DirY * 0.7;
}

// create a point light
pointLight = new THREE.PointLight(0xF8D898);
 
// set its position
pointLight.position.x = -1000;
pointLight.position.y = 0;
pointLight.position.z = 1000;
pointLight.intensity = 2.9;
pointLight.distance = 10000;
 
// add a spot light
// this is important for casting shadows
spotLight = new THREE.SpotLight(0xF8D898);
spotLight.position.set(0, 0, 460);
spotLight.intensity = 1.5;
spotLight.castShadow = true;

 
// MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
renderer.shadowMapEnabled = true;

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
paddle1.receiveShadow = true;
paddle1.castShadow = true;

// Add the second paddle to the scene
scene.add(paddle2);

// Adds a spotlight
scene.add(spotLight);




 
function draw()
{  
    // we can easily notice shadows if we dynamically move lights during the game
    spotLight.position.x = ball.position.x;
    spotLight.position.y = ball.position.y;
    // draw THREE.JS scene
    renderer.render(scene, camera);
 
    // loop the draw() function
    requestAnimationFrame(draw);
 
    // process game logic
}