let bg;
let cdPlayer;
let cds = [];
let hoveredCD = null;
let hasClicked = false;

function preload() {
  bg = loadImage("main_bg.png");
  cdPlayer = loadImage("cd_player.png");

  // order: bottom to top
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
  textAlign(CENTER, CENTER);

  for (let cd of cds) {
    cd.w = 340;
    cd.h = 130;
  }
}

function draw() {
  hoveredCD = null;

  imageMode(CORNER);
  image(bg, 0, 0, width, height);

  // CD player at top-left coordinate
  image(cdPlayer, 629, 115, 360, 360);

  // check hover from top to bottom
  for (let i = cds.length - 1; i >= 0; i--) {
    if (isInsideCD(cds[i])) {
      hoveredCD = cds[i];
      break;
    }
  }

  // draw bottom to top
  for (let i = 0; i < cds.length; i++) {
    let cd = cds[i];
    let s = hoveredCD === cd ? 1.08 : 1;

    push();
    translate(cd.x + cd.w / 2, cd.y + cd.h / 2);
    scale(s);
    imageMode(CENTER);
    image(cd.stackImg, 0, 0, cd.w, cd.h);
    pop();
  }

  // hover preview with original cd_# color
  if (hoveredCD) {
    imageMode(CORNER);
    image(hoveredCD.previewImg, 558, 253, 230, 230);

    fill(255);
    stroke(0);
    strokeWeight(5);
    textSize(34);
    text(hoveredCD.label, 673, 220);
  }
}

function mousePressed() {
  if (hasClicked) return;

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
    mouseX > cd.x &&
    mouseX < cd.x + cd.w &&
    mouseY > cd.y &&
    mouseY < cd.y + cd.h
  );
}
