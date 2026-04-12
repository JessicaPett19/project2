// CREDITS

// Win Screen Confetti Gif by viaductk on pixabay
// Font is Play Pretend by Chequered Ink on dafont.com

// Target Hit Sound FX: https://www.youtube.com/watch?v=YNSbL-Cek1c
// Special Target Hit Sound FX: https://www.youtube.com/watch?v=aqCxlxclyzo
// Dummy Target SFX: https://www.youtube.com/watch?v=eWOQfJlIeMU
// Applause SFX: https://www.youtube.com/watch?v=0mfJn604GT4

// All other backgrounds/graphic assets by Jessica





// VARIABLE SETUP

let target;
let specialTarget;
let specialTargetTimer = 0;
let state = 0;
let pixelFont;
let bgImg;
let targetImg;
let specialTargetImg;
let evilSpecialTarget;
let evilDuckyGif;
let confettiImg;
let crosshairImg;
let targetHitSFX;
let DuckQuack;
let DummySFX;
let ApplauseSFX;

let gameOver = false;
let gameOver2 = false;
let gameOver3 = false;
let score1 = 0;
let score2 = 0;
let score3 = 0;
let timeLeft1 = 60;
let startTime1;
let timer1
let timeLeft2 = 60;
let startTime2;
let timer2;
let startTime3 = 60;
let timeLeft3;
let timer3;
enlarge = 0;
let dummyTimer = 0;

function preload() {
  pixelFont = loadFont("Play Pretend.otf");
  bgImg = loadImage("GRID ASSET-01.png");
  targetImg = loadImage("TARGET.png");
  specialTargetImg = loadImage("RUBBER DUCKY.png");
  evilSpecialTarget = loadImage("EVIL DUCKY.png");
  evilDuckyGif = loadImage("EVIL-DUCKY-GIF.gif");
  confettiImg = loadImage("viaductk-celebration-19390.gif")
  crosshairImg = loadImage("CROSSHAIR.png")
  targetHitSFX = loadSound('Target Hit SFX.mp3');
  DuckQuack = loadSound('Duck Quack.mp3');
  DummySFX = loadSound('DummySFX.mp3');
  ApplauseSFX = loadSound('Applause SFX.mp3');
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
}

function draw() {
  background(0);

  if (state == "0") {
    draw1();
  } else if (state == "1") {
    draw2();
  } else if (state == "2") {
    startGame();
  } else if (state == "3") {
    failScreen1();
  } else if (state == "4") {
    winScreen1();
  } else if (state == "5") {
    Round2();
  } else if (state == "6") {
    failScreen2();
  } else if (state == "7") {
    winScreen2();
  } else if (state == "8") {
    Round3();
  } else if (state == "9") {
    failScreen3();
  } else if (state == "10") {
    winScreen3();
  }
}

function keyPressed() {
  //checks if we are in the main menu and if we press the space bar
  if (state == "0" && keyIsDown(32)) {
    state = "1"; //sets state to 1
    startTime2 = millis();
    score2 = 0;
    gameOver2 = false;
    specialTargetTimer = millis();
  }
  
  if (state == "1" && keyIsDown(49)) {
    state = "5"; // SHORTCUT TO ROUND 2: Press 1
  }
  
  if (state == "1" && keyIsDown(50)) {
    state = "8"; // SHORTCUT TO ROUND 3: Press 2
  }
  
  if (state == "8" && keyIsDown(51)) {
    state = "10"; // SHORTCUT TO FINAL WIN SCREEN: Press 3
    ApplauseSFX.play();
  }
}

function mousePressed() {
  
  // GO TO ROUND 1 AND RESTART ROUND 1
  
  if (state == "1") {
    state = "2"; 
  }
  
  if (state == "3") {
    state = "2";
  }
}

// INITIAL STATES

