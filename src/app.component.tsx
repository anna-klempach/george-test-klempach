import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import { Main } from './pages/main/main.component';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary
      fallback={
        <div className={styles.errorBoundary}>Something went wrong</div>
      }
    >
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1 className={styles.appHeaderText}>George FE Test</h1>
        </header>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="*" element={<Navigate to="/main" />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
