const p = document.querySelector('p');
// console.log(p);

// console.log(p.textContent);
// p.textContent = " Your mother!"
// console.dir(p.textContent);

const wes = document.querySelector('.wes');
// console.log(wes);

wes.insertAdjacentText('afterbegin', '😂 ');

const pic = document.querySelector('.nice')

console.log(pic);

function toggleRound() {
  pic.classList.toggle('round');
}

document.addEventListener('click', toggleRound);
