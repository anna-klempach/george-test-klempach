import { mainApi } from '../api/main.api';
import {
  MOCK_BASE_CURRENCY,
  MOCK_CURRENCY_DATA_DTO,
} from '../mocks/currency.mock';
import { Currency, CurrencyDTO } from '../models/currency.model';
import {
  filterCurrencyData,
  mainService,
  mapCurrencies,
  shouldBeFiltered,
} from './main.service';

jest.useFakeTimers();
afterEach(() => {
  jest.runAllTimers();
});
describe('mainService', () => {
  it('should get currency data if no data has been preloaded', async () => {
    const apiGetSpy = jest.spyOn(mainApi, 'get');
    apiGetSpy.mockReturnValue(
      Promise.resolve({ data: MOCK_CURRENCY_DATA_DTO })
    );
    const result = await mainService.getCurrencies();
    const expectedResult = MOCK_CURRENCY_DATA_DTO.fx.map((item) => ({
      baseCurrency: MOCK_CURRENCY_DATA_DTO.baseCurrency,
      countryNames: [],
      currency: item.currency,
      exchangeRate: item.exchangeRate?.middle.toFixed(item.precision),
    }));
    expect(result).toEqual(expectedResult);
  });
  it('should return empty array if response has no currency data', async () => {
    const apiGetSpy = jest.spyOn(mainApi, 'get');
    apiGetSpy.mockReturnValue(Promise.resolve(undefined));
    const result = await mainService.getCurrencies();
    expect(result).toEqual([]);
  });
  it('should not refetch currency data if the cache has not been invalidated yet', async () => {
    const apiGetSpy = jest.spyOn(mainApi, 'get');
    apiGetSpy.mockReturnValue(
      Promise.resolve({ data: MOCK_CURRENCY_DATA_DTO })
    );
    await mainService.getCurrencies();
    await mainService.getCurrencies();
    expect(apiGetSpy).toHaveBeenCalledTimes(1);
  });
  it('should return filtered currency data if search query has been passed', async () => {
    const apiGetSpy = jest.spyOn(mainApi, 'get');
    apiGetSpy.mockReturnValue(
      Promise.resolve({ data: MOCK_CURRENCY_DATA_DTO })
    );
    const filteredData = MOCK_CURRENCY_DATA_DTO.fx[0];
    const result = await mainService.getCurrencies(
      filteredData.currency.toLowerCase()
    );
    const expectedResult = [
      {
        baseCurrency: MOCK_CURRENCY_DATA_DTO.baseCurrency,
        currency: filteredData.currency,
        exchangeRate: filteredData.exchangeRate?.middle.toFixed(
          filteredData.precision
        ),
        countryNames: [],
      },
    ];
    expect(result).toEqual(expectedResult);
  });
});

describe('mapCurrencies', () => {
  it('should return empty array if no currencies have been passed', () => {
    expect(mapCurrencies()).toEqual([]);
  });
  it('should return empty array if currencies are null', () => {
    expect(mapCurrencies(null as any)).toEqual([]);
  });
  it('should return array of mapped currencies', () => {
    const initialValue: Array<CurrencyDTO> = [
      {
        currency: 'Test',
        precision: 2,
      },
    ];
    const expectedResult: Array<Currency> = [
      {
        currency: 'Test',
        exchangeRate: '',
        countryNames: [],
        baseCurrency: '',
      },
    ];
    expect(mapCurrencies(initialValue)).toEqual(expectedResult);
  });
  it('should set currency to empty string if no currency is provided', () => {
    const initialValue: Array<CurrencyDTO> = [
      {
        currency: '',
        precision: 2,
      },
    ];
    const expectedResult: Array<Currency> = [
      {
        currency: '',
        exchangeRate: '',
        countryNames: [],
        baseCurrency: '',
      },
    ];
    expect(mapCurrencies(initialValue)).toEqual(expectedResult);
  });
  it('should set base currency if it is provided', () => {
    const initialValue: Array<CurrencyDTO> = [
      {
        currency: '',
        precision: 2,
      },
    ];
    const expectedResult: Array<Currency> = [
      {
        currency: '',
        exchangeRate: '',
        countryNames: [],
        baseCurrency: MOCK_BASE_CURRENCY,
      },
    ];
    expect(mapCurrencies(initialValue, MOCK_BASE_CURRENCY)).toEqual(
      expectedResult
    );
  });
});

describe('shouldBeFiltered', () => {
  it('should return true if there is no query', () => {
    expect(
      shouldBeFiltered({
        currency: '',
        baseCurrency: '',
      })
    ).toBeTruthy();
  });
  it('should return true if item currency includes query', () => {
    expect(
      shouldBeFiltered(
        {
          currency: 'TEST',
          baseCurrency: '',
        },
        'test'
      )
    ).toBeTruthy();
  });
  it('should return true if item countryNames includes query', () => {
    expect(
      shouldBeFiltered(
        {
          currency: 'TEST',
          baseCurrency: '',
          countryNames: ['Country name'],
        },
        'country'
      )
    ).toBeTruthy();
  });
  it('should return false if neither item countryNames nor item currency includes query', () => {
    expect(
      shouldBeFiltered(
        {
          currency: 'TEST',
          baseCurrency: '',
          countryNames: ['Country name'],
        },
        'different'
      )
    ).toBeFalsy();
  });
});

describe('filterCurrencyData', () => {
  it('should return empty array if currencies do not contain exchange rate', () => {
    const currencies: Array<Currency> = [
      {
        currency: '',
        exchangeRate: '',
        countryNames: [],
        baseCurrency: MOCK_BASE_CURRENCY,
      },
    ];
    expect(filterCurrencyData(currencies)).toEqual([]);
  });
  it('should return empty array if currencies are null', () => {
    expect(filterCurrencyData(null as any)).toEqual([]);
  });
  it('should return empty array if currencies should not be filtered', () => {
    const currencies: Array<Currency> = [
      {
        currency: 'TEST',
        exchangeRate: '',
        countryNames: [],
        baseCurrency: MOCK_BASE_CURRENCY,
      },
    ];
    expect(filterCurrencyData(currencies, 'randomQuery')).toEqual([]);
  });
  it('should return filtered array if currencies should be filtered and have exchange rate', () => {
    const currencies: Array<Currency> = [
      {
        currency: 'TEST',
        exchangeRate: '1.50',
        countryNames: [],
        baseCurrency: MOCK_BASE_CURRENCY,
      },
      {
        currency: 'TEST 1',
        exchangeRate: '1.50',
        countryNames: [],
        baseCurrency: MOCK_BASE_CURRENCY,
      },
    ];
    expect(filterCurrencyData(currencies, 'test 1')).toEqual([currencies[1]]);
  });
});
