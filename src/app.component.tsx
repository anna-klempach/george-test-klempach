import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import { Main } from './pages/main/main.component';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1 className={styles.appHeaderText}>George FE Test</h1>
      </header>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </div>
  );
}

export default App;