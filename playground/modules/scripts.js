import first, { returnHi as sayHi, last, middle } from './utils.js';
/*
  default exports can be called anything while named exports must use the specific name they are exported as.
  named imports can be renamed using the `as` syntax show above
*/

// import jiro from './jiro.js'
import * as everything from './jiro.js';
import { handleClick } from './handlers.js'

const name = 'horatio';

// console.log(sayHi(name));

console.log(` ${name} ${last} is ${middle}`);

// console.table(jiro);
// console.log(first);
// console.log(sayHi);
// console.log(everything);
//  console.log('default:', everything.default, 'food:',everything.food, 'dog:',everything.dog, 'function:', everything.eat);
// everything.eat('pie');

const button = document.querySelector('button');

button.addEventListener('click', handleClick);
