export async function handleClick(e) {
  // return Object.entries(currencies)
  //   .map([currencyCode, currencyName]) =>
  //   ``
  // const currenciesModule = await import('./currencies.js ');
  // if you are destructuring  and there is a property called default, we cant use that as a var so we need to rename it
const { localCurrency, default: currency } = await import('./currencies.js ');
  console.log( currency, localCurrency );
}
