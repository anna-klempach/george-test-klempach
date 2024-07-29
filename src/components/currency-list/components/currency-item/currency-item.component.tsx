import { useState } from 'react';
import styles from './currency-item.module.scss';
import {
  getImageSrc,
  NOT_AVAILABLE_TEXT,
} from '../../../../services/currency-list.service';

export interface CurrencyItemProps {
  exchangeRate?: string;
  baseCurrency: string;
  currency?: string;
}

export const CurrencyItem = ({
  exchangeRate,
  baseCurrency,
  currency,
}: CurrencyItemProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(getImageSrc(currency));
  if (!currency || currency === baseCurrency) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.currencyData}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={currency}
            onError={() => setImgSrc(null)}
            className={styles.imagePlaceholder}
          ></img>
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
        <p className={styles.currency}>{currency}</p>
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
