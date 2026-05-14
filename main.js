let bg;
let cdPlayer;
let cds = [];
let hoveredCD = null;
let hasClicked = false;

function preload() {
  bg = loadImage("main_bg.png");
  cdPlayer = loadImage("cd_player.png");

  // order is TOP to BOTTOM
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

  // background
  imageMode(CORNER);
  image(bg, 0, 0, width, height);

  imageMode(CENTER);

  // draw cd player on main page
  image(cdPlayer, playerX, playerY, 360, 360);

  // check hover first
  for (let i = 0; i < cds.length; i++) {
    if (isInsideCD(cds[i])) {
      hoveredCD = cds[i];
      break;
    }
  }

  // draw stack from bottom to top
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

  // preview CD + text on hover
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
  stackX = width * 0.28;
  stackStartY = height * 0.36;

  playerX = width * 0.68;
  playerY = height * 0.55;

  for (let i = 0; i < cds.length; i++) {
    cds[i].x = stackX;
    cds[i].y = stackStartY + i * 48;

    cds[i].displayW = 330;
    cds[i].displayH = 120;

    // smaller hitbox so transparent PNG space doesn't mess up clicks
    cds[i].hitW = 280;
    cds[i].hitH = 45;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  positionObjects();
}
