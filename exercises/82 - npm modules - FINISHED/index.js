import pause from 'waait'; // default export, can name anything
import faker from 'faker';
import { format, formatDistance } from 'date-fns';
import axios from 'axios';
import { intersection, cloneDeep, isEqual } from 'lodash';
import to from 'await-to-js';

// eslint-disable-next-line max-len
// waait

async function go() {
  console.log('Going!');
  await pause(1000);
  console.log('Did you notice the pause?');
}

go();


// faker

/*
  you can import specific functions from faker
  eg `import { name } from 'faker'`
  name.firstName();
*/
// console.log(faker);
// console.log();
// console.log(`"${faker.hacker.phrase()}" shouted ${faker.name.firstName()}, ${faker.company.companyName()}'s ${faker.name.jobTitle()}.`);
// how can we get an array of 10 fake names?

// const fakeNames = Array.from({ length: 10 }, faker.name.firstName);
const fakeNames = Array.from({ length: 10 }, () => `${faker.name.firstName()} ${faker.name.lastName()}`);

// console.log(fakeNames);


// date-fns

const diff = formatDistance(
  // new Date(1986, 3, 4, 15, 32, 0),
  new Date(),
  new Date(2019, 3, 4, 10, 32, 0),
  { addSuffix: true },
);

console.log(diff);

// use `format`` to get a date like this: November the 4th 2020
const date = new Date();
const formattedDate = format(
  date,
  `'Today is' LLLL 'the' do yyyy'`, // or simply 'y' for the year
);
console.log(formattedDate);

// axios

async function getJoke() {
  // const res = await axios.get('https://icanhazdadjoke.com/',
  const { data } = await axios.get('https://icanhazdadjoke.com/', // get data via destructing
    {
      headers: {
        Accept: 'application/json',
      },
    });
  console.log(data.joke); // got this by digging into the res object
}

getJoke();


// lodash

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const b = [5, 3, 8, 7, 20, 65, 200];

const sameValues = intersection(a, b);
console.log('same values', sameValues);

const person1 = { name: 'horatio' };
const person2 = { name: 'horatio' };

console.log('without dash eq ', person1 === person2);
// #false
// bc these are 2 different objects
console.log('with lodash eq ', isEqual(person1, person2));
// #true
// isEqual is a deep compation of the VALUES to determine if equivalent


// await-to-js

function checkIfNameIsCool(yourName) {
  // eslint-disable-next-line consistent-return, func-names, prefer-arrow-callback
  return new Promise(function (resolve, reject) {
    if (yourName === 'horatio') {
      return resolve('Cool Name');
    }
    reject(new Error('Not so cool dude'));
  });
}
// eslint-enable-next-line consistent-return, func-names, prefer-arrow-callback
async function checkName() {
  // const nameDescription = await checkIfNameIsCool('Horatio');
  // console.log(nameDescription);
  /*
    const response = await to(checkIfNameIsCool('horatio'));

    // eslint-disable-next-line max-len
    // the response is an arrray, the first item will be the error and the second is the resolve value

    console.log(response);
  */
  // lets use dedtructuring for more useful error handling
  const [error, success] = await to(checkIfNameIsCool('horatio'));
  if (error) {
    // deal with it
    console.log("oh, 💩, something went wrong");
    console.log(error);
  } else {
    console.log('success', `$ {success}`);
  }
}


checkName();
