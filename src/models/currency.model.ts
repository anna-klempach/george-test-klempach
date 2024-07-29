interface RateDTO {
  buy: number;
  middle: number;
  sell: number;
  indicator: number;
  lastModified: string;
}

export interface Currency {
  currency: string;
  exchangeRate?: string;
  countryNames?: string[];
  baseCurrency: string;
}

export interface CurrencyDTO {
  currency: string;
  precision: number;
  nameI18N?: string;
  exchangeRate?: RateDTO;
  banknoteRate?: RateDTO;
  denominations?: Array<number>;
}

export interface CurrencyDataDTO {
  baseCurrency: string;
  fx: Array<CurrencyDTO>;
}
