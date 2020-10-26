const form = document.querySelector('.current_conversion_form');
const fromInput = form.querySelector('[name=from_amount]');
const fromCurrency = form.querySelector('[name="from_currency"]');
const toCurrency = form.querySelector('[name="to_currency"]');
const toAmount = form.querySelector('.to_amount');
const endpoint = `https://api.exchangeratesapi.io/latest`;
const ratesByBase = {};


const currencies = {
  '': 'Select Currency',
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
    // console.log('currencyCode',currencyCode, 'currencyName',currencyName);
    `<option value="${currencyCode}">${currencyCode} ${currencyCode ? '-' : ''} ${currencyName}</option>`
    )
    .join('');
}

function formatCurrency(amount, currency) {
  // can pass the Intl.NumberFormat API the language of the reader, so you can pass it 'en-US'  or th local where you will be reading it in
  if (currency) {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,

    }).format(amount);
  }
}

// function formatFromInput() {
//   fromInput.innerHTML = formatCurrency(fromInput.value, fromCurrency.value);
//   console.log('from',fromInput.innerHTML)
// }

async function handleInput(e) {
  // console.log('target', e.target.value); // where the event actually occurs
  // console.log('current target', e.currentTarget); // listener is on the form itself
  const rawAmount = await convert(
    fromInput.value,
    fromCurrency.value,
    toCurrency.value
  );

  // console.log('rawAmount',rawAmount);
  // toAmount.innerHTML = `${rawAmount} ${toCurrency.value}`;
  toAmount.textContent = formatCurrency(rawAmount, toCurrency.value);
}

async function fetchRates(base = 'USD', symbols = []) { // i didnt make use of symbols yet
  const response = await fetch(`${endpoint}?base=${base}&symbols=${symbols}`);
  const rates = await response.json();
  // console.log(rates)
  return rates;
}

async function convert(amount, from, to) {
  // first check it we have the rates to convert from that currency
  if(!ratesByBase[from]) {
    console.log(`we dont have ${from} to convert to ${to} so let go get it.  `);
  const rates = await fetchRates(from);
  console.log('rates',rates);
  // store rates for next time
  ratesByBase[from] = rates;
  }
  // convert the amout that they pass in
  const rate = ratesByBase[from].rates[to];
  // const convertedAmount = Number((amount * rate).toFixed(2));
  const convertedAmount = (amount * rate).toFixed(2);
  console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);

  return convertedAmount;
}

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
