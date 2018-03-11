// This is the main JS file.
window.onload = init;

const WIDTH = 964; //Current canvas width
const HEIGHT = 546; //Current canvas height

var frameRate = 1/40; //seconds
var frameDelay = frameRate * 1000; //ms
var loopTimer;
var mouse = {x:0, y:0};
var gravity = 0.5;
var bounce_factor = 0.8;

// A test blob
var blob = {
    pos: {x: WIDTH/2, y: HEIGHT/3},
    velocity: {x: 0, y: 0},
    mass: 0.1, //kg
    rad: 15 // 1px = 1cm
};

//var Cd = 0.47;  // Dimensionless
//var rho = 1.22; // kg / m^3
//var A = Math.PI * blob.rad * blob.rad / (10000); // m^2
//var ag = 9.81;  // m / s^2


function init(){

    // Initialize WebGL.
    canvas = document.getElementById("gl-canvas");
    ctx = canvas.getContext("2d"); //Rendering in 2D

    canvas.onclick = getMousePosition;

    ctx.fillStyle = 'blue'; //Sets the filled color for the blob
    ctx.strokeStyle = '#000000'; //Sets the outline color for the blob
    loopTimer = setInterval(loop, frameDelay);
}

function getMousePosition(event) {
    mouse.x = event.clientX - canvas.offsetLeft; //Get the x-coordinate of the mouse
    mouse.y = event.clientY - canvas.offsetTop; //Get the y-coordinate of the mouse
    blob.pos.x = mouse.x; //Set mouse.x as the blob's x-coordinate
    blob.pos.y = mouse.y; //Set mouse.y as the blob's y-coordinate
    blob.velocity.x = 0; //Reset the blob's velocity.x
    blob.velocity.y = 0; //Reset the blob's velocity.y

    //For testing purposes
    var coords = "X coords: " + mouse.x + ", Y coords: " + mouse.y;
    console.log(coords); //Print the coordinates to the console
}


var loop = function() {
    blob.velocity.y += gravity; //Set the blob's new velocity.y

    blob.pos.x += blob.velocity.x; //Set the blob's new x-coordinate
    blob.pos.y += blob.velocity.y; //Set the blob's new y-coordinate

    //Example code I found
    /*if ( ! mouse.isDown) {
        // Do physics
        // Drag force: Fd = -1/2 * Cd * A * rho * v * v
        var Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
        var Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);
        Fx = (isNaN(Fx) ? 0 : Fx);
        Fy = (isNaN(Fy) ? 0 : Fy);
        // Calculate acceleration ( F = ma )
        var ax = Fx / ball.mass;
        var ay = ag + (Fy / ball.mass);
        // Integrate to get velocity
        ball.velocity.x += ax*frameRate;
        ball.velocity.y += ay*frameRate;
        // Integrate to get position
        ball.position.x += ball.velocity.x*frameRate*100;
        ball.position.y += ball.velocity.y*frameRate*100;
    }*/


    // Handle collisions with the perimeter of the canvas
    if (blob.pos.y > HEIGHT - blob.rad || blob.pos.x > WIDTH - blob.rad || blob.pos.x < blob.rad) {
        blob.pos.y = HEIGHT - blob.rad;
        //blob.pos.x = WIDTH/2;

        blob.velocity.x = 0; //Set the blob's velocity x
        blob.velocity.y *= -bounce_factor; //Set the blob's velocity y
    }

    // Draw the blob
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    ctx.save();

    ctx.translate(blob.pos.x, blob.pos.y);
    ctx.beginPath();
    ctx.arc(0, 0, blob.rad, 0, Math.PI*2, true); //Create the blob using arcs
    ctx.fill(); //Fill the blob
    //ctx.stroke(); //Outline the blob
    ctx.closePath();

    ctx.restore();

}