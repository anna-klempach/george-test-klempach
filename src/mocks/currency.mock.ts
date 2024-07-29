import {
  Currency,
  CurrencyDataDTO,
  CurrencyDTO,
} from '../models/currency.model';

export const MOCK_BASE_CURRENCY = 'USD';

export const MOCK_CURRENCY_DTO: CurrencyDTO = {
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

export const MOCK_CURRENCY: Currency = {
  currency: 'TEST',
  exchangeRate: '1.00',
  baseCurrency: MOCK_BASE_CURRENCY,
  countryNames: ['Country 1', 'Country 2'],
};

export const MOCK_CURRENCIES: Array<Currency> = [
  MOCK_CURRENCY,
  {
    currency: 'TEST 1',
    exchangeRate: '1.00',
    baseCurrency: MOCK_BASE_CURRENCY,
    countryNames: ['Country 1', 'Country 2'],
  },
];

export const MOCK_CURRENCIES_DTO: Array<CurrencyDTO> = [
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

export const MOCK_CURRENCY_DATA_DTO: CurrencyDataDTO = {
  baseCurrency: MOCK_BASE_CURRENCY,
  fx: MOCK_CURRENCIES_DTO,
};
