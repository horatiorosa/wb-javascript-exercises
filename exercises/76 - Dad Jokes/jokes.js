const jokeButton = document.querySelector('.getJoke');
const jokeButtonSpan = jokeButton.querySelector('.jokeText');
const jokeHolder = document.querySelector('.joke p');
const jokeText = document.querySelector('.jokeText');
const loader = document.querySelector('.loader');
const endPoint = `https://icanhazdadjoke.com/`;

const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

function pause(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchJoke() {
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

function randomItemFromArray(arr, not) {
  const item = arr[ Math.floor(Math.random() * (arr.length))];

  if(item === not) {
    console.log("Oh no, we used this one last time, look again");
    randomItemFromArray(arr, not);
  }
  return item
}

async function handleClick() {
  const { joke } = await fetchJoke();
  // console.log(joke);
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );
}

jokeButton.addEventListener('click', handleClick);


