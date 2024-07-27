import { AxiosResponse } from 'axios';
import { mainApi } from '../api/main.api';
import { CurrencyDTO } from '../models/currency.model';

export const DEFAULT_CACHING_TIME = 30000;

export const mainService = (function () {
  let currencyData: CurrencyDTO | null;
  let timeout: ReturnType<typeof setTimeout>;
  const invalidateCache = () => {
    currencyData = null;
  };
  return {
    getCurrencies: async (query?: string) => {
      if (!currencyData) {
        const response = await mainApi.get<
          never,
          AxiosResponse<CurrencyDTO | null>
        >();

        currencyData = response?.data || null;
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          invalidateCache();
        }, DEFAULT_CACHING_TIME);
      }
      if (!currencyData || !currencyData.fx || !query) {
        return currencyData;
      }
      return {
        ...currencyData,
        fx: currencyData.fx.filter(
          (item) =>
            item.currency.toLowerCase().includes(query.toLowerCase()) ||
            item.nameI18N?.toLowerCase().includes(query.toLowerCase())
        ),
      };
    },
  };
})();
