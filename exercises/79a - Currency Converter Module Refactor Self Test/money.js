import currencies from './currencies.js';
import { form, fromCurrency, toCurrency, generateOptions } from './utils.js';
import { handleInput } from './handler.js';

const optionsHTML = generateOptions(currencies);
fromCurrency.innerHTML = optionsHTML;
toCurrency.innerHTML = optionsHTML;

// console.log('optionsHTML: ',optionsHTML);
// populate the options elements on page load
/*
  A alternative to multiple eventListeners would be to listen to change events on the entire form!
  fromCurrency.addEventListener('change', handleClick);
  toCurrency.addEventListener('change', handleClick);
*/
form.addEventListener('input', handleInput);
