let prevMinute = -1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNER);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let hr = hour(); // 0–23
  let min = minute(); // 0–59
  let sec = second(); // 0–59

  // Log minute ONLY when it changes
  if (min !== prevMinute) {
    console.log(min);
    prevMinute = min;
  }

  drawBackground();
  drawLiquidClock(hr, min, sec);
}

/* ---------- BACKGROUND ---------- */

function drawBackground() {
  for (let y = 0; y < height; y++) {
    let t = map(y, 0, height, 0, 1);
    let c = lerpColor(color(12, 18, 30), color(6, 10, 20), t);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
}

/* ---------- CLOCK LAYOUT ---------- */

function drawLiquidClock(hr, min, sec) {
  let vesselCount = 3;

  let marginX = width * 0.12;
  let gap = width * 0.08;

  let usableWidth = width - marginX * 2 - gap * (vesselCount - 1);
  let vesselWidth = usableWidth / vesselCount;

  let vesselHeight = height * 0.55;
  let baseY = height * 0.75;

  // Hour vessel (0–23)
  drawVessel(
    marginX,
    baseY,
    vesselWidth,
    vesselHeight,
    map(hr, 0, 23, 0, 1),
    sec,
    color(120, 185, 215)
  );

  // Minute vessel (0–59)
  drawVessel(
    marginX + vesselWidth + gap,
    baseY,
    vesselWidth,
    vesselHeight,
    map(min, 0, 59, 0, 1),
    sec,
    color(135, 205, 175)
  );

  // Second vessel (0–59)
  drawVessel(
    marginX + 2 * (vesselWidth + gap),
    baseY,
    vesselWidth,
    vesselHeight,
    map(sec, 0, 59, 0, 1),
    sec,
    color(215, 190, 150)
  );
}

/* ---------- VESSEL ---------- */

function drawVessel(x, baseY, w, h, fillLevel, sec, liquidColor) {
  let liquidHeight = h * fillLevel;
  let topY = baseY - liquidHeight;
  let radius = min(w, h) * 0.08;

  // Glass outline
  stroke(210, 220);
  noFill();
  rect(x, baseY - h, w, h, radius);
  noStroke();

  // Liquid body
  fill(liquidColor);
  rect(x, topY, w, liquidHeight, radius, radius, 0, 0);

  // Liquid surface
  drawWave(x, topY, w, sec, liquidColor);
}

/* ---------- WAVE ---------- */

function drawWave(x, y, w, sec, liquidColor) {
  let detail = 28;

  // Seconds control amplitude ONLY
  let waveHeight = map(sec, 0, 59, 2, 6);

  // Constant, calm flow
  let flow = frameCount * 0.02;

  fill(
    red(liquidColor) + 20,
    green(liquidColor) + 20,
    blue(liquidColor) + 20,
    220
  );

  beginShape();
  vertex(x, y);

  for (let i = 0; i <= detail; i++) {
    let px = x + (i / detail) * w;
    let offset = sin(flow + i * 0.5) * waveHeight;
    vertex(px, y + offset);
  }

  vertex(x + w, y);
  endShape(CLOSE);
}
