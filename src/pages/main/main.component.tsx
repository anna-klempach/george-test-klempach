import { useSearchParams } from 'react-router-dom';
import styles from './main.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { mainService } from '../../services/main.service';
import { CurrencyList } from '../../components/currency-list/currency-list.component';
import { Currency } from '../../models/currency.model';

export const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [currencyData, setCurrencyData] = useState<Array<Currency>>([]);
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchParams(value ? { search: value } : undefined);
  };
  useEffect(() => {
    mainService
      .getCurrencies(query)
      .then((data) => setCurrencyData(data || []));
  }, [query]);

  useEffect(() => {
    setQuery(searchParams.get('search') || '');
  }, [searchParams]);

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

      <CurrencyList currencies={currencyData} />
    </div>
  );
};
