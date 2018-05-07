canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
w = window.innerWidth*0.9;
h = window.innerHeight*0.9;
const gravity = 0.5;
const friction = 0.9;
const frictionX = 0.9;
let animated = false;
let ball;
let ballCount = 3;
let ballArray = [];

/* Breakpoints
if(w > 1000) {

} else if (w > 800 && w <= 1000) {

} else if (w <=800 && w > 400) {

} else if (w <=400 && w > 0) {

} */

canvas.addEventListener('click', (e) => {
  if(!animated) {
    animate();
    animated = true;
  }
  const rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  for (var i=0; i<ballArray.length; i++) {
    if(  (((x-ballArray[i].x) ** 2) + ((y - ballArray[i].y) ** 2)) -8000 < ballArray[i].r) {
      ballArray[i].dy = ballArray[i].dy + 15;
      if(!ballArray[i].x + ballArray[i].r > w || ballArray[i].x - ballArray[i].r - ballArray[i].dx <= 0) {
        ballArray[i].dx = ballArray[i].dx + 10;
      }
      if(x > ballArray[i].x) {
        ballArray[i].dx = 0 + (ballArray[i].dx + 5);
      } else if (x < ballArray[i].x) {
        ballArray[i].dx = 0 + -(ballArray[i].dx + 5);
      }
    }
  }
});


// r = radius, dy = change in y, h = height of canvas
function Ball(x, y, r, dy, dx, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dy = dy;
  this.dx = dx;
  this.color = color;

  this.update = function() {
    if (this.y + this.r + this.dy >= h || this.y + this.r + this.dy <= this.r) {
      this.dy = -this.dy * friction;
      this.dx = this.dx * frictionX;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.r > w || this.x - this.r - this.dx <= 0) {
      this.dx = -this.dx;
    }

    this.x -= this.dx;
    this.y += this.dy;
    this.draw();
  };

  this.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, this.color);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };
}

function init() {
  ctx.canvas.width  = window.innerWidth*0.9;
  ctx.canvas.height = window.innerHeight*0.9;
  ctx.clearRect(0,0,w,h);
  let colors = ['#3d484b','#bfa898','#91bca8'];
  for (let i=0; i<colors.length; i++) {
    let radius = (w*0.07);
    let x;
    let y;
    if(w > 1000) {
      x = w*0.80;
      y = h*0.25 + (i*radius*2) ;
    } else if (w > 800 && w <= 1000) {
      x = w*0.80;
      y = h*0.25 + (i*radius*2) ;
    } else if (w <=800 && w > 400) {
      x = w*0.80;
      y = h*0.25 + (i*radius*2) ;
    } else if (w <=400 && w > 0) {
      x = w*0.85;
      y = h*0.3 + (i*radius*2) ;
    }

    drawTitle();
    ballArray.push(new Ball(x, y, radius, 1, 1, colors[i]));
    for (let i=0; i<ballArray.length; i++) {
      ballArray[i].draw();
    }
  }
  drawSetup();
}

function drawSetup(){

  if(w > 1000) {
    ctx.fillStyle = '#e8dFc7';
    ctx.font = "1em Abril Fatface";
    ctx.fillText("(Click Me!)",w*0.85,h*0.92);
  } else if (w > 800 && w <= 1000) {
    ctx.fillStyle = '#e8dFc7';
    ctx.font = "2em Abril Fatface";
    ctx.fillText("(Click Me!)",w*0.75,h*0.85);
  } else if (w <=800 && w > 400) {
    ctx.fillStyle = '#e8dFc7';
    ctx.font = "1.5em Abril Fatface";
    ctx.fillText("(Click Me!)",w*0.75,h*0.8);
  } else if (w <=400 && w > 0) {
    ctx.fillStyle = '#e8dFc7';
    ctx.font = "0.8em Abril Fatface";
    ctx.fillText("(Click Me!)",w*0.7,h*0.92);
  }
}

  function drawTitle() {
    ctx.clearRect(0,0,w,h);
    if(w > 1000) {
      ctx.font = "6.5em Abril Fatface";
      ctx.fillStyle = '#91bca8';
      ctx.fillText("Hi,",w*0.05,h*0.35);
      ctx.font = "9.5em Abril Fatface";
      ctx.fillStyle = '#e8dFc7';
      ctx.fillText("I'm Sam.",w*0.1,h*0.57);
      ctx.font = "3.5em Abril Fatface";
      ctx.fillStyle = '#91bca8';
      ctx.fillText("I like to code...",w*0.05,h*0.68);
    } else if (w > 800 && w <= 1000) {
      ctx.font = "5em Abril Fatface";
      ctx.fillStyle = '#91bca8';
      ctx.fillText("Hi,",w*0.05,h*0.25);
      ctx.font = "7.5em Abril Fatface";
      ctx.fillStyle = '#e8dFc7';
      ctx.fillText("I'm Sam.",w*0.1,h*0.35);
      ctx.font = "3.5em Abril Fatface";
      ctx.fillStyle = '#91bca8';
      ctx.fillText("I like to code...",w*0.05,h*0.43);
    } else if (w <=800 && w > 400) {
      ctx.font = "3.5em Abril Fatface";
      ctx.fillStyle = '#91bca8';
      ctx.fillText("Hi,",w*0.05,h*0.3);
      ctx.font = "4.5em Abril Fatface";
      ctx.fillStyle = '#e8dFc7';
      ctx.fillText("I'm Sam.",w*0.1,h*0.38);
      ctx.font = "3em Abril Fatface";
      ctx.fillStyle = '#91bca8';
      ctx.fillText("I like to code...",w*0.05,h*0.45);
    } else if (w <=400 && w > 0) {
      ctx.font = "2em Abril Fatface";
      ctx.fillStyle = '#91bca8';
      ctx.fillText("Hi,",w*0.05,h*0.35);
      ctx.font = "3em Abril Fatface";
      ctx.fillStyle = '#e8dFc7';
      ctx.fillText("I'm Sam.",w*0.1,h*0.43);
      ctx.font = "2em Abril Fatface";
      ctx.fillStyle = '#91bca8';
      ctx.fillText("I like to code...",w*0.05,h*0.5);
    }
    // ctx.fillText("while(!succeed){try( );}",w*0.1,h*0.72);
  }

  function animate() {
    ctx.canvas.width  = window.innerWidth*0.9;
    ctx.canvas.height = window.innerHeight*0.9;
    requestAnimationFrame(animate);
    drawTitle();
    for (let i=0; i<ballArray.length; i++) {
      ballArray[i].update();
    }
  }

  // function randomX() {
  //   return Math.floor(Math.random() * (w-35)) + 1
  // }
  //
  // function randomY() {
  //   return Math.floor(Math.random() * (h-35)) + 1
  // }

  // function randomColor() {
  //   let colors = ['#bfa898','#3d484b','#91bca8']
  //   let rand = colors[Math.floor(Math.random() * colors.length)];
  //   return rand;
  // }

  window.onload = function() {
    init();
  };
