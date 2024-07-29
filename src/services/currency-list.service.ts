export const NO_DATA_FOUND_TEXT = 'No data found.';
export const NOT_AVAILABLE_TEXT = 'N/A';
export const DEFAULT_PRECISION = 2;

export const getImageSrc = (currency: string = '') =>
  currency ? `./flags/${currency.toLowerCase().slice(0, 2)}.png` : '';

export const getCurrencyPrecision = (
  value: number = 0,
  precision: number = DEFAULT_PRECISION
) => (value ? value.toFixed(precision ?? DEFAULT_PRECISION) : '');
