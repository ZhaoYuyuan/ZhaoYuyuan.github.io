var video;
var disGlobal = 0;
var rectNum = 0;
var rectNumDelta = 1;
var video;
var videoLayer;
var paintLayer;
var mover;
var moverDis;
var dotsAll = [];
var glitch;
var colorSwitch = 0;
var gr = 128;
var gg = 128;
var gb = 128;
var veli = 5;
var options = {
  video: {
    facingMode: {
      exact: "environment"
      //exact: "user"
    }
  }
};

function setup() {
  background(160);
  video = createCapture(options);
  videoLayer = createCanvas(400, 400);
  paintLayer = createGraphics(400, 400);
  pixelDensity(1);
  textSize(20);
  textAlign(CENTER, CENTER);
  video.hide();
  glitch = new Glitch();
  glitch.pixelate(1);
}

function draw() {
  if (frameCount == 1) {

    mover = new Mover(width, height);
  }

  if (frameCount == 120) {
    resizeCanvas(video.width, video.height);
    paintLayer.resizeCanvas(video.width, video.height);
    for (var i = 1; i <= 5; i++) {
      mover = new Mover(random(video.width), random(video.height));
      dotsAll.push(mover);
    }

  }

  video.loadPixels();
  detectColor();
  textAlign(CENTER);
  disGlobal = floor(disGlobal / 9000 * 255);
  rectNum = floor(abs((disGlobal - 128) / 128 * 20));

  if (disGlobal > 140 && dotsAll.length < 100 && frameCount % 5 == 0) {
    mover = new Mover(random(video.width), random(video.height));
    dotsAll.push(mover);
  } else if (disGlobal < 80 && dotsAll.length > 0 && frameCount % 2 == 0) {
    dotsAll.pop();
  } else if (disGlobal >= 80 && disGlobal <= 140 && dotsAll.length > 30 && frameCount % 2 == 0) {
    dotsAll.pop();
  }
  /*
  if (frameCount % (21 - rectNum) == 0) {
    if (disGlobal > 128) {
      paintLayer.noStroke();
      paintLayer.fill(random(255), random(255), random(255));
      paintLayer.push();
      paintLayer.translate(random(width), random(height));
      paintLayer.rotate(random(360));
      paintLayer.rect(0, 0, random(30), random(30));
      paintLayer.pop();
    } else {
      paintLayer.erase();
      paintLayer.rect(random(width), random(height), 200);
      paintLayer.noErase();
    }
  }
  */


  if (frameCount % 45 == 0) {
    for (var i = 0; i < dotsAll.length; i++) {
      moverDis = dotsAll[i];
      moverDis.updateP();
    }

  }
  for (var i = 0; i < dotsAll.length; i++) {
    moverDis = dotsAll[i];
    if (disGlobal >= 80 && disGlobal <= 140) {
      veli = 2;
    } else {
      veli = 5;
    }
    moverDis.update();
  }
  var pic = video.get();

  if (dotsAll.length >= 80 && frameCount % 3 === 0) {

    glitch.loadImage(video);
    glitch.limitBytes(map(random(height), 0, height, 0, 1));
    glitch.randomBytes(80);
    glitch.buildImage();
  }
  if (dotsAll.length >= 80) {
    paintLayer.tint(255, 150);
    paintLayer.image(glitch.image, 0, 0, glitch.width, glitch.height)
  } else {
    paintLayer.tint(255, 50);
    paintLayer.image(pic, 0, 0);
  }

  for (var i = 0; i < dotsAll.length; i++) {
    moverDis = dotsAll[i];
    if (disGlobal >= 80 && disGlobal <= 140) {
      if (frameCount % 60 == 0) {
        gr = random(255);
        gg = random(255);
        gb = random(255);
      }
      colorSwitch = 1;
    } else {
      colorSwitch = 0;
    }
    moverDis.show();
  }
  drawWords(width * 0.95, height * 0.95);
  disGlobal = 0;

  image(video, 0, 0);

  image(paintLayer, 0, 0);

  if (dotsAll.length == 0) {
    filter(GRAY);
  }



}

function drawWords(x, y) {
  paintLayer.fill(0);
  paintLayer.rect(x - 20, y - 20, 100, 40);
  paintLayer.fill(255);

  paintLayer.text(disGlobal, x, y);

}

function detectColor() {
  var dr, dg, db, dis, dx, dy, index, indexLast;
  for (var i = 1; i <= 10; i++) {
    for (var j = 1; j <= 10; j++) {
      dx = floor(width / 10 * j) - 1;
      dy = floor(height / 10 * i) - 1;
      index = (dx + dy * width) * 4;
      //console.log(dx);
      //console.log(dy);
      //console.log(index);
      if (i == 1 && j == 1) {
        dr = video.pixels[index + 0] - 128;
        dg = video.pixels[index + 1] - 128;
        db = video.pixels[index + 2] - 128;
        //console.log(dr);
      } else {
        //console.log(indexLast);
        dr = video.pixels[index + 0] - video.pixels[indexLast + 0];
        dg = video.pixels[index + 1] - video.pixels[indexLast + 1];
        db = video.pixels[index + 2] - video.pixels[indexLast + 2];
        //console.log(dr);
      }
      dis = Math.sqrt(Math.pow(dr, 2) + Math.pow(dg, 2) + Math.pow(db, 2));
      dis = floor(dis);
      //console.log(dis);
      disGlobal += dis;
      indexLast = index;

    }
  }
}