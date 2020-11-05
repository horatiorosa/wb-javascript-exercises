import { fetchJoke } from './index.js';
import { randomItemFromArray } from './utils.js';
import buttonText from '../data/buttonText.js';
import { jokeHolder, jokeButtonSpan } from './elements.js';

export async function handleClick() {
  const { joke } = await fetchJoke();
  // console.log(joke);
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );
}
