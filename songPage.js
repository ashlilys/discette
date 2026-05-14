let bg;
let flower;
let song;

let flowerX;
let flowerY;
let flowerW;
let flowerH;

let designW = 1366;
let designH = 768;

function preload() {
  let page = window.location.pathname;

  if (page.includes("deep_diving")) {
    bg = loadImage("deep_diving.png");
    flower = loadImage("flower_1.png");
    song = loadSound("deep_diving.mp3");

    // lower left
    flowerX = 320;
    flowerY = 570;
  }

  else if (page.includes("barbie_girl")) {
    bg = loadImage("barbie_girl.png");
    flower = loadImage("flower_2.png");
    song = loadSound("barbie_girl.mp3");

    // lower left
    flowerX = 400;
    flowerY = 580;
  }

  else if (page.includes("natsuyuusora")) {
    bg = loadImage("natsuyuusora.png");
    flower = loadImage("flower_3.png");
    song = loadSound("natsuyuusora.mp3");

    // slightly lower than center
    flowerX = 683;
    flowerY = 400;
  }

  else if (page.includes("guess")) {
    bg = loadImage("guess.png");
    flower = loadImage("flower_4.png");
    song = loadSound("guess.mp3");

    // lower right
    flowerX = 1100;
    flowerY = 560;
  }

  else if (page.includes("enemy")) {
    bg = loadImage("enemy.png");
    flower = loadImage("flower_5.png");
    song = loadSound("enemy.mp3");

    // lower right
    flowerX = 1100;
    flowerY = 500;
  }

  // keep these equal so image stays proportional
  flowerW = 400;
  flowerH = 400;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  if (song) {
    song.loop();
  }
}

function draw() {
  drawBackground(bg);

  // flower/player image only, kept square
  let flowerSize = Math.min(sw(flowerW), sh(flowerH));
  image(flower, sx(flowerX), sy(flowerY), flowerSize, flowerSize);

  // instruction text
  fill(255);
  stroke(0);
  strokeWeight(4);
  textAlign(CENTER, CENTER);
  textSize(sw(28));
  text("click the cd to stop the song", width / 2, sy(70));
}

function mousePressed() {
  let flowerSize = Math.min(sw(flowerW), sh(flowerH));
  let d = dist(mouseX, mouseY, sx(flowerX), sy(flowerY));

  if (d < flowerSize / 2) {
    window.location.href = "main.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* ---------- BACKGROUND FILLS SCREEN ---------- */
function drawBackground(img) {
  let imgRatio = img.width / img.height;
  let canvasRatio = width / height;

  let drawW, drawH;

  if (imgRatio > canvasRatio) {
    drawH = height;
    drawW = height * imgRatio;
  } else {
    drawW = width;
    drawH = width / imgRatio;
  }

  let x = (width - drawW) / 2;
  let y = (height - drawH) / 2;

  imageMode(CORNER);
  image(img, x, y, drawW, drawH);
  imageMode(CENTER);
}

/* ---------- POSITION SCALE HELPERS ---------- */
function sx(x) {
  return x * (width / designW);
}

function sy(y) {
  return y * (height / designH);
}

function sw(w) {
  return w * (width / designW);
}

function sh(h) {
  return h * (height / designH);
}
