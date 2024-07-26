export const NO_DATA_FOUND_TEXT = 'No data found.';
export const NOT_AVAILABLE_TEXT = 'N/A';

export const getImageSrc = (currency: string = '') =>
  currency ? `./flags/${currency.toLowerCase().slice(0, 2)}.png` : '';
