import { MOCK_BASE_CURRENCY } from '../mocks/currency.mock';
import { getCurrencyPrecision, getImageSrc } from './currency-list.service';

describe('getImageSrc', () => {
  it('should return image src if currency is provided', () => {
    const slicedCurrency = MOCK_BASE_CURRENCY.toLowerCase().slice(0, 2);
    const expectedResult = `./flags/${slicedCurrency}.png`;
    expect(getImageSrc(MOCK_BASE_CURRENCY)).toBe(expectedResult);
  });

  it('should return empty string if currency is not provided', () => {
    expect(getImageSrc('')).toBe('');
  });
});
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

  it('should set default value to 0 and precision to default precision value if neither value nor precision is provided', () => {
    const expectedResult = '0.00';
    expect(getCurrencyPrecision()).toBe(expectedResult);
  });
  it('should set default value to 0 if no value is provided', () => {
    const value = 0;
    const expectedResult = '0.00';
    expect(getCurrencyPrecision(value)).toBe(expectedResult);
  });
});