function draw1() {
  
  // TITLE SCREEN = STATE 0
  
  background(70);
  image(bgImg, width / 2, height / 2, 600, 600);
  textSize(60);
  fill(255);
  textFont(pixelFont);
  text("AIM TRAINER", 100, 302);
  textSize(15);
  textSize(20);
  text("PRESS SPACE FOR INSTRUCTIONS", 115, 330);
}

function draw2() {
  
  // INSTRUCTIONS SCREEN = STATE 1
  
  image(bgImg, width / 2, height / 2, 600, 600);
  strokeWeight(0);
  fill(20, 0, 0, 180);
  rect(50, 50, 500, 500, 20);

  textSize(15);
  textFont(pixelFont);
  fill(255);
  text("Use cursor to hit targets", 182, 260);
  text("You get 1 point for Normal Targets", 140, 290);
  text("And 3 points for Special Targets", 148, 310);
  text("Reach the goal to make it to the next level", 100, 350);
  textSize(20);
  fill("#fc0324");
  text("When ready, click to start", 140, 390);
}

function startGame() {
  
  // ROUND 1 = STATE 2
  
  background(0);
  image(bgImg, width / 2, height / 2, 600, 600);
  
  noCursor();
  image(crosshairImg, mouseX, mouseY,30, 30);
  
  if (!gameOver) {
    // Timer
    let elapsed = floor((millis() - startTime1) / 1000);
    timeLeft1 = 60 - elapsed;
    if (timeLeft1 <= 0) {
      gameOver = true;
      timeLeft1 = 0;
      state = "3";
    }
  }
    
  if (!target) { 
    spawnTarget();
  }
  
  fill(0, 0, 0, 170);
  rect(0,0,width,50);
  textSize(25);
  textFont(pixelFont);
  fill(255);
  text("Score:" + score1, 25, 32);
  text("Goal: 60", 175, 32);
  text("Time Left:" + timeLeft1, width-200,32);
  
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(mouseX, mouseY, 25);
  
  target.display();
  target.grow();
  
  timer1 = (millis() - startTime1) / 1000;
  
  if (score1 >= 60) {
    state = "4" 
  }
  
  // GEMINI HELP: Special Target Entering every 5s
    
  let specialElapsed = millis() - specialTargetTimer;

  if (specialElapsed >= 5000 && !specialTarget) {
    spawnSpecialTarget();
    specialTargetTimer = 0;
  }

  if (specialTarget) {
    specialTarget.display();
    specialTarget.move();
  }

}

// SPAWN TARGET & SPECIAL TARGET FUNCTIONS

function spawnTarget() {
   let x = random(30, width-30);
   let y = random(70, height-30);
   let w1 = 30;
   let h1 = 30;

   target = new Target(x, y, w1, h1);
  }

function spawnSpecialTarget() {
  let x = random(30, width-30);
  let y = random(70, height-30);
  let w1 = 50;
  let h1 = 50;
  
  // Check if we are in Round 3
  if (state == "8") {
    let chance = random(1);
    if (chance < 0.5) { 
      specialTarget = new SpecialTarget(x, y);
    } else {
      specialTarget = new DummyTarget(x, y);
    }
  } else {
    // Round 1 and 2 will ONLY spawn the good target
    specialTarget = new SpecialTarget(x, y);
  }
}

// STATE SWITCH & TARGET HIT LOGIC

