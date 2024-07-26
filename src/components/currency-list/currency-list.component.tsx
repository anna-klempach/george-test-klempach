import { Currency } from '../../models/currency.model';
import { CurrencyItem } from './components/currency-item/currency-item.component';
import styles from './currency-list.module.scss';
import { NO_DATA_FOUND_TEXT } from '../../services/currency-list.service';

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
      {currencies.map((item) => (
        <CurrencyItem
          key={item.currency}
          item={item}
          baseCurrency={baseCurrency}
        />
      ))}
    </div>
  );
};
