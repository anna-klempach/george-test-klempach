import { countries, getCountryCode } from 'countries-list';

export const NO_DATA_FOUND_TEXT = 'No data found.';
export const NOT_AVAILABLE_TEXT = 'N/A';
export const DEFAULT_PRECISION = 2;

export const getCurrencyPrecision = (
  value: number = 0,
  precision: number = DEFAULT_PRECISION
) => (value ? value.toFixed(precision ?? DEFAULT_PRECISION) : '');

export const getCountryNames = (currency?: string) => {
  return Object.entries(countries)
    .filter(([_code, country]) =>
      country.currency.find((curr: string) => curr === currency)
    )
    .sort(([code]) => (currency?.length && currency.includes(code) ? -1 : 0))
    .map(([_code, country]) => country.name);
};

export const getFlagCountryCode = (countryName: string = '') =>
  getCountryCode(countryName).valueOf().toString();