function mousePressed() {
  
// I got Gemini to help me a lot with the logic errors I got in this portion of my code

// 1. Instructions -> Start Round 1
  if (state == "1") {
    state = "2";
    startTime1 = millis();
    timer1 = millis() / 1000;
    score1 = 0;
    gameOver = false;
    specialTargetTimer = millis(); // Reset timer
  }

  // 2. Fail Screen -> Restart Round 1
  else if (state == "3") {
    state = "2";
    startTime1 = millis();
    timer1 = millis() / 1000;
    timeLeft1 = 60;
    score1 = 0;
    gameOver = false;
  }

  // 3. Win Screen 1 -> Start Round 2
  else if (state == "4") {
    state = "5";
    startTime2 = millis();
    timer2 = millis() / 1000;
    score2 = 0;
    gameOver2 = false;
    specialTargetTimer = millis();
  }

  // 4. ROUND 1 TARGET HITS
  else if (state == "2") {
    if (target && target.isHit(mouseX, mouseY)) {
      score1++;
      spawnTarget();
      targetHitSFX.play();
    }
    if (specialTarget && specialTarget.isHit(mouseX, mouseY)) {
      score1 += 3;
      specialTarget = null;
      specialTargetTimer = millis();
      DuckQuack.play();
    }
  }

  // 5. ROUND 2 TARGET HITS
  else if (state == "5") {
    if (target && target.isHit(mouseX, mouseY)) {
      score2++;
      spawnTarget();
      targetHitSFX.play();
    }
    if (specialTarget && specialTarget.isHit(mouseX, mouseY)) {
      score2 += 3;
      specialTarget = null;
      specialTargetTimer = millis();
      DuckQuack.play();
    }
  }

  // 6. Fail Screen 2 -> Restart Round 2
  else if (state == "6") {
    state = "5";
    startTime2 = millis();
    timer2 = millis() / 1000;
    score2 = 0;
    gameOver2 = false;
  }

  // 7. Win Screen 2 -> Start Round 3
  else if (state == "7") {
    state = "8";
    startTime3 = millis();
    score3 = 0;
    timer3 = millis() / 1000;
    gameOver3 = false;
    specialTargetTimer = millis();
  }

  // 8. ROUND 3 TARGET HITS
  else if (state == "8") {
  // Normal Target Logic
  if (target && target.isHit(mouseX, mouseY)) {
    score3++;
    spawnTarget();
    targetHitSFX.play();
  }
  
  // Special/Dummy Target Logic
  if (specialTarget && specialTarget.isHit(mouseX, mouseY)) {
  if (specialTarget instanceof DummyTarget) {
    specialTarget.isClicked = true; 
    dummyTimer = millis(); 
    DummySFX.play();
  } else {
    score3 += 3;
    specialTarget = null;
    specialTargetTimer = millis();
    DuckQuack.play();
  }
}  
}

  // 9. Fail Screen 3 -> Restart Round 3
  else if (state == "9") {
    state = "8";
    startTime3 = millis();
    timer3 = millis() / 1000;
    score3 = 0;
    gameOver3 = false;
    
    evilDuckyGif.reset(); 
    evilDuckyGif.play();
  }
}

// TARGET CLASSES

class Target {
  constructor(x, y, w1, h1) {
    this.x = x;
    this.y = y;
    this.w1 = w1;
    this.h1 = h1;
    
    this.speed = 3;
    let angle = random(TWO_PI);
    
    this.vx = cos(angle) * this.speed;
    this.vy = sin(angle) * this.speed;
  }
  display() {
    noStroke();
    fill(255);
    image(targetImg, this.x, this.y, this.w1+enlarge, this.h1+enlarge);
  }
  
  isHit(mx, my) {
    let currentWidth = this.w1 + enlarge; // Gets the enlarged  size data for Round 2
    let d = dist(mx, my, this.x, this.y);
    return d < currentWidth / 2;
  }
  
  shrink() {
    if (state == "5") { 
      this.w1 -= 0.55;   
      this.h1 -= 0.55;
    }
    
    if (state == "8") {
      this.w1 -= 0.35;
      this.h1 -= 0.35;
    }
    
    // If the target shrinks to nothing, spawn a new one
    if (this.w1 <= 0) {
      spawnTarget();
    }
  }
  
  grow() {
    if (state == "2") {
      this.w1 += 0.55;
      this.h1 += 0.55; 
    }

    if (state == "2" && this.w1 >= 90) {
      spawnTarget();
    }
  }
  
