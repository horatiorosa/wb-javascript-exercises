const jokeButton = document.querySelector('.getJoke');
const jokeButtonSpan = jokeButton.querySelector('.jokeText');
const jokeHolder = document.querySelector('.joke p');
const jokeText = document.querySelector('.jokeText');
const loader = document.querySelector('.loader');
const endPoint = `https://icanhazdadjoke.com/`;


export { jokeButton, jokeButtonSpan, jokeHolder, jokeText, loader, endPoint };
