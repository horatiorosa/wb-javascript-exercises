const form = document.querySelector('.current_conversion_form');
const fromInput = form.querySelector('[name=from_amount]');
const fromCurrency = form.querySelector('[name="from_currency"]');
const toCurrency = form.querySelector('[name="to_currency"]');
const toAmount = form.querySelector('.to_amount');
const ratesByBase = {};
const endpoint = `https://api.exchangeratesapi.io/latest`;

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
  if (currency) {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }
}


export {
  form,
  fromInput,
  fromCurrency,
  toCurrency,
  toAmount,
  generateOptions,
  formatCurrency,
  ratesByBase,
  endpoint,
};
