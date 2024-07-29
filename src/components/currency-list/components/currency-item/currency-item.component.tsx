import styles from './currency-item.module.scss';
import {
  getFlagCountryCode,
  NOT_AVAILABLE_TEXT,
} from '../../../../services/currency-list.service';
import Flag from 'react-world-flags';

export interface CurrencyItemProps {
  exchangeRate?: string;
  baseCurrency: string;
  countryNames?: Array<string>;
  currency?: string;
}

export const CurrencyItem = ({
  exchangeRate,
  baseCurrency,
  countryNames = [],
  currency,
}: CurrencyItemProps) => {
  if (!currency || currency === baseCurrency) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.currencyData}>
        <Flag
          className={styles.imagePlaceholder}
          code={getFlagCountryCode(countryNames?.[0])}
          fallback={<div className={styles.imagePlaceholder} />}
        />
        <p className={styles.currency}>{currency}</p>
        {countryNames.length > 0 && (
          <div className={styles.countries}>
            {countryNames.map((country) => (
              <p key={country}>{country}</p>
            ))}
          </div>
        )}
      </div>
      <div className={styles.currencyData}>
        {exchangeRate ? (
          <>
            <p>{exchangeRate}</p>
            <p>{baseCurrency}</p>
          </>
        ) : (
          <p className={styles.noData}>{NOT_AVAILABLE_TEXT}</p>
        )}
      </div>
    </div>
  );
};