  move() {
  this.x += this.vx;
  this.y += this.vy;
    
  if (this.x < 0 || this.x > width) {
      this.vx *= -1; // Reverse direction
    }
  if (this.y < 70 || this.y > height) {
      this.vy *= -1; // Reverse direction
    }
  }
}

class SpecialTarget {
  constructor(x, y, w1, h1) {
    this.x = x;
    this.y = y;
    this.w1 = 50;
    this.h1 = 50;
    
    this.speed = 5;
    let angle = random(TWO_PI);
    
    this.vx = cos(angle) * this.speed;
    this.vy = sin(angle) * this.speed;
    
    this.spawnTime = millis();
  }
  display() {
    noStroke();
    fill(255,0,0);
    image(specialTargetImg, this.x, this.y, this.w1, this.h1);
  }
  isHit(mx, my) {
    let currentWidth2 = this.w1;
    let d = dist(mx, my, this.x, this.y);
    return d < currentWidth2 / 2;
  }
  
  move() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0 || this.x > width) {
      this.vx *= -1; // Reverse direction
    }
    if (this.y < 70 || this.y > height) {
      this.vy *= -1; // Reverse direction
    }
  }
}

class DummyTarget {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    
    this.speed = 5;
    let angle = random(TWO_PI);
    
    this.vx = cos(angle) * this.speed;
    this.vy = sin(angle) * this.speed;
    
    this.isClicked = false;
    this.spawnTime = millis();
    
    evilDuckyGif.setFrame(0); 
    evilDuckyGif.play();     
  }

  display() {
   if (this.isClicked) {
      image(evilDuckyGif, this.x, this.y, 50, 50); 
    } else {
      image(evilSpecialTarget, this.x, this.y, this.w, this.h);
    }
  }

  move() {
  if (!this.isClicked) { // Only move if NOT clicked
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 70 || this.y > height) this.vy *= -1;
    }
  }

 isHit(mx, my) {
    if (this.isClicked) return false; // So it can't be hit twice
    return dist(mx, my, this.x, this.y) < this.w / 2;
  }
}

// ALL OTHER STATES

function failScreen1() {
  
  // GAME OVER SCREEN 1 = STATE 3
  
  background(0);
  textSize(55);
  textFont(pixelFont);
  fill(255);
  text("Game Over", 132, 280);
  textSize(25);
  text("Click to Start Again", 150, 320);
}

function winScreen1() {
  
  // WIN SCREEN 1 = STATE 4
  
  background(0);
  textSize(35);
  textFont(pixelFont);
  fill(255);
  text("You shot things!", 133, 280);
  textSize(25);
  text("Your time:" + nf(timer1, 1, 2) + "s", 190, 320);
  text("Click to Start Next Round", 110,360);
}

function Round2() {
  
  // ROUND 2 = STATE 5
  
  background(0);
  image(bgImg, width / 2, height / 2, 600, 600);

  noCursor();
  image(crosshairImg, mouseX, mouseY,30, 30);
  
    if (!gameOver2) {
    // Timer
    let elapsed = floor((millis() - startTime2) / 1000);
    timeLeft2 = 60 - elapsed;
    if (timeLeft2 <= 0) {
      gameOver2 = true;
      timeLeft2 = 0;
      state = "6";
    }
  }
  
  if (!target) { 
    spawnTarget();
  }

  
  fill(0, 0, 0, 170);
  rect(0,0,width,50);
  textSize(25);
  textFont(pixelFont);
  fill(255);
  text("Score:" + score2, 25, 32);
  text("Goal: 50", 175, 32);
  text("Time Left:" + timeLeft2, width-200,32);
  
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(mouseX, mouseY, 25);
  
  target.display();
  target.shrink();
  
  timer2 = (millis() - startTime2) / 1000;
  
  if (score2 >= 50) {
    state = "7" 
  }
  
  enlarge = 40;
  
  let specialElapsed = millis() - specialTargetTimer;

  if (specialElapsed >= 5000 && !specialTarget) {
    spawnSpecialTarget();
    specialTargetTimer = 0;
  }

  if (specialTarget) {
    specialTarget.display();
    specialTarget.move();
  }
}

