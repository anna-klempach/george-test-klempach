import React, { useState } from 'react';
import { Currency } from '../../../../models/currency.model';
import styles from './currency-item.module.scss';
import {
  getImageSrc,
  NOT_AVAILABLE_TEXT,
} from '../../../../services/currency-list.service';

export interface CurrencyItemProps {
  item: Currency;
  baseCurrency: string;
}

export const CurrencyItem = ({ item, baseCurrency }: CurrencyItemProps) => {
  const exchangeRate = item.exchangeRate?.middle;
  const currency = item.currency?.trim() || item.nameI18N;
  const [imgSrc, setImgSrc] = useState<string | null>(getImageSrc(currency));
  if (!currency || currency === baseCurrency) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.currencyData}>
        {imgSrc && (
          <img
            src={imgSrc}
            alt={currency}
            onError={() => setImgSrc(null)}
          ></img>
        )}
        <p className={styles.currency}>{item.currency}</p>
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
