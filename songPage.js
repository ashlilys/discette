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
    bg = loadImage("natsuyuuzora.png");
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
  createCanvas(1920, 1080);
  song.loop();
}

function draw() {
  background(bg);

  imageMode(CENTER);
  image(player, width / 2, height / 2);

  image(flower, width / 2, height / 2);
}

function mousePressed() {
  let d = dist(mouseX, mouseY, width/2, height/2);

  if (d < 200) {
    window.location.href = "main.html";
  }
}
