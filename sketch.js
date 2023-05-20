var video;
var options = {
  video: {
      facingMode: {
       exact: "environment"
     }
  }
};

function setup() {
  createCanvas(320, 240);
  background(160);
  

  textSize(20);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(160);
  //image(video,0,0);
  textAlign(CENTER);
  drawWords(width * 0.95, height * 0.95);
}



function startS(){
  video = createCapture(options);
}