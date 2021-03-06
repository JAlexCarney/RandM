
var birds = [];
var worldH = 1080;
var worldW = 1920;

function setup() {
  createCanvas(worldW, worldH);
  noStroke();
  
  for(var i = 0; i < 75; i++){
	birds[i] = randomBird();
  }
}

var count = 0;
function birdclick(){
	var par = document.getElementById("dynamicP");
	count++;
	par.innerHTML = "bird has been clicked " + count + " times!"; 
}

function draw() {
	background("#150F4c");
  	for(var i = 0; i < birds.length; i++){
  		birds[i].update();
  		birds[i].draw();
  	}
}

function randomBird(){
	var centerX = Math.random()*worldW;
	var	centerY = Math.random()*worldH;
	var size = Math.random()*50 + 25;
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	var angle = Math.random() * Math.PI * 2;

	var bird = new Bird(centerX, centerY, angle, size, color);
	
	var ySpeed = (Math.random()*2) + 0.25;
	var rotationSpeed = (ySpeed * 0.025);

	bird.setSpeed(0, ySpeed, rotationSpeed);

	return bird;
}

function randomShape() {
	var numShapes = 4;
	var chosenShape = Math.floor(Math.random() * numShapes);
	var centerX = Math.random()*700;
	var	centerY = Math.random()*700;
	var size = Math.random()*50 + 25;

	fill(Math.random()*255,Math.random()*255,Math.random()*255);
	if(chosenShape === 0){
		square(centerX, centerY, size);
	}else if(chosenShape === 1){
		circle(centerX, centerY, size)
	}else if(chosenShape === 2){
		triangle(centerX + size, centerY + size, centerX - size, centerY + size, centerX, centerY - size);
	}else if(chosenShape === 3){
		triangle(centerX + size, centerY + size, centerX - size, centerY + size, centerX, centerY - size);
		triangle(centerX + size, centerY - size, centerX - size, centerY - size, centerX, centerY + size);	
	}
}

class Bird {

	constructor(x, y, angle, size, color){
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.size = size;
		this.color = color;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.rotationSpeed = 0;
	}

	update(){
		this.move(this.xSpeed, this.ySpeed);
		this.rotate(this.rotationSpeed);
	}

	draw(){
		push();
		translate(this.x, this.y);
		rotate(this.angle);

		// legs beak and eye
		fill("#FF7F2A");
		triangle(0, 0, this.size, 0, 0, this.size);
		rect(this.size/4, this.size, this.size/4, this.size/4);
		rect(-this.size/2, this.size, this.size/4, this.size/4);

		// body
		fill(this.color);
		triangle(0, -this.size, -this.size, this.size, this.size, this.size);

		// eye
		fill("#4A1D91");
		circle(0, -this.size/4, this.size/4);

		pop();
	}

	setSpeed(x, y, theta){
		this.xSpeed = x;
		this.ySpeed = y;
		this.rotationSpeed = theta;
	}

	move(x, y){
		this.x += x;
		this.y += y;

		if(this.y > worldH + this.size*2){
			this.y = -this.size*2;
		}
	}

	rotate(theta){
		this.angle += theta;
	}

}