var capture;
let switchFlag = false;
let switchBtn;

var options = {
     video: {
        
         facingMode: {
          exact: "user"
        }
     }
   };

function setup() {
  createCanvas(390, 240);
  
  capture = createCapture(options);
  
  switchBtn = createButton('Switch Camera');
  switchBtn.position(19, 19);
  switchBtn.mousePressed(switchCamera);
  
  

}

function switchCamera()
{
  switchFlag = !switchFlag;
  if(switchFlag==true)
  {
   capture.remove();
   options = {
     video: {
        
         facingMode: {
          exact: "environment"
        }
     }
   };

  }
  else
  {
   capture.remove();
   options = {
     video: {
        
         facingMode: {
          exact: "user"
        }
     }
   };
    
  }
  capture = createCapture(options);
  
}