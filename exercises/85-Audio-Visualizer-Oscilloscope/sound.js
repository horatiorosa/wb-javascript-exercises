import { hslToRgb } from './utils.js';

const WIDTH = 1500;
const HEIGHT = 1500;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width= WIDTH;
canvas.height = HEIGHT;
let analyser;
let bufferLength;

function handleError(err) {
console.log('You must give access to your mic in order to proceed.', err);
}

async function getAudio() {
  const stream = await navigator.mediaDevices
  .getUserMedia({ audio: true })
  .catch(handleError);

  const audioCtx = new AudioContext();
  analyser = audioCtx.createAnalyser();
  const souce = audioCtx.createMediaStreamSource(stream);
  souce.connect(analyser);
  // how much data should we collect
  analyser.fftSize = 2 ** 10;
  // how many pieces of data are there?
  bufferLength = analyser.frequencyBinCount;
  // pull the data off the audio
  const timeData = new Uint8Array(bufferLength);
  const frequencyData = new Uint8Array(bufferLength);
  drawTimeData(timeData);
  drawFrequencyData(frequencyData);
}

function drawTimeData(timeData) {
  // call the method and inject the time data into out timeData array
  analyser.getByteTimeDomainData(timeData);
  // console.log('timeData', timeData);
  // now that we have the data, let's turn it into something visual
  // 1. clear the canvas TODO
  ctx.clearRect(0,0, WIDTH, HEIGHT);
  // 2. set up some canvas drawing
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#7FFF00';
  ctx.beginPath();
  const sliceWidth = WIDTH / bufferLength;
  // console.log(sliceWidth);
  let x = 0; // as we loop, we want to increment by sliceWidth.
  timeData.forEach((data, i) => {
    const v = data / 128; // this will act as a multiplier that we will use in drawing the data
    const y = (v * HEIGHT) / 2; // how high or low will the drawing go?
    if (x === 0) {
      ctx.moveTo(x,y);
    } else {
      ctx.lineTo(x,y);
    }
    x += sliceWidth;
  });

  ctx.stroke();
  // call itself as soon as possible
  requestAnimationFrame(() => drawTimeData(timeData));
}

function drawFrequencyData(frequencyData) {
  // get the frequency data into out frequency array
  analyser.getByteFrequencyData(frequencyData);
  // TODO MAP DECIBLE VALUES REC'D FROM getByteFrequencyData TO HSL

  // console.log('frequencyData', frequencyData);
  // figure out the bar width
  const barWidth = (WIDTH / bufferLength) * 2.5;
  // console.log(barWidth);
  let x = 0;
  frequencyData.forEach(amount => {
    // frequency data comes in from 0 to 255
    const percent = amount / 255;
    const [h,s,l] = [(360 / (percent * 360)) - 0.5, .8, 0.5];
    const barHeight = (HEIGHT * percent) / 2;
    // convert the color to HSL TODO
    const [r, g, b] = hslToRgb(h, s, l);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    // ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.fillRect(
      x,
      HEIGHT - barHeight,
      barWidth,
      barHeight
    )
    x += barWidth + 2;
  })

  requestAnimationFrame(()=> drawFrequencyData(frequencyData));
}

getAudio();
