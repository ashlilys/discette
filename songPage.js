let bg;
let player;
let flower;
let song;

function preload() {
  let page = window.location.pathname;

  if (page.includes("deep_diving")) {
    bg = loadImage("deep_diving.png");
    flower = loadImage("flower_1.png");
    song = loadSound("deep_diving.mp3");
  }

  else if (page.includes("barbie_girl")) {
    bg = loadImage("barbie_girl.png");
    flower = loadImage("flower_2.png");
    song = loadSound("barbie_girl.mp3");
  }

  else if (page.includes("natsuyuusora")) {
    bg = loadImage("natsu_yuuzora.png"); // FIXED NAME
    flower = loadImage("flower_3.png");
    song = loadSound("natsuyuusora.mp3");
  }

  else if (page.includes("guess")) {
    bg = loadImage("guess.png");
    flower = loadImage("flower_4.png");
    song = loadSound("guess.mp3");
  }

  else if (page.includes("enemy")) {
    bg = loadImage("enemy.png");
    flower = loadImage("flower_5.png");
    song = loadSound("enemy.mp3");
  }

  player = loadImage("cd_player.png");
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

  // player
  image(player, width / 2, height / 2, 360, 360);

  // flower
  image(flower, width / 2, height / 2 - 20, 180, 180);
}

function mousePressed() {
  let d = dist(mouseX, mouseY, width / 2, height / 2);

  if (d < 180) {
    window.location.href = "main.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* ---------- BACKGROUND FIX ---------- */
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
