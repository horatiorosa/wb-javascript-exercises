const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new FaceDetector({ fastMode: true });
const optionsInputs = document.querySelectorAll('.controls input[type="range"]');

console.log(optionsInputs);

function handleOption(e) {
  // console.log(e.currentTarget.value);
  // console.log(e.currentTarget.name);
  const { value, name } = e.currentTarget;
  options[name] = parseFloat(value);
}

optionsInputs.forEach(input => input.addEventListener('input', handleOption))

const options = {
  SIZE: 10,
  SCALE: 1.5
}

// write a function that will populate the users video

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 }
  });
  video.srcObject = stream;
  await video.play();
  // size the canvas to be the same size as the video
  console.log(video.videoWidth, video.videoHeight);
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight
}

async function detect() {
  const faces = await faceDetector.detect(video); // give FaceDetector API access to an image, video or a canvas
  // console.log(faces);
  // console.log(faces.length);
  // ask the browser when the next animation frame is and tell it to run detect for us.
  faces.forEach(drawFace);
  faces.forEach(censor);
  requestAnimationFrame(detect); // recursion: when a function calls itself until an exit condition is met
}


function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = `#ffc600`;
  ctx.lineWidth = 2;
  /*
  console.log({width, height, top, left});
  above is the shorthand for below:
  console.log({width: width, height: height, top:top, left:left});
  */
  ctx.strokeRect(left, top, width, height);
}

/*
function censor(face) {
  const faceDetails = face.boundingBox;
}
Instead of doing the above, we can use detructuring to use the boundingBox property directly
*/

function censor({ boundingBox: face }) { // renaming boundingBox to a variable named face
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  // draw the small face
  // take that face back out and draw it back at normal size
  faceCtx.drawImage(
    // 5 source args
    video, // where does the source come from?
    face.x, // where do we start the source pull from?
    face.y,
    face.width,
    face.height,
    // 4 draw args
    face.x, // where should we start drawing?
    face.y,
    options.SIZE,
    options.SIZE
  );
  // draw the small face back on, but scale up
  const width = face.width * options.SCALE;
  const height = face.height * options.SCALE;

  faceCtx.drawImage(
    faceCanvas, // source
    face.x, // where do we start the source pull from?
    face.y,
    options.SIZE,
    options.SIZE,
    // drawing args
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height
  );
}

populateVideo().then(detect);
