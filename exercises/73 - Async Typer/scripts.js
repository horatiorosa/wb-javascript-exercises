function pause(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* example of pure function.
  this type of fiction will always return the exact same value given the same arguements

  function add(a, b) {
    return a + b;
  }

  functions with random numbers and dates are not pure functionsm making it difficult to write tests
*/

function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  // (150 - 20) = 130, random no. would is bet. 0 and 130, for nos. bet. 20 and 150, we add the min. (150 -20) => (130) + 20 = 150, random nos. would be bet. 20 and 150. passing randomNumber in the args allows for a more pure function. If you pass in the same "random" no., you always get the same result
  return Math.floor(randomNumber * (max - min) + min);
}

// async `for of` loop

// async function draw(el) {
//   // console.log(el);
//   const text = el.textContent;
//   let soFar = '';
//   for(const letter of text) {
//     // console.log(letter);
//     soFar += letter;
//     el.textContent = soFar;
//     // wait for some amount of time
//     const { typeMin, typeMax } = el.dataset;
//     const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
//     await pause(amountOfTimeToWait);
//   }
// }

// recursion loop to do the same as above. recusion is the concept of function calling itself until an exit condition is met

function draw(el) {
  let index = 1;
  const text = el.textContent;
  const { typeMin, typeMax } = el.dataset;

  async function drawLetter() {
    el.textContent = text.slice(0, index);
    index += 1;
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
    await pause(amountOfTimeToWait);
    // exit condition
    if(index <= text.length) {
      drawLetter(); // this is the recursive part
    }
  }
  // when this function `draw()` runs, kick off `drawLetter()`
  drawLetter();
}

/*
  const els = document.querySelectorAll('[data-type]');

  // els.forEach(el => draw(el)); REFACTOR 👇

  els.forEach(draw)

  Shortened even further 👇
*/

document.querySelectorAll('[data-type]').forEach(draw);
