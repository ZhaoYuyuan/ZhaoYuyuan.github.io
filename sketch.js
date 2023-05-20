var video;
var options = {
  video: {
      facingMode: {
       exact: "enviorment"
     }
  }
};

function setup() {
  createCanvas(320, 240);
  background(160);
  video = createCapture(options);

  textSize(20);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(160);
  image(video,0,0);
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