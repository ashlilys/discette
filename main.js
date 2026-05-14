let bg;
let cdPlayer;
let cds = [];
let hoveredCD = null;
let hasClicked = false;

function preload() {
  bg = loadImage("main_bg.png");
  cdPlayer = loadImage("cd_player.png");

  // order is BOTTOM to TOP
  cds = [
    {
      stackImg: loadImage("cd_stack_1.png"),
      previewImg: loadImage("cd_1.png"),
      link: "deep_diving.html",
      label: "Deep Diving",
      x: 219,
      y: 487
    },
    {
      stackImg: loadImage("cd_stack_2.png"),
      previewImg: loadImage("cd_2.png"),
      link: "barbie_girl.html",
      label: "Barbie Girl",
      x: 219,
      y: 412
    },
    {
      stackImg: loadImage("cd_stack_3.png"),
      previewImg: loadImage("cd_3.png"),
      link: "natsuyuusora.html",
      label: "Natsu Yuuzora",
      x: 220,
      y: 338
    },
    {
      stackImg: loadImage("cd_stack_4.png"),
      previewImg: loadImage("cd_4.png"),
      link: "guess.html",
      label: "Guess",
      x: 219,
      y: 264
    },
    {
      stackImg: loadImage("cd_stack_5.png"),
      previewImg: loadImage("cd_5.png"),
      link: "enemy.html",
      label: "Enemy",
      x: 221,
      y: 190
    }
  ];
}

function setup() {
  createCanvas(1920, 1080);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  for (let cd of cds) {
    cd.displayW = 340;
    cd.displayH = 130;
    cd.hitW = 280;
    cd.hitH = 65;
  }
}

function draw() {
  hoveredCD = null;

  // background
  imageMode(CORNER);
  image(bg, 0, 0, width, height);

  imageMode(CENTER);

  // cd player exactly where you asked
  image(cdPlayer, 629, 115, 360, 360);

  // check hover from TOP to BOTTOM
  for (let i = cds.length - 1; i >= 0; i--) {
    if (isInsideCD(cds[i])) {
      hoveredCD = cds[i];
      break;
    }
  }

  // draw from BOTTOM to TOP
  for (let i = 0; i < cds.length; i++) {
    let cd = cds[i];
    let popping = hoveredCD === cd;
    let s = popping ? 1.08 : 1;

    push();
    translate(cd.x, cd.y);
    scale(s);
    image(cd.stackImg, 0, 0, cd.displayW, cd.displayH);
    pop();
  }

  // hover preview
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

  // click from TOP to BOTTOM
  for (let i = cds.length - 1; i >= 0; i--) {
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
