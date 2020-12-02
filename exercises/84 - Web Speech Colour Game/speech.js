import { handleResult } from './handlers.js';
import { colorsByLength, isDark } from '/colors.js'

const colorsElement = document.querySelector('.colors');

function displayColors(colors) {
  // colors.map(color => console.log(color));  short cut syntax `isDark(color) && 'dark'` but applies a class calls false, better to use an empty string
  return colors.map(color =>
    `<span class="color ${color} ${isDark(color) ? 'dark' : ''}" style="background: ${color}"> ${color} </span>`)
  .join('');
}

window.SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

function start() {
  // see if their browser supports this
  if (!('SpeechRecognition' in window)) {
    console.log('Sorry, your browser does not support speech recognition');
    return
  }

  // it does work
   console.log('Starting Speech Recognition');
   //make a new speech recognition
   const recognition = new SpeechRecognition();
   recognition.continuous = true;
   recognition.interimResults = true;
   recognition.onresult = handleResult;
   recognition.start();

   console.log(recognition);
}

start();
colorsElement.innerHTML = displayColors(colorsByLength);

/*
  Keep high score in local storage
  split each work and loop over the words and test to see if a valid color
*/
