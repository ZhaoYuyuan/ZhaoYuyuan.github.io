var video;

function setup() {
  createCanvas(320, 240);
  background(160);
  video = createCapture(VIDEO);
  //video.hide();
  // Set text characteristics
  textSize(20);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(160);
  textAlign(CENTER);
  drawWords(width * 0.95, height * 0.95);
}

function drawWords(x, y) {
  // The text() function needs three parameters:
  // the text to draw, the horizontal position,
  // and the vertical position
  fill(0);
  text(video.height, x, y);
  text(video.width, x-50, y);
}
