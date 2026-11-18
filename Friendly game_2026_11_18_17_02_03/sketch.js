
var beta, gamma; 
var x = 0; 
var y = 0;
var z = 0;
var xPosition = 0;
var yPosition = 0;
let img1, img2, img3;

var cars = [];
var frogPos;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  alpha = 0;
  beta = 0;
  gamma = 0;


  frogPos = createVector(width / 2, height - 80);

  flyImage = await loadImage("blade.png");
  frogImage = await loadImage("mower.png");
  bgImage = await loadImage("grass.jpeg")
  
    for (var i = 0; i < 40; i++) {
    cars.push(new Car());
  }

  imageMode(CENTER);
  rectMode(CENTER);
  noStroke();
}



function draw() {
  if (bgImage) {
    image(bgImage, width/2, height/2, width, height);
  } else {
    background(100);
  }

  xPosition = map(gamma, -18, 18, 0, width);
  yPosition = map(beta, 25, 45, 0, height);

  
  push(); 
  translate(xPosition, yPosition); 
  image(frogImage, 0, 0, 100, 100);
  pop();

  frogPos.x = xPosition;
  frogPos.y = yPosition;

  for (var i = 0; i < cars.length; i++) {
    cars[i].display();
    cars[i].drive();
    if (cars[i].pos.dist(frogPos) < 50) {
      cars.splice(i, 1);
    }
  }
}

function deviceShaken() {
  cars = [];
  for (var i = 0; i < 40; i++) {
    cars.push(new Car());
  }
}

window.addEventListener("deviceorientation", function (e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});

window.addEventListener("devicemotion", function (e) {
  x = e.acceleration.x;
  y = e.acceleration.y;
  z = e.acceleration.z;
});


class Car {
constructor() {
  this.pos = createVector(100, 100);
  this.vel = createVector(random(-5, 5), random(-5, 5));

}
  display() {
    image(flyImage, this.pos.x, this.pos.y, 100, 100);
  }

  drive() {
    this.pos.add(this.vel);

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}

function startMotionListeners() {
  window.addEventListener("deviceorientation", (e) => {
    alpha = e.alpha;
    beta = e.beta;
    gamma = e.gamma;
  });

  window.addEventListener("devicemotion", (e) => {
    x = e.acceleration.x;
    y = e.acceleration.y;
    z = e.acceleration.z;
  });
}
