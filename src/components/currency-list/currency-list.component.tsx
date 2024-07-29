import { Currency } from '../../models/currency.model';
import { CurrencyItem } from './components/currency-item/currency-item.component';
import styles from './currency-list.module.scss';
import {
  getCurrencyPrecision,
  NO_DATA_FOUND_TEXT,
} from '../../services/currency-list.service';

export interface CurrencyListProps {
  currencies: Array<Currency>;
  baseCurrency: string;
}

export const CurrencyList = ({
  currencies,
  baseCurrency,
}: CurrencyListProps) => {
  if (!currencies?.length) {
    return <div className={styles.noData}>{NO_DATA_FOUND_TEXT}</div>;
  }
  return (
    <div className={styles.container}>
      {currencies.map((item, i) => {
        const currency = item.currency?.trim() || item.nameI18N;
        if (!currency) {
          return null;
        }
        return (
          <CurrencyItem
            key={currency}
            currency={currency}
            exchangeRate={getCurrencyPrecision(
              item.exchangeRate?.middle,
              item.precision
            )}
            baseCurrency={baseCurrency}
          />
        );
      })}
    </div>
  );
};
