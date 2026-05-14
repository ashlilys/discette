let bg;
let cdPlayer;
let cds = [];
let hoveredCD = null;
let hasClicked = false;

// your design/background image size
let designW = 1366;
let designH = 768;

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
      x: 249,
      y: 487
    },
    {
      stackImg: loadImage("cd_stack_2.png"),
      previewImg: loadImage("cd_2.png"),
      link: "barbie_girl.html",
      label: "Barbie Girl",
      x: 249,
      y: 412
    },
    {
      stackImg: loadImage("cd_stack_3.png"),
      previewImg: loadImage("cd_3.png"),
      link: "natsuyuusora.html",
      label: "Natsu Yuuzora",
      x: 240,
      y: 338
    },
    {
      stackImg: loadImage("cd_stack_4.png"),
      previewImg: loadImage("cd_4.png"),
      link: "guess.html",
      label: "Guess",
      x: 249,
      y: 264
    },
    {
      stackImg: loadImage("cd_stack_5.png"),
      previewImg: loadImage("cd_5.png"),
      link: "enemy.html",
      label: "Enemy",
      x: 251,
      y: 190
    }
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  for (let cd of cds) {
    cd.w = 260;
    cd.h = 95;
  }
}

function draw() {
  hoveredCD = null;

  imageMode(CORNER);
  image(bg, 0, 0, width, height);

  // cute main page instruction label
  let labelText = "choose a cd to play";
  let labelX = sx(480);
  let labelY = sy(65);

  textAlign(CENTER, CENTER);
  textSize(sw(18));
  textFont("monospace");

  let labelW = textWidth(labelText) + sw(40);
  let labelH = sh(34);

  noStroke();
  fill(255, 230, 238, 220);
  rectMode(CENTER);
  rect(labelX, labelY, labelW, labelH, sw(18));

  fill(180, 70, 100);
  text(labelText, labelX, labelY);

  imageMode(CENTER);

  // rest of your code continues...
}

  // draw from bottom to top
  for (let i = 0; i < cds.length; i++) {
    let cd = cds[i];
    let popping = hoveredCD === cd;
    let popScale = popping ? 1.08 : 1;

    let drawX = sx(cd.x);
    let drawY = sy(cd.y);
    let drawW = sw(cd.w);
    let drawH = sh(cd.h);

    push();
    imageMode(CENTER);
    translate(drawX + drawW / 2, drawY + drawH / 2);
    scale(popScale);
    image(cd.stackImg, 0, 0, drawW, drawH);
    pop();
  }

  // hover preview cd_#
  if (hoveredCD) {
    imageMode(CORNER);

    // preview CD position
    image(hoveredCD.previewImg, sx(558), sy(253), sw(220), sh(220));

    // one text label only
    fill(255);
    stroke(0);
    strokeWeight(5);
    textSize(sw(30));
    text(hoveredCD.label, sx(668), sy(220));
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
    mouseX > sx(cd.x) &&
    mouseX < sx(cd.x) + sw(cd.w) &&
    mouseY > sy(cd.y) &&
    mouseY < sy(cd.y) + sh(cd.h)
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// scale helpers
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
