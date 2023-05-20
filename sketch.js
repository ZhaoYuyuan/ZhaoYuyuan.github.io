var video;
var gr=128;
var gg=128;
var gb=128;
var disGlobal=0;

var options = {
  video: {
      facingMode: {
       exact: "user"
     }
  }
};

function setup() {
  background(160);
  video = createCapture(options);
  pixelDensity(1);
  textSize(20);
  textAlign(CENTER, CENTER);
}

function draw() {
  createCanvas(video.width, video.height);
  background(160);
  loadPixels();
  video.loadPixels();

  for(var y = 0; y < height; y++){
    for(var x = 0; x < width; x++){
      var index = (x + y * width) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] =255;
    }
  }
  detectColor();
  updatePixels();
  textAlign(CENTER);
  drawWords(width * 0.95, height * 0.95);
}

function drawWords(x, y) {
  fill(255);
  text(disGlobal, x, y);
  disGlobal=0;
}

function detectColor(){
  var dr,dg,db,dis,dx,dy,index,indexLast;
  for(var i= 1; i<=10; i++){
    for(var j= 1; j<=10; j++){
      
      dx= floor(width / 10 * j)-1;
      dy= floor(height / 10 * i)-1;
      index = (dx + dy * width) * 4;
      //console.log(dx);
      //console.log(dy);
      //console.log(index);
      if(i==1 && j==1){
        dr= video.pixels[index + 0] - 128;
        dg= video.pixels[index + 1] - 128;
        db= video.pixels[index + 2] - 128;
        //console.log(dr);
      }else{
        //console.log(indexLast);
        dr= video.pixels[index + 0] - video.pixels[indexLast + 0];
        dg= video.pixels[index + 1] - video.pixels[indexLast + 1];
        db= video.pixels[index + 2] - video.pixels[indexLast + 2];
        console.log(dr);
      }
      dis = Math.sqrt(Math.pow(dr,2)+Math.pow(dg,2)+Math.pow(db,2));
      dis = floor(dis);
      disGlobal += dis;
      indexLast=index;
    }
  }
}