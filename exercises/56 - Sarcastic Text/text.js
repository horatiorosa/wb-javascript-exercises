const textarea = document.querySelector('[name="text"]');
const result = document.querySelector('.result');
const filterInputs = Array.from(document.querySelectorAll('[name="filter"]')); // use Array.from to create an array here rather than in the transformText function to do it ONCE on page load rather than each time the find() filter is used #PERFORMANT
const funkyLetters = {
  '-': '₋', '!': 'ᵎ', '?': 'ˀ', '(': '⁽', ')': '₎', '+': '⁺', '=': '₌', '0': '⁰', '1': '₁', '2': '²', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', '8': '⁸', '9': '⁹', a: 'ᵃ', A: 'ᴬ', B: 'ᴮ', b: 'ᵦ', C: '𝒸', d: 'ᵈ', D: 'ᴰ', e: 'ₑ', E: 'ᴱ', f: '𝒻', F: 'ᶠ', g: 'ᵍ', G: 'ᴳ', h: 'ʰ', H: '𝒽', I: 'ᵢ', i: 'ᵢ', j: 'ʲ', J: 'ᴶ', K: '𝒦', k: '𝓀', l: 'ˡ', L: 'ᴸ', m: 'ᵐ', M: '𝓶', n: 'ℕ', N: 'ᴺ', o: 'ᵒ', O: 'ᴼ', p: 'ᵖ', P: 'ᴾ', Q: 'ᵠ', q: 'ᑫ', r: 'ʳ', R: 'ᵣ', S: 'ˢ', s: 'ˢ', t: 'ᵗ', T: '𝕥', u: 'ᵘ', U: 'ᵤ', v: 'ᵛ', V: 'ᵥ', w: '𝓌', W: 'ʷ', x: 'ˣ', X: 'ˣ', y: 'y', Y: 'Y', z: '𝓏', Z: 'ᶻ'
};

const filters = {
  // sarcastic: function(letter, index) {},
  sarcastic(letter, index) {
    // if it is odd, it will return 1, which is truthy
    if (index % 2) {
      return letter.toUpperCase();
    }
    // if it is even, it will return 0 , which is falsy
    return letter.toLowerCase();
  },
  // funky: function(letter) {},
  funky(letter) {
    // check if there is a funky letter for this case
    let funkyLetter = funkyLetters[letter];
    if (funkyLetter) return funkyLetter;
    // if there is not, check is there is a lowercase version
    funkyLetter = funkyLetters[letter.toLowerCase()];
    if (funkyLetter) return funkyLetter;
    // if there is nothing, return the unchanged letter
    return letter;
  },
  //  unable(: function(letter) {},
  unable(letter) {
   const random = Math.floor(Math.random() * 3);
   if (letter === " " && random === 2) {
      return "...";
   }

   return letter;
  },
};

function transformText(text) {
  // const filter = document.querySelector('[name="filter"]:checked').value;
  const filter = filterInputs.find(input => input.checked).value;
  // take text and loop over each letter
  /*
    my alternate method, type value set by click event event listener
    const mod = Array.from(text).map(filters[type]);
  */
  const mod = Array.from(text).map(filters[filter]); // bc filter is a variable and not a property, we need square brackets to look up the property
  // console.log(mod)
  result.textContent = mod.join('');
}



const getInput = (e => transformText(e.target.value));

textarea.addEventListener('input', getInput);

/*
  the way I was originally trying to set the input type
  let type;
  const test = filterInputs.forEach(input => input.addEventListener('click', function() {
    type = input.value
  }))
*/
filterInputs.forEach(input =>
  input.addEventListener('input', () => {
    transformText(textarea.value);
  })
);

