function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(1000);
  // remove popup entirely
  // popup.parentElement.removeChild(popup); old way
  popup.remove();
  // console.log(popup); // popup still in memory so need to do this:
  popup = null;
  // console.log(popup);
}

function ask(options) {
  return new Promise(async function(resolve) { // async on parent func.
    // need to create a popup with all the fields in it
    const popup = document.createElement('form'); // createElement immediately returns a DOM node that we can listen for events on, can't do the same with backticks wrapping form tag markup
    popup.classList.add('popup');
    popup.insertAdjacentHTML('afterbegin',
     `<fieldset>
        <label> ${options.title} </label>
        <input type="text" name="input"></input>
        <button type="submit">Submit</button>
      </fieldset>`
    );

    // check if they want a cancel button
    if (options.cancel) {
      const skipButton = document.createElement('button');
      skipButton.type = 'button'; // if not specified, browser assume this is a submit button
      skipButton.textContent = 'Cancel';
      // listen for a click on that cancel button
      function cancel() {
        resolve(null);
        destroyPopup(popup);
      }

      popup.firstElementChild.appendChild(skipButton);
      skipButton.addEventListener(
        'click',
        cancel,
        {once: true}
      );
    }

    // listen for a submit event on the inputs
    function handleSubmit(e) {
      e.preventDefault();
      console.log('Submitted');
      // when someone does submit the form, resolve the data that was in the input box (e.target gets us the form, e.target.input gets us `name="input"`)
      resolve(e.target.input.value);
      destroyPopup(popup);
    }

    popup.addEventListener(
      'submit',
      handleSubmit,
      {once: true}  // run eventListener once for submit
    );


    // insert that popup into the DOM
    document.body.appendChild(popup);
    // put a very small timeout before we add the open class so the popup has time to be created and then use the CSS transition we want
    await wait(50);
    popup.classList.add('open');
  });
}

// select all buttons that have a question
async function askQuestion(e) {
  const button = e.currentTarget;
  const cancel = 'cancel' in button.dataset;
  /*
    this is how to check is a property exists in an object
    const jiro = {dog: true, name: 'jiro'}
    # undefined
    jiro
    # {dog: true, name: "jiro"}
    'dog' in jiro
    # true
  */
  // alt method: const cancel = button.hasAttribute('data-cancel');
  const answer = await ask({
    title: button.dataset.question,
    // cancel: cancel, shorthand below
    cancel,
  });
  console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');
// console.log(buttons);
buttons.forEach(
  button => button.addEventListener(
    'click',
    askQuestion
  )
);

const questions = [
  {title: 'What is your name'},
  {title: 'What is your age', cancel: true},
  {title: 'What is your dog\'s name'},
];

/*
 *** this soution fires off all 3 questions concurrently and opens 3 popups! NG
  const answers = Promise.all([
    ask(questions[0]),
    ask(questions[1]),
    ask(questions[2]),
  ])
  .then(
    answers => {
      console.log(answers);
    }
  );

  REFACTOR ABOVE
  const queuePromises = questions.map(ask)
  console.log(queuePromises)
  # (3) [Promise, Promise, Promise]
    0: Promise {<pending>}
    1: Promise {<pending>}
    2: Promise {<pending>}
    length: 3
    __proto__: Array(0)

  Promise.all(questions.map(ask)).then(data => console.log(data));
  # (3) ["cat", "200", "Jiro"]

*** this soution also fires off all 3 questions concurrently and opens 3 popups! NG
questions.forEach(async function(question) {
  const answer = await ask(question);
  console.log(answer);
});
*/

/*
// unlike `map`` and `forEach`, `for of` allows us to pause a loop by using await inside of the loop
async function askMany() {
  for(const question of questions) {
    const answer = await ask(question);
    console.log(answer);
  }
}

askMany();
*/

// a good utility function #very useful to do the above
async function asyncMap(array, callback) {
  // make an array to store the results
  const results = [];
  for(const item of array) {
    // const result = await callback(item)
    //results.push(result); SHORTHAND BELOW using BEDMAS
    results.push(await callback(item));
  }
  // when we are done with the loop, return it
  return results;
}

async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();

