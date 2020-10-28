import { ratesByBase } from './utils.js';
import { fetchRates } from './fetchRatesAPI.js';

export async function convert(amount, from, to) {
  if(!ratesByBase[from]) {
    console.log(`we dont have ${from} to convert to ${to} so let go get it.`);
    const rates = await fetchRates(from);
    console.log('rates', rates);
    ratesByBase[from] = rates
  }

  const rate = ratesByBase[from].rates[to];
  const convertedAmount = (amount * rate).toFixed(2);
  console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);

  return convertedAmount;
}
