import { handleClick } from './lib/handlers'; // eslint complains if the `.js`` file extension
import { jokeButton } from './lib/elements';

jokeButton.addEventListener('click', handleClick);
