import { Currency, CurrencyDTO } from '../models/currency.model';

export const MOCK_BASE_CURRENCY = 'USD';

export const MOCK_CURRENCY: Currency = {
  currency: 'TEST',
  precision: 2,
  nameI18N: 'Test Currency',
  exchangeRate: {
    buy: 1,
    sell: 2,
    middle: 1.5,
    indicator: 1,
    lastModified: '2018-01-01T23:00:00Z',
  },
};

export const MOCK_CURRENCIES: Array<Currency> = [
  {
    currency: 'TEST 1',
    precision: 2,
    exchangeRate: {
      buy: 1,
      sell: 2,
      middle: 1.5,
      indicator: 1,
      lastModified: '2018-01-01T23:00:00Z',
    },
  },
  {
    currency: 'TEST 2',
    precision: 2,
    exchangeRate: {
      buy: 3,
      sell: 4,
      middle: 3.5,
      indicator: 1,
      lastModified: '2018-01-01T23:00:00Z',
    },
  },
];

export const MOCK_CURRENCY_DATA: CurrencyDTO = {
  baseCurrency: MOCK_BASE_CURRENCY,
  fx: MOCK_CURRENCIES,
};
