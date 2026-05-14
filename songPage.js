let bg;
let flower;
let song;

let flowerX;
let flowerY;
let flowerW;
let flowerH;

let designW = 1366;
let designH = 768;

let fadeAlpha = 255;

// music note images
let noteFileNames = ["note_1.png", "note_2.png", "note_3.png"];
let noteImgs = [];
let notes = [];

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

  // load music notes outside preload so a wrong note filename does not freeze the whole page
  for (let i = 0; i < noteFileNames.length; i++) {
    noteImgs.push(loadImage(noteFileNames[i]));
  }

  createMusicNotes();

  if (song) {
    song.loop();
  }
}

function draw() {
  drawBackground(bg);

  // floating music notes behind flower
  drawMusicNotes();

  // flower/player image only, kept square
  let flowerSize = Math.min(sw(flowerW), sh(flowerH));
  image(flower, sx(flowerX), sy(flowerY), flowerSize, flowerSize);

  // cute instruction label
  drawCuteLabel("click cd to stop song !", width / 2, sy(65));

  // fade-in animation
  if (fadeAlpha > 0) {
    fill(0, fadeAlpha);
    noStroke();
    rectMode(CORNER);
    rect(0, 0, width, height);
    fadeAlpha -= 8;
  }
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

/* ---------- MUSIC NOTES ---------- */
function createMusicNotes() {
  for (let i = 0; i < 14; i++) {
    notes.push({
      imgIndex: floor(random(noteFileNames.length)),
      x: random(width),
      y: random(height),
      size: random(25, 65),
      speedX: random(-0.35, 0.35),
      speedY: random(-0.6, -0.2),
      alpha: random(60, 220),
      fadeSpeed: random(1.2, 2.8),
      fadeDirection: random([1, -1])
    });
  }
}

function drawMusicNotes() {
  for (let note of notes) {
    let img = noteImgs[note.imgIndex];

    note.x += note.speedX;
    note.y += note.speedY;

    note.alpha += note.fadeSpeed * note.fadeDirection;

    if (note.alpha >= 230) {
      note.alpha = 230;
      note.fadeDirection = -1;
    }

    if (note.alpha <= 30) {
      note.alpha = 30;
      note.fadeDirection = 1;
    }

    if (note.y < -100) {
      note.y = height + 100;
      note.x = random(width);
    }

    if (note.x < -100) {
      note.x = width + 100;
    }

    if (note.x > width + 100) {
      note.x = -100;
    }

    if (img && img.width > 1) {
      tint(255, note.alpha);
      image(img, note.x, note.y, note.size, note.size);
      noTint();
    }
  }
}

/* ---------- CUTE LABEL ---------- */
function drawCuteLabel(labelText, labelX, labelY) {
  textAlign(CENTER, CENTER);
  textSize(sw(15));
  textFont("monospace");

  let labelW = textWidth(labelText) + sw(35);
  let labelH = sh(34);

  noStroke();
  fill(255, 230, 238, 220);
  rectMode(CENTER);
  rect(labelX, labelY, labelW, labelH, sw(18));

  fill(180, 70, 100);
  noStroke();
  text(labelText, labelX, labelY);
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
