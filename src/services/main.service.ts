import { AxiosResponse } from 'axios';
import { mainApi } from '../api/main.api';
import {
  Currency,
  CurrencyDataDTO,
  CurrencyDTO,
} from '../models/currency.model';
import { getCountryNames, getCurrencyPrecision } from './currency-list.service';

export const DEFAULT_CACHING_TIME = 30000;

export const mapCurrencies = (
  currenciesDto: Array<CurrencyDTO> = [],
  baseCurrency: string = ''
): Array<Currency> =>
  (currenciesDto || []).map((item) => {
    const currency = item.currency?.trim() || '';
    return {
      currency,
      baseCurrency,
      exchangeRate: getCurrencyPrecision(
        item.exchangeRate?.middle,
        item.precision
      ),
      countryNames: getCountryNames(currency),
    };
  });

export const shouldBeFiltered = (item: Currency, query?: string) =>
  !query ||
  item.currency.toLowerCase().includes(query.toLowerCase()) ||
  item.countryNames?.some((country) =>
    country.toLowerCase().includes(query.toLowerCase())
  );

export const filterCurrencyData = (
  currencies: Array<Currency>,
  query?: string
) =>
  (currencies || []).reduce<Array<Currency>>((prev, curr) => {
    if (curr.exchangeRate && shouldBeFiltered(curr, query)) {
      return [...prev, curr];
    }
    return prev;
  }, []);

export const mainService = (function () {
  let currencyData: Array<Currency> | null;
  let timeout: ReturnType<typeof setTimeout>;
  const invalidateCache = () => {
    currencyData = null;
  };
  return {
    getCurrencies: async (query?: string) => {
      if (!currencyData) {
        const response = await mainApi.get<
          never,
          AxiosResponse<CurrencyDataDTO | null>
        >();
        const data = response?.data || null;
        currencyData = mapCurrencies(data?.fx, data?.baseCurrency);
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          invalidateCache();
        }, DEFAULT_CACHING_TIME);
      }
      return filterCurrencyData(currencyData, query);
    },
  };
})();
