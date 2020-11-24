import { isValidColor } from './colors.js';

function logWords(results) {
  // console.log(results[results.length -1][0].transcript);
}

export function handleResult({ results }) {
  // console.log(event); // event is the SpeechRecognitionEvent
  logWords(results);
  let words = results[results.length -1][0].transcript;
  // console.log('handleResult words:',words);
  // lower case everything (speeech input)
  let color = words.toLowerCase();
  // strip white space
  color = color.replace(/\s/g, '');
  // console.log('color: ',color);
  // check is word is a valid color
  if (!isValidColor(color)) return;
  // if it is, show the UR for that
  const colorSpan = document.querySelector(`span.color.${color}`);
  // console.log(colorSpan);
  colorSpan.classList.add('got')
  console.log('This is a valid color');
  console.log(color);
  // change the background color
  document.body.style.backgroundColor = color;
}




// SpeechRecognitionResult
// SpeechRecognitionResultList
