interface Rate {
  buy: number;
  middle: number;
  sell: number;
  indicator: number;
  lastModified: string;
}

export interface Currency {
  currency: string;
  precision: number;
  nameI18N?: string;
  exchangeRate?: Rate;
  banknoteRate?: Rate;
  denominations?: Array<number>;
}

export interface CurrencyDTO {
  baseCurrency: string;
  fx: Array<Currency>;
}
