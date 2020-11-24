import { sanitize } from 'dompurify';

const input = document.querySelector('[name="input"]');
const output = document.querySelector('.output');
const buttons = document.querySelectorAll('nav button');

/* BEFORE SANITIZING
  input.addEventListener('input', () => {
    output.innerHTML = input.value.replace(/\n/g, '<br>');
});
*/
// Sanitized
input.addEventListener('input', () => {
  const clean = sanitize(input.value, {
    FORBID_ATTR: ['width', 'height', 'style'],
    FORBID_TAGS: ['style'],
  });
  output.innerHTML = clean.replace(/\n/g, '<br>'); // regex finds all new lines blobally and replaces them with a break tag
});


/*
  the library strips out onload() and onerror() scripts from the img tag

  <img src="https://source.unsplash.com/200x200" alt="Nice" onload="document.querySelector('button').click()">

  <img src="https://nothing.conoingcom" onerror="alert('hacked')">

  the options object allows you to further restrict other DOM changing things, we have forbidden some attributes  as well as style tags

*/

// trigger an input even on page load
input.dispatchEvent(new Event('input'));

buttons.forEach(button =>
  button.addEventListener('click', e => {
    alert(e.currentTarget.textContent);
  })
);
