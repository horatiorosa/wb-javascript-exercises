import { pause } from './utils.js';
import { loader, jokeButtonSpan, endPoint } from './elements.js';

// Named Export (we can have lots of these)
export async function fetchJoke() {
  // turn loader on
  loader.classList.remove('hidden');
  jokeButtonSpan.classList.add('hidden');

  const response = await fetch(endPoint, {
    headers: {
      Accept: 'application/json',
    },
  });
  await pause(100);
  const data = await response.json();
  // console.log(data);

  // turn loader off
  loader.classList.add('hidden');
  jokeButtonSpan.classList.remove('hidden');
  return data;
}


