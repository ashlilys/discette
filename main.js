let bg;
let cdPlayer;
let cds = [];
let hoveredCD = null;
let hasClicked = false;

let stackX;
let stackStartY;
let playerX;
let playerY;

function preload() {
  bg = loadImage("main_bg.png");
  cdPlayer = loadImage("cd_player.png");

  // visual order: cd_5 is top, cd_1 is bottom
  cds = [
    {
      stackImg: loadImage("cd_stack_5.png"),
      previewImg: loadImage("cd_5.png"),
      link: "enemy.html",
      label: "Enemy"
    },
    {
      stackImg: loadImage("cd_stack_4.png"),
      previewImg: loadImage("cd_4.png"),
      link: "guess.html",
      label: "Guess"
    },
    {
      stackImg: loadImage("cd_stack_3.png"),
      previewImg: loadImage("cd_3.png"),
      link: "natsuyuusora.html",
      label: "Natsu Yuuzora"
    },
    {
      stackImg: loadImage("cd_stack_2.png"),
      previewImg: loadImage("cd_2.png"),
      link: "barbie_girl.html",
      label: "Barbie Girl"
    },
    {
      stackImg: loadImage("cd_stack_1.png"),
      previewImg: loadImage("cd_1.png"),
      link: "deep_diving.html",
      label: "Deep Diving"
    }
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  positionObjects();
}

function draw() {
  hoveredCD = null;

  imageMode(CORNER);
  image(bg, 0, 0, width, height);

  imageMode(CENTER);

  // CD player on the right
  image(cdPlayer, playerX, playerY, 360, 360);

  // check hover from top to bottom
  for (let i = 0; i < cds.length; i++) {
    if (isInsideCD(cds[i])) {
      hoveredCD = cds[i];
      break;
    }
  }

  // draw from bottom to top so cd_5 appears on top
  for (let i = cds.length - 1; i >= 0; i--) {
    let cd = cds[i];
    let popping = hoveredCD === cd;
    let s = popping ? 1.08 : 1;

    push();
    translate(cd.x, cd.y);
    scale(s);
    image(cd.stackImg, 0, 0, cd.displayW, cd.displayH);
    pop();
  }

  // preview CD + single text label
  if (hoveredCD) {
    image(hoveredCD.previewImg, playerX, playerY - 40, 230, 230);

    fill(255);
    stroke(0);
    strokeWeight(5);
    textSize(34);
    text(hoveredCD.label, playerX, playerY - 220);
  }
}

function mousePressed() {
  if (hasClicked) return;

  // check from top to bottom
  for (let i = 0; i < cds.length; i++) {
    if (isInsideCD(cds[i])) {
      hasClicked = true;
      window.location.href = cds[i].link;
      return;
    }
  }
}

function isInsideCD(cd) {
  return (
    mouseX > cd.x - cd.hitW / 2 &&
    mouseX < cd.x + cd.hitW / 2 &&
    mouseY > cd.y - cd.hitH / 2 &&
    mouseY < cd.y + cd.hitH / 2
  );
}

function positionObjects() {
  stackX = width * 0.25;
  stackStartY = height * 0.28;

  playerX = width * 0.68;
  playerY = height * 0.55;

  let spacing = 75;

  for (let i = 0; i < cds.length; i++) {
    cds[i].x = stackX;
    cds[i].y = stackStartY + i * spacing;

    cds[i].displayW = 340;
    cds[i].displayH = 130;

    cds[i].hitW = 280;
    cds[i].hitH = 65;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  positionObjects();
}
