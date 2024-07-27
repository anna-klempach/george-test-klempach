import { useSearchParams } from 'react-router-dom';
import styles from './main.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { CurrencyDTO } from '../../models/currency.model';
import { mainService } from '../../services/main.service';
import { CurrencyList } from '../../components/currency-list/currency-list.component';

export const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [currencyData, setCurrencyData] = useState<CurrencyDTO | null>(null);
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchParams(value ? { search: value } : undefined);
  };
  useEffect(() => {
    mainService.getCurrencies(query).then(setCurrencyData);
  }, [query]);

  useEffect(() => {
    setQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const { fx = [], baseCurrency = '' } = currencyData || {};

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="search"
          id="search"
          className={styles.searchInput}
          onChange={onInputChange}
          value={query}
        />
      </div>

      <CurrencyList currencies={fx} baseCurrency={baseCurrency} />
    </div>
  );
};
