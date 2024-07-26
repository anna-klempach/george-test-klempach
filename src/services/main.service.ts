import { AxiosResponse } from 'axios';
import { mainApi } from '../api/main.api';
import { CurrencyDTO } from '../models/currency.model';

export const mainService = {
  getCurrencies: () =>
    mainApi
      .get<never, AxiosResponse<CurrencyDTO | null>>()
      .then((response) => response?.data || null),
};
