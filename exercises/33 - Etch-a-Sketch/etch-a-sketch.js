// using the arrow keys, draw straight color lines on the canvas. Clear teh drawing when user clicks the shake button, animate the canvas to simulate shaking

// select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
console.log(ctx);
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 20;

// setup the canvas for drawing
// const width = canvas.width;
// const height = canvas.height;
// above can be written as follows;
// (destructured short form)
const { width, height } = canvas;

// create random x and y starting points on the canvas

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
let hue = 0;

ctx.lineJoin = 'round'; // makes for rounded off line edges
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT; // default is 1px
ctx.strokeStyle = `hsl( ${hue}, 100%, 50%)`;

ctx.beginPath(); // start the drawing
ctx.moveTo(x,y); // start at 200px in, 200px from top
ctx.lineTo(x,y);
ctx.stroke(); // draws line from where init moveTo to lineTo



// write a draw function
// function draw(options) {
//   console.log(options.key);
// }

// we can use destructuring in the params to directly use the the keys value as a variable

function drawStart() {
  ctx.beginPath();
  ctx.moveTo(x,y);
}

function startingPlace() {
  ctx.lineTo(x,y);
  ctx.stroke();
}

function draw({ key }) {
  console.log(key);
  // increment the hue
  // hue += 30;
  // ctx.strokeStyle = `hsl( ${hue}, 100%, 50%)`;
  // or set the strokeStyle hue randomly
  ctx.strokeStyle = `hsl( ${Math.random() * 360}, 100%, 50%)`;
  // start the path
  drawStart()
  // move out x and y values depending on what the user did
  // x -= MOVE_AMOUNT; // x = x - MOVE_AMOUNT;
  // y -= MOVE_AMOUNT;

  switch(key) {
    case 'ArrowUp':
     y -= MOVE_AMOUNT;
     break;
    case 'ArrowDown':
     y += MOVE_AMOUNT;
     break;
    case 'ArrowLeft':
     x -= MOVE_AMOUNT;
     break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
    break;
    default:
    console.log("that is not a valid move!");
     break;
  }

  // ctx.lineTo(x,y);
  // ctx.stroke();

  startingPlace();
}

// handler for the keys
function handleKey(e) {
  // const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

  // arrowKeys.forEach(function(arrowKey) {
  //   if (e.key.includes(arrowKey)) {
  //     e.preventDefault;
  //     console.log("handling key");
  //   }
  // })

  // per Wes solution below

  if (e.key.includes('Arrow')) {
    e.preventDefault;
    draw({ key: e.key })
    // console.log(e.key);
  }
}

// clear / shake function
function addShakeClass() {
  canvas.classList.add('shake');
}

function removeShakeClass() {
  canvas.classList.remove('shake');
  console.log('done the shake');
  // canvas.removeEventListener('animationend', removeShakeClass);
}

function clearCanvas() {
  addShakeClass();
  // canvas.addEventListener('animationend', function() {
  //   canvas.classList.remove('shake');
  //   console.log('done the shake');
  // });
  /*
    anon function causes multiple event listeners so either add '{ once: true }' as a third argument
    } { once: true },
    or use a named function as shown below
  */
  canvas.addEventListener('animationend', removeShakeClass);
  ctx.clearRect(0, 0, width, height);
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);

