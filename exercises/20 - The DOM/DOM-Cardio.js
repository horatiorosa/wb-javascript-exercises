// Make a div
const wrapper = document.createElement('div');

// add a class of wrapper to it
wrapper.classList.add('wrapper');

// put it into the body
document.body.insertAdjacentElement('afterbegin', wrapper);
// alternate approach: document.body.appendChild(wrapper);


// make an unordered list
const list = document.createElement('ul');
list.classList.add('wrapper');

// add three list items with the words "one, two three" in them
const liOne = document.createElement('li')
liOne.textContent = 'One';
list.appendChild(liOne);

const liTwo = liOne.cloneNode(true);
liTwo.textContent = 'Two';
liOne.insertAdjacentElement('afterend', liTwo);

const liThree = liOne.cloneNode(true);
liThree.textContent = 'Three';
liTwo.insertAdjacentElement('afterend', liThree);

// put that list into the above wrapper
wrapper.insertAdjacentElement('beforebegin', list);
// alternate approach: wrapper.innerHTML = list;

// set the width to 250
const width = `250`;

// set the source to an image
const src = `https://picsum.photos/${width}`;

// add an alt of Cute Puppy
const desc = `Cute Puppy`;

// create an image
const myImg = `
   <h2>WTF, such cuteness</h2>
   <img src="${src}" alt="${desc}"/>
`;

const imgFragment = document.createRange().createContextualFragment(myImg);

// Append that image to the wrapper
wrapper.append(imgFragment);

// add a class of cute
const cuteImg = document.querySelector('.wrapper img');
cuteImg.classList.add('cute');

// with HTML string, make a div, with two paragraphs inside of it
const myHTML = `
 <div class="my-html-div">
  <p>some text text text text text text text text text</p>
  <p>more text text text text text text text text text</p>
 </div>
`;
// alternate approach: const myFragment = document.createRange().createContextualFragment(myHTML);

// put this div before the unordered list from above
list.insertAdjacentHTML('beforebegin', myHTML);
// alternate approach: document.body.prepend(myFragment);

// add a class to the second paragraph called warning
const firstDiv = document.querySelectorAll('div')[0]; // breaks if divs are removed/added
firstDiv.querySelectorAll('p')[1].classList.add('warning');

// remove the first paragraph
firstDiv.querySelectorAll('p')[0].remove();

/*
  alternate approach:
  const myHTMLDiv = document.querySelector('.my-html-div')
  myHTMLDiv.children[1].classList.add('warning');
  myHTMLDiv.children[0].remove();
*/


// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>

const generatePlayerCard = function(name, age, height) {
  const ageInDogYears = age * 7;
  const playerCardInfo = `
    <div class="playerCard">
      <h2>
        ${name} - ${age}
      </h2>
      <p>
        ${name}'s height is ${height} cm and is ${age} years old. In dog years, ${name} would be ${ageInDogYears}. ${name} would be a old dog!
      </p>
      <button class="delete" type="button">
        &times; Delete
      </button>
    </div>
  `;
  return playerCardInfo;
}

// make a new div with a class of cards
const cards =document.createElement('div');
cards.classList.add('cards');

// Have that function make 4 cards
let playerCard = generatePlayerCard('Jiro', 7, 12);
playerCard += generatePlayerCard('Nana', 5, 2);
playerCard += generatePlayerCard('Ruby', 2, 8);
playerCard += generatePlayerCard('Horatio', 51, 87);
playerCard += generatePlayerCard('Fergie', 11, 60);
playerCard += generatePlayerCard('Mary', 29, 55);
playerCard += generatePlayerCard('Constance', 40, 150);
playerCard += generatePlayerCard('Maxie', 5, 10);
playerCard += generatePlayerCard('Lizzie', 9, 11);
playerCard += generatePlayerCard('Bob', 99, 101);
playerCard += generatePlayerCard('James', 19, 112);
playerCard += generatePlayerCard('Granny', 32, 175);

// append those cards to the div
// put the div into the DOM just before the wrapper element
cards.insertAdjacentHTML('afterbegin', playerCard);
wrapper.insertAdjacentElement('beforebegin', cards);

// Bonus, put a delete Button on each card so when you click it, the whole card is removed
const cardButtons = document.querySelectorAll('.delete');

function deleteCard(event) {
  event.currentTarget.closest('.playerCard').remove(); // best solution, wll not break if button nesting is changed
  // or: event.currentTarget.parentElement.remove();
}

  cardButtons.forEach(cardButton => cardButton.addEventListener('click', deleteCard));

/*
  my original solution, not as clean as above and the eventlistener was wonky

  // function deletePlayerCard() {
//   const cardButtons = document.querySelectorAll('.delete');

//   cardButtons.forEach(cardButton => cardButton.addEventListener('click',
//     function() {
//       cardButton.parentElement.remove();
//     })
//   )
// }

*/