function failScreen2 () {
  
  // GAME OVER SCREEN 2 = STATE 6
  
  background(0);
  textSize(55);
  textFont(pixelFont);
  fill(255);
  text("Game Over", 132, 280);
  textSize(25);
  text("Click to Start Again", 150, 320);
}

function winScreen2 () {
  
  // WIN SCREEN 2 = STATE 7
  
  background(0);
  textSize(45);
  textFont(pixelFont);
  fill(255);
  text("Sweet!", 220, 280);
  textSize(25);
  text("Your time:" + nf(timer2, 1, 2) + "s", 190, 320);
  text("Click to Start Next Round", 110,350);
}

function Round3() {
  
  // ROUND 3 = STATE 8
  
  background(0);
  image(bgImg, width / 2, height / 2, 600, 600);

  noCursor();
  image(crosshairImg, mouseX, mouseY,30, 30);
  
// Gemini Help: Checks if you are in the "Trap" state of clicking the Dummy Target

  let isTrapActive = (specialTarget instanceof DummyTarget && specialTarget.isClicked);
  
  // Check for Dummy Expiration (5 seconds)
  if (specialTarget instanceof DummyTarget && !specialTarget.isClicked) {
    if (millis() - specialTarget.spawnTime >= 5000) {
      specialTarget = null; 
      specialTargetTimer = millis(); 
    }
  }
  
  // Do same with Regular Special Targets
  if (specialTarget && !isTrapActive) {
  if (millis() - specialTarget.spawnTime >= 5000) {
    specialTarget = null;
    specialTargetTimer = millis();
  }
}

  if (!gameOver3 && !isTrapActive) {
    let elapsed = floor((millis() - startTime3) / 1000);
    timeLeft3 = 60 - elapsed;
    if (timeLeft3 <= 0) {
      state = "9";
    }
  }

if (isTrapActive) {
    let timePassed = millis() - dummyTimer;
    if (timePassed >= 2600) {
      specialTarget = null; 
      state = "9";
    }
  }
  
  if (!target) { 
    spawnTarget();
  }


  fill(0, 0, 0, 170);
  rect(0,0,width,50);
  textSize(25);
  textFont(pixelFont);
  fill(255);
  text("Score:" + score3, 25, 32);
  text("Goal:40", 175,32);
  text("Time Left:" + timeLeft3, width-200,32);
  
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(mouseX, mouseY, 25);
  

  if (target) {
    target.display();
    if (!isTrapActive) { 
      target.move();
    }
  }

  if (specialTarget) {
    specialTarget.display();
    specialTarget.move(); 
  }

  let specialElapsed = millis() - specialTargetTimer;
  if (specialElapsed >= 5000 && !specialTarget) {
    spawnSpecialTarget();
    specialTargetTimer = millis(); 
  }
  
  timer3 = (millis() - startTime3) / 1000;

  if (score3 >= 40) {
    state = "10" 
    ApplauseSFX.play();
  }
  
  enlarge = 20;

}

function failScreen3 () {
  
  // GAME OVER SCREEN 3 = STATE 9
  
  background(0);
  textSize(55);
  textFont(pixelFont);
  fill(255);
  text("Game Over", 132, 280);
  textSize(25);
  text("Click to Start Again", 150, 320);
}

function winScreen3 () {
  
  // FINAL WIN SCREEN = STATE 10
  
  background(0);
  image(confettiImg,0,0,width*2,height*2);
  
  textSize(35);
  textFont(pixelFont);
  fill(255);
  text("You cleared all levels!", 35, 280);
  textSize(25);
  text("Your time:" + nf(timer3, 1, 2) + "s", 180, 320);
  text("Congrats!", 220,350);
}
