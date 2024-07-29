import { Currency } from '../../models/currency.model';
import { CurrencyItem } from './components/currency-item/currency-item.component';
import styles from './currency-list.module.scss';
import { NO_DATA_FOUND_TEXT } from '../../services/currency-list.service';

export interface CurrencyListProps {
  currencies: Array<Currency>;
}

export const CurrencyList = ({ currencies }: CurrencyListProps) => {
  if (!currencies?.length) {
    return <div className={styles.noData}>{NO_DATA_FOUND_TEXT}</div>;
  }
  return (
    <div className={styles.container}>
      {currencies.map(
        ({ currency, countryNames, exchangeRate, baseCurrency }, i) => {
          if (!currency) {
            return null;
          }
          return (
            <CurrencyItem
              key={currency}
              currency={currency}
              countryNames={countryNames}
              exchangeRate={exchangeRate}
              baseCurrency={baseCurrency}
            />
          );
        }
      )}
    </div>
  );
};
