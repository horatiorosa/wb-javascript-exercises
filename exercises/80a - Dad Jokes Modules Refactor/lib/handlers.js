import { fetchJoke } from './index';
import { randomItemFromArray } from './utils';
import buttonText from '../data/buttonText';
import { jokeHolder, jokeButtonSpan } from './elements';

export async function handleClick() {
  const { joke } = await fetchJoke();
  // console.log(joke);
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent,
  );
}
