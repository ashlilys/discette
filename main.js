let bg;
let cdPlayer;
let cds = [];
let hoveredCD = null;
let hasClicked = false;

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
  createCanvas(1920, 1080);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  positionObjects();
}

function draw() {
  hoveredCD = null;

  imageMode(CORNER);
  image(bg, 0, 0, width, height);

  imageMode(CENTER);

  // cd player
  image(cdPlayer, playerX, playerY, 360, 360);

  // check hover from top to bottom
  for (let i = 0; i < cds.length; i++) {
    if (isInsideCD(cds[i])) {
      hoveredCD = cds[i];
      break;
    }
  }

  // draw from bottom to top so cd_5 appears visually on top
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

  // hover preview cd_#
  if (hoveredCD) {
    image(hoveredCD.previewImg, 558, 253, 230, 230);

    fill(255);
    stroke(0);
    strokeWeight(5);
    textSize(34);
    text(hoveredCD.label, 558, 90);
  }
}

function mousePressed() {
  if (hasClicked) return;

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
  // cd player lowered
  playerX = 629;
  playerY = 315;

  // exact stack positions
  let positions = [
    { x: 221, y: 190 }, // cd_stack_5 top
    { x: 219, y: 264 }, // cd_stack_4
    { x: 220, y: 338 }, // cd_stack_3
    { x: 219, y: 412 }, // cd_stack_2
    { x: 219, y: 487 }  // cd_stack_1 bottom
  ];

  for (let i = 0; i < cds.length; i++) {
    cds[i].x = positions[i].x;
    cds[i].y = positions[i].y;

    cds[i].displayW = 340;
    cds[i].displayH = 130;

    cds[i].hitW = 280;
    cds[i].hitH = 65;
  }
}

// keep fixed 1920x1080 layout
function windowResized() {
  resizeCanvas(1920, 1080);
  positionObjects();
}
