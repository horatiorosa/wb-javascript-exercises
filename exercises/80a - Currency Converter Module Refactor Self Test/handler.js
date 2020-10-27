import { fromInput, fromCurrency, toCurrency, toAmount, formatCurrency } from './utils.js';
import { convert } from './currencyConverter.js';

export async function handleInput(e) {
  const rawAmount = await convert(
    fromInput.value,
    fromCurrency.value,
    toCurrency.value,
  );

  toAmount.textContent = formatCurrency(rawAmount, toCurrency.value);
}

