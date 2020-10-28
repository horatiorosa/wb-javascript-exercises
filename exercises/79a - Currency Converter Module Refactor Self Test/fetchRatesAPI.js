import { endpoint } from './utils.js';
import { localCurrency } from './currencies.js';


export async function fetchRates(base = localCurrency) {
  const response = await fetch(`${endpoint}?base=${base}`);
  const rates = await response.json();
  return rates;
}
