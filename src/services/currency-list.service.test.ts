import { getCountryNames, getCurrencyPrecision } from './currency-list.service';

jest.mock('countries-list', () => ({
  countries: {
    US: {
      name: 'USA',
      currency: ['TEST', 'TST'],
    },
    TS: {
      name: 'Test',
      currency: ['TEST', 'TEST 2', 'TST'],
    },
    CZ: {
      name: 'Czech Republic',
      currency: ['CZK'],
    },
  },
}));
describe('getCurrencyPrecision', () => {
  it('should return number with precision if precision is provided', () => {
    const value = 5.6789;
    const precision = 3;
    const expectedResult = '5.679';
    expect(getCurrencyPrecision(value, precision)).toBe(expectedResult);
  });

  it('should return value with default precision if no precision is provided', () => {
    const value = 5.6789;
    const expectedResult = '5.68';
    expect(getCurrencyPrecision(value)).toBe(expectedResult);
  });
  it('should return value with default precision if precision is null', () => {
    const value = 5.6789;
    const expectedResult = '5.68';
    expect(getCurrencyPrecision(value, null as any)).toBe(expectedResult);
  });

  it('should return undefined if neither value nor precision is provided', () => {
    const expectedResult = '';
    expect(getCurrencyPrecision()).toBe(expectedResult);
  });
  it('should return undefined if no value is provided', () => {
    const value = 0;
    const expectedResult = '';
    expect(getCurrencyPrecision(value)).toBe(expectedResult);
  });
});

describe('getCountryNames', () => {
  it('should return empty array if no currency is passed', () => {
    expect(getCountryNames('')).toEqual([]);
  });
  it('should return empty array if no country has matching currency', () => {
    expect(getCountryNames('TEST 1')).toEqual([]);
  });
  it('should return array of country names that have matching currency', () => {
    expect(getCountryNames('TEST')).toEqual(['USA', 'Test']);
  });
  it('should put the country with the code closest to currency code at the beginning of the list', () => {
    expect(getCountryNames('TST')).toEqual(['Test', 'USA']);
  });
});
