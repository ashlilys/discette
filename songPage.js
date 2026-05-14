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

    flowerX = 320;
    flowerY = 570;
  }

  else if (page.includes("barbie_girl")) {
    bg = loadImage("barbie_girl.png");
    flower = loadImage("flower_2.png");
    song = loadSound("barbie_girl.mp3");

    flowerX = 400;
    flowerY = 580;
  }

  else if (page.includes("natsuyuusora")) {
    bg = loadImage("natsuyuusora.png");
    flower = loadImage("flower_3.png");
    song = loadSound("natsuyuusora.mp3");

    flowerX = 683;
    flowerY = 400;
  }

  else if (page.includes("guess")) {
    bg = loadImage("guess.png");
    flower = loadImage("flower_4.png");
    song = loadSound("guess.mp3");

    flowerX = 1100;
    flowerY = 560;
  }

  else if (page.includes("enemy")) {
    bg = loadImage("enemy.png");
    flower = loadImage("flower_5.png");
    song = loadSound("enemy.mp3");

    flowerX = 1100;
    flowerY = 500;
  }

  flowerW = 400;
  flowerH = 400;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  // load music notes AFTER preload so they cannot freeze the page
  noteImgs = new Array(noteFileNames.length);

  for (let i = 0; i < noteFileNames.length; i++) {
    loadImage(
      noteFileNames[i],
      function(img) {
        noteImgs[i] = img;
      },
      function() {
        console.log("Could not load " + noteFileNames[i]);
        noteImgs[i] = null;
      }
    );
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

  notes = [];
  createMusicNotes();
}

/* ---------- MUSIC NOTES ---------- */
function createMusicNotes() {
  notes = [];

  for (let i = 0; i < 22; i++) {
    notes.push({
      imgIndex: floor(random(noteFileNames.length)),
      x: random(width),
      y: random(height),
      size: random(65, 140),
      speedX: random(-0.6, 0.6),
      speedY: random(-1.0, -0.35),
      alpha: random(130, 255),
      fadeSpeed: random(1.5, 3.5),
      fadeDirection: random([1, -1]),
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.01, 0.01)
    });
  }
}

function drawMusicNotes() {
  imageMode(CENTER);

  for (let note of notes) {
    let img = noteImgs[note.imgIndex];

    // if image is not loaded yet, skip this note
    if (!img || img.width < 1) {
      continue;
    }

    note.x += note.speedX;
    note.y += note.speedY;
    note.rotation += note.rotationSpeed;

    note.alpha += note.fadeSpeed * note.fadeDirection;

    if (note.alpha >= 255) {
      note.alpha = 255;
      note.fadeDirection = -1;
    }

    if (note.alpha <= 90) {
      note.alpha = 90;
      note.fadeDirection = 1;
    }

    if (note.y < -120) {
      note.y = height + 120;
      note.x = random(width);
    }

    if (note.x < -120) {
      note.x = width + 120;
    }

    if (note.x > width + 120) {
      note.x = -120;
    }

    push();
    translate(note.x, note.y);
    rotate(note.rotation);
    tint(255, note.alpha);
    image(img, 0, 0, note.size, note.size);
    noTint();
    pop();
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
