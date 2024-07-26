import { useSearchParams } from 'react-router-dom';
import styles from './Main.module.scss';
import { ChangeEvent } from 'react';

export const Main = () => {
  const [, setSearchParams] = useSearchParams();
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: event.target.value });
  };
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
        />
      </div>
    </div>
  );
};
